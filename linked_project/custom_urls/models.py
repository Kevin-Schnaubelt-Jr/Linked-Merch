from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

from users.models import CustomUser

class URLS(models.Model):
    unique_key = models.CharField(max_length=200, unique=True)
    template_key = models.IntegerField()
    body_style = models.CharField(max_length=50, default='circle' )
    eye_style = models.CharField(max_length=50, default='frame6')
    eye_ball_style = models.CharField(max_length=50, default='ball6')
    body_color = models.CharField(max_length=50, default='', null=True)
    bg_color = models.CharField(max_length=50, default='', null=True)
    eye_1_color = models.CharField(max_length=50, default='', null=True)
    eye_ball_1_color = models.CharField(max_length=50, default='', null=True)
    author = models.ForeignKey(CustomUser, related_name="custom_urls", on_delete=models.CASCADE)

    def __str__(self):
        return self.unique_key

class NEWURLS(models.Model):
    unique_key = models.CharField(max_length=200, unique=True)
    blob_file = models.CharField(max_length=250)
    author = models.ForeignKey(CustomUser, related_name="new_urls", on_delete=models.CASCADE)


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

class EmergencyAddress(models.Model):
    descriptor = models.CharField(max_length=200, null=True)
    street = models.CharField(max_length=200, null=True)
    city = models.CharField(max_length=200, null=True)
    state = models.CharField(max_length=200, null=True)
    zip_code = models.CharField(max_length=200, null=True)
    url = models.ForeignKey(URLS, related_name="emergency_address", on_delete=models.CASCADE)

    def __str__(self):
        return self.url.unique_key
