from rest_framework import generics, viewsets

from custom_urls.models import EmergencyQR, EmergencyName, EmergencyPhoneNumbers, EmergencyAddress
from .serializers import EmergencyQRSerializer, EmergencyNameSerializer, EmergencyPhoneNumbersSerializer, EmergencyAddressSerializer

class EmergencyQRAPIView(generics.ListAPIView):
    queryset = EmergencyQR.objects.all()
    serializer_class = EmergencyQRSerializer

class PostEmergencyQRSet(viewsets.ModelViewSet):
    queryset = EmergencyQR.objects.all()
    serializer_class = EmergencyQRSerializer

class EmergencyNameAPIView(generics.ListAPIView):
    queryset = EmergencyName.objects.all()
    serializer_class = EmergencyNameSerializer

class PostEmergencyNameSet(viewsets.ModelViewSet):
    queryset = EmergencyName.objects.all()
    serializer_class = EmergencyNameSerializer

class EmergencyPhoneNumbersAPIView(generics.ListAPIView):
    queryset = EmergencyPhoneNumbers.objects.all()
    serializer_class = EmergencyPhoneNumbersSerializer

class PostEmergencyPhoneNumbersSet(viewsets.ModelViewSet):
    queryset = EmergencyPhoneNumbers.objects.all()
    serializer_class = EmergencyPhoneNumbersSerializer

class EmergencyAddressAPIView(generics.ListAPIView):
    queryset = EmergencyAddress.objects.all()
    serializer_class = EmergencyAddressSerializer

class PostEmergencyAddressSet(viewsets.ModelViewSet):
    queryset = EmergencyAddress.objects.all()
    serializer_class = EmergencyAddressSerializer
