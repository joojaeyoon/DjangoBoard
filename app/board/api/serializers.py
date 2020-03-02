from rest_framework import serializers

from board.models import Article, Comment


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = "__all__"


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = "__all__"


class ArticleListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        exclude = ("text",)


class ArticleDetailSerializer(ArticleSerializer):
    comments = CommentSerializer(many=True)
