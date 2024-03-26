# Create your views here.
from django.shortcuts import render 
from .models import Project
from .serializers import ProjectSerializer
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse

def project_detail(request): 
    model = Project.objects.all()
    serializer = ProjectSerializer(model, many=True) 
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data, content_type='application/json') 
    