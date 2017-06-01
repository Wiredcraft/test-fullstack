from django.conf.urls import url, include
from rest_framework import routers
from rest_framework.authtoken import views
from .views import PostViewSet, UpvoteViewSet, index

router = routers.DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'upvotes', UpvoteViewSet)


urlpatterns = [
    url(r'^$', index),
    url(r'^api/', include(router.urls)),
    url(r'^api-token-auth/', views.obtain_auth_token),
]
