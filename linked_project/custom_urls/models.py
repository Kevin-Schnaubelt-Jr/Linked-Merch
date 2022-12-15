from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

from users.models import CustomUser

class URLS(models.Model):
    unique_key = models.CharField(max_length=200, unique=True)
    template_key = models.IntegerField()
    author = models.ForeignKey(CustomUser, related_name="custom_urls", on_delete=models.CASCADE)

    def __str__(self):
        return self.unique_key


class EmergencyName(models.Model):
    descriptor = models.CharField(max_length=200, null=True)
    name = models.CharField(max_length=200)
    url = models.ForeignKey(URLS, related_name="emergency_name", on_delete=models.CASCADE)

    def __str__(self):
        return self.url.unique_key

class EmergencyPhoneNumbers(models.Model):
    descriptor = models.CharField(max_length=200, null=True)
    phone_number = PhoneNumberField(region="US")
    url = models.ForeignKey(URLS, related_name="emergency_phone", on_delete=models.CASCADE)

    def __str__(self):
        return self.url.unique_key