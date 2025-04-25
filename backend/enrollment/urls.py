from django.urls import path

from . import views

urlpatterns = [
    path("", views.EnrollmentView.as_view(), name="add_enrollment"),
]
