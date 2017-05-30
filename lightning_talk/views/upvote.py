from django.contrib.auth.models import User
from rest_framework import serializers, viewsets
from ..models import Upvote
from .user import UserSerializer


class UpvoteSerializer(serializers.HyperlinkedModelSerializer):
  user = UserSerializer(read_only=True)

  class Meta:
    model = Upvote
    fields = ('url', 'user')

class UpvoteViewSet(viewsets.ModelViewSet):
  queryset = Upvote.objects.all()
  serializer_class = UpvoteSerializer

  def perform_create(self, serializer):
    serializer.save(user=self.request.user)
