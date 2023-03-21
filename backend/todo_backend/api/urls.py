from django.urls import path
from .views import Products, Materials


urlpatterns = [
    # many to many intermediate using
    path('products/', Products.as_view()),
    path('materials/', Materials.as_view()),
    ]
