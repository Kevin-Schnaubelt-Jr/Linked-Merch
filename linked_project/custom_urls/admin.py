from django.contrib import admin

from .models import URLS, EmergencyName, EmergencyPhoneNumbers

admin.site.register(URLS)
admin.site.register(EmergencyName)
admin.site.register(EmergencyPhoneNumbers)