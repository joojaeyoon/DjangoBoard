from rest_framework import generics

from board.models import Article, Comment
from board.api.serializers import ArticleSerializer


class ArticleListCreateAPIView(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
