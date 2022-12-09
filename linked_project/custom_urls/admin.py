from django.contrib import admin

from .models import URLS, EmergencyName

admin.site.register(URLS)
admin.site.register(EmergencyName)