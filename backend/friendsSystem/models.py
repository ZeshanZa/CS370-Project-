from django.conf import settings
from django.db import models

from skills.models import Skills

# Create your models here.
class Friend(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    skills = models.ForeignKey(Skills, on_delete=models.CASCADE)
    projects = models.URLField(blank=True)
    github_url = models.URLField(blank=True)

    def __str__(self):
        return self.name