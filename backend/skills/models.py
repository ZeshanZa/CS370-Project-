from django.db import models
from django.contrib.auth.models import User


# new models
class Skills(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name
    
class UserSkills(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    skill = models.ForeignKey(Skills, on_delete=models.CASCADE)
    acquiring = models.BooleanField(default=False)
    searching = models.BooleanField(default=False)
    
    class Meta:
        unique_together = ('user','skill')
        
    def __str__(self):
        return f"{self.user.username}'s skill: {self.skill}"