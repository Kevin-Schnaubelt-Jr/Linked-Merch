from django.db import models

from users.models import CustomUser

class URLS(models.Model):
    unique_key = models.CharField(max_length=200, unique=True)
    template_key = models.IntegerField()
    author = models.ForeignKey(CustomUser, related_name="custom_urls", on_delete=models.CASCADE)

    def __str__(self):
        return self.title
