from django.urls import path
from . import views

urlpatterns = [
    path('', views.main),
    path('upload/',views.upload),
    path('search/',views.search),
]
