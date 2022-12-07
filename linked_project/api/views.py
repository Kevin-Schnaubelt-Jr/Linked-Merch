from rest_framework import generics, viewsets

from custom_urls.models import URLS
from .serializers import URLSSerializer

class URLSAPIView(generics.ListAPIView):
    queryset = URLS.objects.all()
    serializer_class = URLSSerializer

class PostURLSSet(viewsets.ModelViewSet):
    queryset = URLS.objects.all()
    serializer_class = URLSSerializer