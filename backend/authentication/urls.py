from django.urls import include, path

from . import views

urlpatterns = [
    path("login/", include("dj_rest_auth.urls")),
]
