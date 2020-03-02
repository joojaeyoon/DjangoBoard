from rest_framework import status
from rest_framework.test import APITestCase

from django.urls import reverse

from board.models import Article, Comment


class TestComment(APITestCase):

    def setUp(self):
        self.article = Article.objects.create(author="test", text="test")
        self.comment = Comment.objects.create(
            article=self.article, author="comment test", text="comment")

    def test_get_comment(self):

        res = self.client.get(f"/api/articles/{self.article.id}/comments")

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['text'], self.comment.text)

    def test_create_comment(self):
        payload = {
            "author": "testuser",
            "text": "testtest"
        }

        res = self.client.post(
            f"/api/articles/{self.article.id}/comment", payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data["author"], payload["author"])
