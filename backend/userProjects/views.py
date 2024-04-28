from rest_framework import generics, permissions
 # Assuming User is the Django auth user model
from .models import Project, UserProfile, Match, UserProfile, User
from .serializers import ProjectSerializer, UserProfileSerializer, UserListSerializer, UserEmailSerializer
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import PermissionDenied
from django.db import models
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model

def list_pending_requests(request):
    # Assuming 'user1' is the one who sends the request and 'user2' is the recipient
    # Modify the query according to your logic if needed
    pending_requests_sent = Match.objects.filter(user1=request.user, status='pending').values_list('id', flat=True)
    pending_requests_received = Match.objects.filter(user2=request.user, status='pending').values_list('id', flat=True)

    # Combine both querysets if you want to see all pending requests related to the user
    pending_requests = list(pending_requests_sent) + list(pending_requests_received)

    return JsonResponse({'pending_request_ids': pending_requests})


def view_user_id(request, username):
    user = get_object_or_404(User, username=username)
    #return HttpResponse(f"The ID for user {username} is {user.id}")
    return HttpResponse(user.id)

def send_friend_request(request, user_id):
    # Ensure both sender and receiver are valid users, including admins
    sender = request.user
    receiver = get_object_or_404(User, id=user_id)

    # Prevent users from sending a friend request to themselves
    if sender == receiver:
        return HttpResponse("You cannot send a friend request to yourself")

    # Create or get the existing friend request
    match, created = Match.objects.get_or_create(
        user1=sender,
        user2=receiver,
        defaults={'status': 'pending'}
    )

    if created:
        return HttpResponse('Friend request sent')
    else:
        return HttpResponse('Friend request already sent')

def accept_friend_request(request, match_id):
    match = get_object_or_404(Match, id=match_id, user2=request.user)

    # Ensure the request.user is the recipient of the friend request
    if request.user != match.user2:
        return HttpResponse("You can only accept friend requests sent to you")

    match.status = 'accepted'
    match.save()
    return HttpResponse('Friend request accepted')


def get_username_by_id(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        username = user.username
        return JsonResponse({'username': username})
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)

def view_profile(request, user_id):
    # Assume user_id is the ID of the profile being viewed
    profile_owner = get_object_or_404(UserProfile, id=user_id)
    is_friends = Match.objects.filter(user1=request.user, user2=profile_owner.user, status='accepted').exists() or \
                 Match.objects.filter(user1=profile_owner.user, user2=request.user, status='accepted').exists()
    
    if is_friends:
        # Show the profile details
        return HttpResponse(f"Showing {profile_owner.full_name}'s profile")
    else:
        return HttpResponse("You are not friends with this user")
    
def get_user_pk(request, username):
    # Retrieve the user by username
    user = get_object_or_404(User, username=username)
    
    # Return the user's primary key in a JSON response
    return JsonResponse({'username': username, 'user_pk': user.id})
    
# show profile user when matched 
class MatchedUserProfileView(generics.RetrieveAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        other_username = self.kwargs.get('username')
        user = self.request.user
        other_user = get_object_or_404(User, username=other_username)

        # Check if there's a match
        match_exists = Match.objects.filter(
            (models.Q(user1=user, user2=other_user) | models.Q(user1=other_user, user2=user))
        ).exists()

        if match_exists:
            return other_user.userprofile  # Assuming a related_name 'userprofile' on UserProfile model
        else:
            raise PermissionDenied('You are not matched with this user.')


class ProjectCreateView(generics.CreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Associate the project with the logged-in user
        serializer.save(user=self.request.user)

class ProjectListView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]
    #Make sure you guys indent when doing def It took me like 20 minutes to figure out why I was getting an error 
    def get_queryset(self):
        # Filter projects by the current user
        return Project.objects.filter(user=self.request.user)

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user

class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    # No perform_create needed here

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # Ensure a UserProfile exists for the user or create one
        UserProfile.objects.get_or_create(user=self.request.user)
        return self.request.user.userprofile
    
class friendProjectView(APIView): 
    def get(self, request, username): 
        user = get_object_or_404(User, username=username)
        projects = Project.objects.filter(user=user)
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)


User = get_user_model()

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserListSerializer


class UserEmailView(generics.RetrieveAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserEmailSerializer
    lookup_field = 'username'