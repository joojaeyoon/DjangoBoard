from django.db import models


class Article(models.Model):
    author = models.CharField(max_length=16)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class Comment(models.Model):
    article = models.ForeignKey(
        Article, on_delete=models.CASCADE, related_name="comment")
    author = models.CharField(max_length=16)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
