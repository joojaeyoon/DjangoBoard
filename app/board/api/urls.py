from django.urls import path

from board.api import views

app_name = "api"

urlpatterns = [
    path("articles/", views.ArticleListCreateAPIView.as_view(), name="article-list"),
    path("articles/<pk>/", views.ArticleDetailAPIView.as_view(),
         name="article-detail"),
    path("articles/<pk>/comment/",
         views.CommentCreateAPIView.as_view(), name="comment-create"),
    path("articles/<pk>/comments/",
         views.CommentListAPIView.as_view(), name="comment-list")
]
