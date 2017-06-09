from django.http import JsonResponse
from django.db.models import Count
from rest_framework import serializers, viewsets
from rest_framework.decorators import detail_route
from ..models import Post, Upvote
from .user import UserSerializer
from .upvote import UpvoteSerializer


class PostSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer(read_only=True)
    upvotes = UpvoteSerializer(read_only=True, many=True)

    class Meta:
        model = Post
        fields = ('url', 'title', 'description', 'upvotes', 'user')


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.annotate(
        rating=Count('upvotes')).order_by('-rating').all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @detail_route(url_path='upvote', methods=['PUT', 'DELETE'])
    def upvote(self, request, pk=None):
        post = self.get_object()
        exists = post.upvotes.filter(user=self.request.user).exists()

        if self.request.method == 'PUT':
            if exists:
                return JsonResponse(
                    data={'detail': 'already upvoted'}, status='403')
            else:
                u = Upvote(user=self.request.user, post=post)
                u.save()

        elif self.request.method == 'DELETE':
            if exists:
                u = post.upvotes.get(user=self.request.user)
                u.delete()
            else:
                return JsonResponse(
                    data={'detail': 'haven\'t upvote'}, status='403')

        return JsonResponse(data={'detail': 'upvoted'})
