from rest_framework import status
from rest_framework.test import APITestCase

from django.urls import reverse

from board.models import Article


class TestArticle(APITestCase):

    def setUp(self):
        self.url = reverse("api:article-list")
        self.article = Article.objects.create(
            author="test", title="test", text="test")
        self.article2 = Article.objects.create(author="abcd", title="abc",)

    def test_get_articles(self):
        """ 글 리스트 테스트 """
        res = self.client.get(self.url)

        results = res.data["results"]

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(results), 2)

    def test_create_articles(self):
        """ 글 작성 테스트 """
        payload = {
            "author": "testAuthor",
            "title": "testtitle",
            "text": "testText"
        }

        res = self.client.post(self.url, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data['author'], payload['author'])

    def test_pagingation_articles(self):
        """ 글 페이징 테스트 """

        for _ in range(30):
            Article.objects.create(author="test", text="test")

        res = self.client.get(self.url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data["results"]), 15)
        self.assertIsNotNone(res.data["next"])
        self.assertIsNone(res.data["previous"])

    def test_get_article_detail(self):
        """ 특정 글 상세 정보 테스트 """

        url = reverse("api:article-detail", kwargs={"pk": self.article.id})

        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIsNotNone(res.data["text"])
        self.assertIsNotNone(res.data["comments"])

    def test_search_article(self):

        res = self.client.get(self.url, {
            "search": "abc"
        })

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["count"], 1)
        self.assertEqual(res.data["results"][0]["title"], "abc")
