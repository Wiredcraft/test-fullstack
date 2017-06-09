from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_jwt.utils import jwt_payload_handler, jwt_encode_handler
from .models import Post, Upvote


class PostTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='casca', password='pwd@1234')
        payload = jwt_payload_handler(self.user)
        self.token = jwt_encode_handler(payload)

    def test_create_post(self):
        """
        Create a new post object.
        """
        url = '/lightning_talk/api/posts/'
        data = {'title': 'yo', 'description': 'hei'}
        response = self.client.post(
            url, data, format='json', HTTP_AUTHORIZATION='JWT ' + self.token)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Post.objects.count(), 1)
        self.assertEqual(Post.objects.get().description, 'hei')

    def test_update_post(self):
        """
        Update a post object
        """
        post = Post.objects.create(
            title='yo', description='hei', user=self.user)

        url = '/lightning_talk/api/posts/%s/' % post.pk
        data = {'description': 'hei ho'}
        response = self.client.patch(
            url, data, format='json', HTTP_AUTHORIZATION='JWT ' + self.token)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Post.objects.get().description, 'hei ho')

    def test_delete_post(self):
        """
        Delete a post object
        """
        post = Post.objects.create(
            title='yo', description='hei', user=self.user)

        url = '/lightning_talk/api/posts/%s/' % post.pk
        response = self.client.delete(
            url, HTTP_AUTHORIZATION='JWT ' + self.token)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Post.objects.count(), 0)

    def test_upvote_post(self):
        """
        Upvote post
        """
        post = Post.objects.create(
            title='yo', description='hei', user=self.user)

        url = '/lightning_talk/api/posts/%s/upvote/' % post.pk
        response = self.client.put(url, HTTP_AUTHORIZATION='JWT ' + self.token)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Post.objects.get().upvotes.count(), 1)

    def test_cancle_upvote_of_post(self):
        """
        Cancle upvote post
        """
        post = Post.objects.create(
            title='yo', description='hei', user=self.user)
        upvote = Upvote.objects.create(user=self.user, post=post)
        post.upvotes.add(upvote)

        url = '/lightning_talk/api/posts/%s/upvote/' % post.pk
        response = self.client.delete(
            url, HTTP_AUTHORIZATION='JWT ' + self.token)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Post.objects.get().upvotes.count(), 0)
