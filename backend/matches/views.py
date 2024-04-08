from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
 # Assuming User is the Django auth user model
from .models import Match
from .serializers import MatchSerializer, UserSerializer
from userProjects.serializers import UserProfileSerializer
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.views.decorators.http import require_http_methods, require_POST
from django.http import HttpResponse, Http404
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponseNotFound
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated, AllowAny 
from django.core.exceptions import PermissionDenied
from django.db import models
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie 
from django.views import View 

# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_username(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@csrf_exempt
def send_match_request(request, sender_username, receiver_username):
    user1 = get_object_or_404(User, username=sender_username)
    user2 = get_object_or_404(User, username=receiver_username)

    if user1 == user2:
        return JsonResponse({'error': 'You cannot send a match request to yourself'}, status=400)

    match, created = Match.objects.get_or_create(
        sender=user1,
        receiver=user2,
        defaults={'status': 'pending'}
    )

    if created:
        return JsonResponse({'message': 'Match request sent'})
    else:
        return JsonResponse({'message': 'Match request already exists'}, status=200)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def decline_match_request(request, sender_username):
    # Get the current user as the receiver
    receiver = request.user

    # Find the match request where the current user is the receiver and the other user is the sender
    match_request = get_object_or_404(
        Match, 
        receiver=receiver, 
        sender__username=sender_username, 
        status='pending'
    )

    # Delete the match request
    match_request.delete()

    return JsonResponse({'message': 'Match request declined successfully'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def accept_match_request(request, sender_username): 
    receiver = request.user 
    match = get_object_or_404(Match, receiver=receiver, sender__username=sender_username, status='pending')
    match.status = 'accepted'
    match.save()
    return JsonResponse({'message': 'Match request accepted succesfully.'})
    

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def view_match_requests(request):
    # Get the current user as the receiver
    current_user = request.user

    # Filter Match objects where the current user is the receiver and the status is 'pending'
    match_requests = Match.objects.filter(receiver=current_user, status='pending')
    # Prepare the data to be returned, showing only relevant information
    data = [
        {
            'sender': match_request.sender.username,
            'matched_at': match_request.matched_at,
            'status': match_request.status
        }
        for match_request in match_requests
    ]

    return JsonResponse(data, safe=False)
    
class MatchedUserProfileView(generics.RetrieveAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        other_username = self.kwargs.get('username')
        user = self.request.user
        other_user = get_object_or_404(User, username=other_username)

        # Check if there's a match
        match_exists = Match.objects.filter(
            (models.Q(sender=user, receiver=other_user) | models.Q(sender=other_user, receiver=user))
        ).exists()

        if match_exists:
            return other_user.userprofile  # Assuming a related_name 'userprofile' on UserProfile model
        else:
            raise PermissionDenied('You are not matched with this user.')
        
class UserMatchesView(generics.ListAPIView):
    serializer_class = MatchSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Check if the user is authenticated
        if self.request.user.is_authenticated:
            user = self.request.user
            return Match.objects.filter(
                models.Q(sender=user) | models.Q(receiver=user),
                status__in=['accepted', 'pending']
            )
        # If the user is not authenticated, return an empty queryset
        return Match.objects.none()

    def get_serializer_context(self):
        return {'request': self.request}
    
class UserListView(APIView):
    def get(self, request):
        users = User.objects.all()
        usernames = [user.username for user in users]
        return Response(usernames)