from django.db import models


class Article(models.Model):
    author = models.CharField(max_length=16)
    title = models.CharField(max_length=128)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text[:10]+"..."


class Comment(models.Model):
    article = models.ForeignKey(
        Article, on_delete=models.CASCADE, related_name="comments")
    author = models.CharField(max_length=16)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text[:10]+"..."
