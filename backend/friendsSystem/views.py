from django.http import HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from requests import Response
from .serializers import FriendRequestSerializer, UserDetailSerializer
from django.contrib.auth import get_user_model
from django.db.models import Q
from .models import Friend, FriendRequest
from userProjects.models import User, UserProfile
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
            (models.Q(friend1=user, friend2=other_user) | models.Q(friend1=other_user, friend2=user))
        ).exists()

        if is_Friend:
            return get_object_or_404(UserProfile, user=other_user)
        else:
            raise PermissionDenied('You are not friends with this user.')
    
class FriendListView(generics.ListAPIView):
    serializer_class = FriendSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        friends = Friend.objects.filter(models.Q(friend1=user) | models.Q(friend2=user))
        return friends

def getFriendsInfo(request):
    Currentuser = request.user.id
    friendslist = []
    # Filter friends by the current user
    friends = Friend.objects.filter(models.Q(friend1=Currentuser) | models.Q(friend2=Currentuser))
    for friend in friends:
        if friend.friend1 == request.user:
            friendslist.append(friend.friend2.username)
        else:
            friendslist.append(friend.friend1.username)
    return JsonResponse({'userfriends': friendslist})

    
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

def acceptFriendRequest(request, otherUser):
    user = request.user
    friend_reqs = FriendRequest.objects.filter(models.Q(reqReceiver=user))
    
    for req in friend_reqs:
            if (req.reqSender == get_object_or_404(User, username=otherUser)):
                newFriend, created = Friend.objects.get_or_create(
                friend_id = f"{req.reqSender.username}{req.reqReceiver.username}",
                friend1 = get_object_or_404(User, username=req.reqSender.username),
                friend2 = get_object_or_404(User, username=req.reqReceiver.username),
                )
                req.delete()
                return HttpResponse('Friend request accepted.')
    return HttpResponse('Request does not exist.')


def rejectFriendRequest(request, otherUser):
    user = request.user
    friend_reqs = FriendRequest.objects.filter(models.Q(reqReceiver=user))
    
    for req in friend_reqs:
            if (req.reqSender == get_object_or_404(User, username=otherUser)):
                req.delete()
                return HttpResponse('Friend request rejected.')
    return HttpResponse('Request does not exist.')

class OutgoingPendingRequestsView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FriendRequestSerializer
    def get_queryset(self):
        user = self.request.user
        request_relations = FriendRequest.objects.filter(
            models.Q(reqSender=user) | models.Q(reqReceiver=user)
        ).distinct()
        request_ids = set()

        for relation in request_relations:
            if relation.reqSender == user:
                request_ids.add(relation.reqReceiver.id)
        # Returns the users whom the current user has sent friend requests (not yet answered).
        return get_user_model().objects.filter(id__in=request_ids)
    
class IncomingPendingRequestsView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FriendRequestSerializer
    def get_queryset(self):
        user = self.request.user
        request_relations = FriendRequest.objects.filter(
            models.Q(reqSender=user) | models.Q(reqReceiver=user)
        ).distinct()
        request_ids = set()

        for relation in request_relations:
            if relation.reqReceiver == user:
                request_ids.add(relation.reqSender.id)
        # Returns the users whom the current user has not yet answered the requests for.
        return get_user_model().objects.filter(id__in=request_ids)

def removeFriend(request, username):
    try:
        friend = get_object_or_404(Friend, friend1=get_object_or_404(User, username=username), friend2=request.user)
    except: 
        friend = get_object_or_404(Friend, friend2=request.user, friend1=get_object_or_404(User, username=username))
    
    friend.delete()
    return HttpResponse('Friend removed.')


class DetailedFriendListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserDetailSerializer

    def get_queryset(self):
        user = self.request.user
        friend_relations = Friend.objects.filter(
            models.Q(friend1=user) | models.Q(friend2=user)
        ).distinct()
        friend_ids = set()

        for relation in friend_relations:
            # Add both friend1 and friend2 ids, excluding the current user's id
            friend_ids.add(relation.friend1.id if relation.friend1 != user else relation.friend2.id)

        return get_user_model().objects.filter(id__in=friend_ids)
