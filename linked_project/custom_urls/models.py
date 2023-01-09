from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

from users.models import CustomUser

class EmergencyQR(models.Model):
    unique_key = models.CharField(max_length=200, unique=True)
    image = models.CharField(max_length=250, null=True)
    dot_options_type = models.CharField(max_length=50, default='extra-rounded' )
    dot_options_color = models.CharField(max_length=50, default='#6a1a4c')
    background_options_color = models.CharField(max_length=50, default='#ffffff')
    corner_square_options_type = models.CharField(max_length=50, default='extra-rounded')
    corner_square_options_color = models.CharField(max_length=50, default='#000000')
    corner_dot_options_type = models.CharField(max_length=50, default='extra-rounded')
    corner_dot_options_color = models.CharField(max_length=50, default='#000000')
    author = models.ForeignKey(CustomUser, related_name="custom_urls", on_delete=models.CASCADE)

    def __str__(self):
        return self.unique_key


class EmergencyName(models.Model):
    descriptor = models.CharField(max_length=200, null=True)
    name = models.CharField(max_length=200)
    qr_code = models.ForeignKey(EmergencyQR, related_name="emergency_name", on_delete=models.CASCADE)

    def __str__(self):
        return self.qr_code.unique_key

class EmergencyPhoneNumbers(models.Model):
    descriptor = models.CharField(max_length=200, null=True)
    phone_number = PhoneNumberField(region="US")
    qr_code = models.ForeignKey(EmergencyQR, related_name="emergency_phone", on_delete=models.CASCADE)

    def __str__(self):
        return self.qr_code.unique_key

class EmergencyAddress(models.Model):
    descriptor = models.CharField(max_length=200, null=True)
    street = models.CharField(max_length=200, null=True)
    city = models.CharField(max_length=200, null=True)
    state = models.CharField(max_length=200, null=True)
    zip_code = models.CharField(max_length=200, null=True)
    qr_code = models.ForeignKey(EmergencyQR, related_name="emergency_address", on_delete=models.CASCADE)

    def __str__(self):
        return self.qr_code.unique_key
