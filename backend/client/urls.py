from django.urls import include, path

from . import views

urlpatterns = [
    path("", views.ClientView.as_view(), name="clients"),
]
