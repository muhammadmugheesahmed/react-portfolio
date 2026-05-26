from django.shortcuts import render
from rest_framework import generics
from .models import Recommendation
from .serializers import RecommendationSerializer

class RecommendationListCreate(generics.ListCreateAPIView):
    queryset = Recommendation.objects.all().order_by('-created_at')
    serializer_class = RecommendationSerializer
# Create your views here.
