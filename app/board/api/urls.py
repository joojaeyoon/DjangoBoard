from django.urls import path

from board.api import views

urlpatterns = [
    path("articles/", views.ArticleListCreateAPIView.as_view(), name="article-list")
]
