from django.contrib import admin
from django.urls import path, include
from api.views import RecommendationListCreate

urlpatterns = [
    # Routes to the built-in Django admin interface
    path('admin/', admin.site.urls),
    
    path('api/recommendations/',RecommendationListCreate.as_view(), name= 'recommendation-list-create'),
    # Includes all URLs from your specific app (e.g., 'myapp')
    
]