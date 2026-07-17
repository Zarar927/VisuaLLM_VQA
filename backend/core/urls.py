# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import UploadedImageViewSet

# router = DefaultRouter()
# router.register(r'images', UploadedImageViewSet, basename='uploadedimage')

# urlpatterns = [
#     path('', include(router.urls)),
# ]

# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import UploadedImageViewSet
# from .api.vqa import VQAAPIView  # ✅ Import directly from api.vqa

# router = DefaultRouter()
# router.register(r'images', UploadedImageViewSet, basename='uploadedimage')

# urlpatterns = [
#     path('', include(router.urls)),
#     path('vqa/', VQAAPIView.as_view(), name='vqa'),  # ✅ added endpoint
# ]


# core/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UploadedImageViewSet, VQAAPIView  # ✅ import both from views

# Router for model-based API endpoints
router = DefaultRouter()
router.register(r'images', UploadedImageViewSet, basename='uploadedimage')

# Final URL patterns
urlpatterns = [
    path('', include(router.urls)),
    path('vqa/', VQAAPIView.as_view(), name='vqa'),  # ✅ separate VQA endpoint
]
