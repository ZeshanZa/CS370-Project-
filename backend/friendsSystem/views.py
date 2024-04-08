from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404


from .models import Friend, FriendRequest
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
            (models.Q(friend1=user, friend2=other_user) | models.Q(friend2=other_user, friend1=user))
        ).exists()

        if is_Friend:
            return other_user.userprofile
        else:
            raise PermissionDenied('You are not friends with this user.')
    queryset = Friend.objects.all()
    
class FriendListView(generics.ListAPIView):
    serializer_class = FriendSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        # Filter friends by the current user
        return Friend.objects.filter(friend1=self.request.user)
    
def sendFriendRequest(request, username):
    # Ensure both sender and receiver are valid users, including admins
    reqSender = request.user
    reqReceiver = get_object_or_404(User, username=username)

    # Prevent users from sending a friend request to themselves
    if reqSender == reqReceiver:
        return HttpResponse("You cannot send a friend request to yourself.")

    # Create or get the existing friend request
    friendReq, created = FriendRequest.objects.get_or_create(
        friendRequest_id = f"{reqSender.username}{reqReceiver.username}",
        reqSender=reqSender,
        reqReceiver=reqReceiver,
        defaults={'status': 'pending'}
    )

    if created:
        return HttpResponse('Friend request sent.')
    else:
        return HttpResponse('Friend request already sent.')

def acceptFriendRequest(request, friendRequest_id):
    friendReq = get_object_or_404(FriendRequest, friendRequest_id=friendRequest_id)

    # Ensure the request.user is the recipient of the friend request
    if request.user != get_object_or_404(User, username=friendReq.reqReceiver.username):
        return HttpResponse("You can only interact with friend requests sent to you.")

    newFriend, created = Friend.objects.get_or_create(
        friend_id = f"{friendReq.reqSender.username}{friendReq.reqReceiver.username}",
        friend1 = get_object_or_404(User, username=friendReq.reqSender.username),
        friend2 = get_object_or_404(User, username=friendReq.reqReceiver.username),
    )
    friendReq.delete()
    return HttpResponse('Friend request accepted.')


def rejectFriendRequest(request, friendRequest_id):
    friendReq = get_object_or_404(FriendRequest, friendRequest_id=friendRequest_id, reqReceiver=request.user)

    # Ensure the request.user is the recipient of the friend request
    if request.user != friendReq.reqReceiver:
        return HttpResponse("You can only interact with friend requests sent to you.")

    friendReq.delete()
    return HttpResponse('Friend request rejected.')

def listPendingRequests(request):
    pending_requests_sent = Friend.objects.filter(reqSender=request.user, status='pending').values_list('friendRequest_id', flat=True)
    pending_requests_received = Friend.objects.filter(reqReceiver=request.user, status='pending').values_list('friendRequest_id', flat=True)

    pending_requests = list(pending_requests_sent) + list(pending_requests_received)

    return JsonResponse({'pending_request_ids': pending_requests})