from django.contrib import admin
from .models import Post
from .models import Upvote


admin.site.register(Post)
admin.site.register(Upvote)
