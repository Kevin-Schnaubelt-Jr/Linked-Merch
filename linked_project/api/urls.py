from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('custom_urls', views.PostURLSSet, basename='custom_urls')

urlpatterns = router.urls + [
	path('', views.URLSAPIView.as_view()),
]