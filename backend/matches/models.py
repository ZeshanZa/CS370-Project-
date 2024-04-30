from django.db import models
from django.conf import settings
from django.contrib.auth.models import User 
from django.contrib.postgres.fields import ArrayField, JSONField

# Create your models here.
class Match(models.Model): 
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='match_requests_sent', on_delete=models.CASCADE)
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='match_requests_received', on_delete=models.CASCADE)
    matched_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=(('pending', 'Pending'), ('accepted', 'Accepted')), default='pending')
    
    notification_interacted = models.BooleanField(default=False)
    notification_pending = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.sender.username} and {self.receiver.username} - {self.status}"

def deleted_matches(): 
    return {'deleted matches': []}

class deletedMatches(models.Model): 
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='deletedmatches')
    removed_matches = models.JSONField(default=deleted_matches)
    
    def __str__(self): 
         return f"{self.user.username}'s deleted matches" 