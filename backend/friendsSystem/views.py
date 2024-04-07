from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404


from .models import Friend
from userProjects.models import User
from .serializers import FriendSerializer
from django.db import models
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import PermissionDenied
from rest_framework import generics, permissions

# Create your views here.

class FriendView(generics.RetrieveAPIView):
    serializer_class = FriendSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        other_username = self.kwargs.get('username')
        user = self.request.user
        other_user = get_object_or_404(User, username=other_username)

        # Check if users are friends
        is_Friend = Friend.objects.filter(
            (models.Q(user1=user, user2=other_user) | models.Q(user1=other_user, user2=user))
        ).exists()

        if is_Friend:
            return other_user.userprofile
        else:
            raise PermissionDenied('You are not matched with this user.')
    queryset = Friend.objects.all()
    
class FriendListView(generics.ListAPIView):
    serializer_class = FriendSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        # Filter friends by the current user
        return Friend.objects.filter(user=self.request.user)
    
def sendFriendRequest(request, user_id):
    # Ensure both sender and receiver are valid users, including admins
    sender = request.user
    receiver = get_object_or_404(User, id=user_id)

    # Prevent users from sending a friend request to themselves
    if sender == receiver:
        return HttpResponse("You cannot send a friend request to yourself.")

    # Create or get the existing friend request
    friend, created = Friend.objects.get_or_create(
        user1=sender,
        user2=receiver,
        defaults={'status': 'pending'}
    )

    if created:
        return HttpResponse('Friend request sent.')
    else:
        return HttpResponse('Friend request already sent.')

def acceptFriendRequest(request, friendRequest_id):
    friend = get_object_or_404(Friend, id=friendRequest_id, user2=request.user)

    # Ensure the request.user is the recipient of the friend request
    if request.user != friend.user2:
        return HttpResponse("You can only interact with friend requests sent to you.")

    friend.status = 'accepted'
    friend.save()
    return HttpResponse('Friend request accepted.')

def rejectFriendRequest(request, friendRequest_id):
    friend = get_object_or_404(Friend, id=friendRequest_id, user2=request.user)

    # Ensure the request.user is the recipient of the friend request
    if request.user != friend.user2:
        return HttpResponse("You can only interact with friend requests sent to you.")

    friend.status = 'rejected'
    friend.save()
    return HttpResponse('Friend request rejected.')

def listPendingRequests(request):
    pending_requests_sent = Friend.objects.filter(user1=request.user, status='pending').values_list('id', flat=True)
    pending_requests_received = Friend.objects.filter(user2=request.user, status='pending').values_list('id', flat=True)

    pending_requests = list(pending_requests_sent) + list(pending_requests_received)

    return JsonResponse({'pending_request_ids': pending_requests})