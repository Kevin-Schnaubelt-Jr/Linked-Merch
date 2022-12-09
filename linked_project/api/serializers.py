from rest_framework import serializers
from users.models import CustomUser

from custom_urls.models import URLS, EmergencyName

class NestedURLSSerializer(serializers.ModelSerializer):
    class Meta:
        model = URLS
        fields = ('id', 'unique_key', 'template_key', 'author')

class NestedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username')

class NestedEmergencyNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyName
        fields = ('id', 'descriptor', 'name', 'url')

class URLSSerializer(serializers.ModelSerializer):
    author_detail = NestedUserSerializer(read_only=True, source='author')
    name_detail = NestedEmergencyNameSerializer(many=True, read_only=True, source='emergency_name')
    class Meta:
        model = URLS
        fields = ('id', 'unique_key', 'template_key', 'author', 'author_detail',  'name_detail')

class UserSerializer(serializers.ModelSerializer):
    urls_detail = NestedURLSSerializer(many=True, source='custom_urls', read_only=True)
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'urls_detail')

class EmergencyNameSerializer(serializers.ModelSerializer):
    urls_detail = NestedURLSSerializer(many=True, source='custom_urls', read_only=True)
    class Meta:
        model = EmergencyName
        fields = ('id', 'descriptor', 'name', 'url', 'urls_detail')