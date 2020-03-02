from rest_framework import status
from rest_framework.test import APITestCase

from django.urls import reverse

from board.models import Article, Comment


class TestComment(APITestCase):

    def setUp(self):
        self.article1 = Article.objects.create(author="test", text="test")
        self.article2 = Article.objects.create(author="test2", text="test2")
        self.comment = Comment.objects.create(
            article=self.article1, author="comment test", text="comment")

    def test_get_comment(self):
        """ 특정 글 댓글 리스트 테스트"""

        url = reverse("api:comment-list", kwargs={"pk": self.article1.id})

        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)

    def test_create_comment(self):
        """ 특정 글 댓글 생성 테스트 """

        payload = {
            "author": "testuser",
            "text": "testtest"
        }

        url = reverse("api:comment-create", kwargs={"pk": self.article1.id})

        res = self.client.post(url, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data["author"], payload["author"])
