from django.db import models
from django.conf import settings
from .post import Post


class Upvote(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    post = models.ForeignKey(Post, related_name='upvotes')
