from django.db import models

class Skill(models.Model):
    name = models.CharField(max_length=100)
    acquired = models.BooleanField(default=False)
    searching = models.BooleanField(default=False)
    
    def __str__(self):
        return self.name 