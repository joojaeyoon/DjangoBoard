from rest_framework import status
from rest_framework.test import APITestCase

from board.models import Article


class TestArticle(APITestCase):

    def setUp(self):
        Article.objects.create(author="test", text="test")

    def test_get_articles(self):
        res = self.client.get("/api/articles")

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
