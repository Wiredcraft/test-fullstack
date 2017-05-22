import json
from django.http import JsonResponse
from django.core import serializers
from ..models import Post


def post(request):
    return JsonResponse({'data': list(Post.objects.all().values())})
