from django.conf.urls import url, include
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token
from .views import PostViewSet, UpvoteViewSet, index

router = routers.DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'upvotes', UpvoteViewSet)

urlpatterns = [
    url(r'^$', index),
    url(r'^api/', include(router.urls)),
    url(r'^api-token-auth/', obtain_jwt_token),
]
