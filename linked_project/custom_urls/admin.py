from django.contrib import admin

from .models import EmergencyQR, EmergencyName, EmergencyPhoneNumbers, EmergencyAddress

admin.site.register(EmergencyQR)
admin.site.register(EmergencyName)
admin.site.register(EmergencyPhoneNumbers)
admin.site.register(EmergencyAddress)