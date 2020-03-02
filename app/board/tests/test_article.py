from rest_framework import status
from rest_framework.test import APITestCase

from django.urls import reverse

from board.models import Article


class TestArticle(APITestCase):

    def setUp(self):
        self.url = reverse("api:article-list")
        Article.objects.create(author="test", text="test")

    def test_get_articles(self):
        res = self.client.get(self.url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)

    def test_create_articles(self):
        payload = {
            "author": "testAuthor",
            "text": "testText"
        }

        res = self.client.post(self.url, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data['author'], payload['author'])
