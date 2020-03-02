from django.urls import path

from board.api import views

app_name = "api"

urlpatterns = [
    path("articles/", views.ArticleListCreateAPIView.as_view(), name="article-list")
]
