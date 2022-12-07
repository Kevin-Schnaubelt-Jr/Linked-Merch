from rest_framework import serializers
from users.models import CustomUser

from custom_urls.models import URLS

class NestedURLSSerializer(serializers.ModelSerializer):
    class Meta:
        model = URLS
        fields = ('id', 'unique_key', 'template_key', 'author')

class NestedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username')

class URLSSerializer(serializers.ModelSerializer):
    author_detail = NestedUserSerializer(read_only=True, source='author')
    class Meta:
        model = URLS
        fields = ('id', 'unique_key', 'template_key', 'author', 'author_detail')

class UserSerializer(serializers.ModelSerializer):
    urls_detail = NestedURLSSerializer(many=True, source='custom_urls', read_only=True)
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'urls_detail')