from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('custom_urls', views.PostURLSSet, basename='custom_urls')
router.register('emergency_names', views.PostEmergencyNameSet, basename='emergency_names')

urlpatterns = router.urls + [
	path('', views.URLSAPIView.as_view()),
	path('', views.EmergencyNameAPIView.as_view())
]