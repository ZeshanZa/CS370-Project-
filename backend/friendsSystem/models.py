from django.conf import settings
from django.db import models

# Create your models here.
class Friend(models.Model):
    friend_id = models.CharField(max_length=255, default='null')
    friend1 = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='friend1', on_delete=models.CASCADE, default='null')
    friend2 = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='friend2', on_delete=models.CASCADE, default='null')

    def __str__(self):
        return f"{self.friend1.username} and {self.friend2.username} - Friends, ID: {self.friend_id}"
    
class FriendRequest(models.Model):
    friendRequest_id = models.CharField(max_length=255, default='null')
    reqSender = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='reqSender', on_delete=models.CASCADE)
    reqReceiver = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='reqReceiver', on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=(('pending', 'Pending'), ('accepted', 'Accepted'), ('rejected', 'Rejected')), default='pending')
    notification_interacted = models.BooleanField(default=False)
    notification_pending = models.BooleanField(default=True)
    def __str__(self):
        return f"{self.reqSender.username} and {self.reqReceiver.username} - {self.status}"