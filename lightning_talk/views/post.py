from django.db.models import Count
from rest_framework import serializers, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import detail_route
from ..models.post import Post, Upvote
from .user import UserSerializer
from .upvote import UpvoteSerializer


class PostSerializer(serializers.HyperlinkedModelSerializer):
  user = UserSerializer(read_only=True)
  upvotes = UpvoteSerializer(read_only=True, many=True)

  class Meta:
    model = Post
    fields = ('url', 'title', 'description', 'upvotes', 'user')


class PostViewSet(viewsets.ModelViewSet):
  queryset = Post.objects.annotate(rating=Count('upvotes')).order_by('-rating').all()
  serializer_class = PostSerializer

  def perform_create(self, serializer):
    serializer.save(user=self.request.user)

  @detail_route(url_path='upvote')
  def upvote(self):
    post = self.get_object()

    if self.request.method == 'put':
      u = Upvote(user=self.request.user)
      print(self.request.user)
      post.upvotes.add(u)
    elif self.request.method == 'delete':
      u = post.upvotes.all().filter(user=self.request.user)[0]
      post.upvotes.remove(u)

    post.save()
