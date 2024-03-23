from django.shortcuts import render

# Create your views here.
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required


