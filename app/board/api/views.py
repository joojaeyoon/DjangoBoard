from rest_framework import generics, status
from rest_framework.response import Response

from board.models import Article, Comment
from board.api.serializers import ArticleListSerializer, ArticleDetailSerializer, CommentSerializer
from board.api.pagination import ArticlePagination


class ArticleListCreateAPIView(generics.ListCreateAPIView):
    queryset = Article.objects.order_by("-created_at")
    serializer_class = ArticleListSerializer
    pagination_class = ArticlePagination


class ArticleDetailAPIView(generics.RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleDetailSerializer


class CommentListAPIView(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        article_id = self.kwargs["pk"]

        queryset = Comment.objects.filter(article=article_id)

        return queryset


class CommentCreateAPIView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def create(self, request, *args, **kwargs):
        article_id = kwargs["pk"]

        data = request.data.copy()

        data["article"] = article_id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(data)

        return Response(data, status=status.HTTP_201_CREATED, headers=headers)
