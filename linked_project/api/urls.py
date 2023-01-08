from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('custom_urls', views.PostURLSSet, basename='custom_urls')
router.register('emergency_names', views.PostEmergencyNameSet, basename='emergency_names')
router.register('emergency_phones', views.PostEmergencyPhoneNumbersSet, basename='emergency_phones')
router.register('emergency_address', views.PostEmergencyAddressSet, basename='emergency_address')
router.register('newURLs', views.PostNEWURLSSet, basename='newURLs')

urlpatterns = router.urls + [
	path('', views.URLSAPIView.as_view()),
	path('', views.EmergencyNameAPIView.as_view()),
	path('', views.EmergencyPhoneNumbersAPIView.as_view()),
	path('', views.EmergencyAddressAPIView.as_view()),
	path('', views.NEWURLSAPIView.as_view())
]