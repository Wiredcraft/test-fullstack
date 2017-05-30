from django.conf.urls import url, include
from rest_framework import routers
from .views import PostViewSet, UpvoteViewSet

router = routers.DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'upvotes', UpvoteViewSet)


urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
