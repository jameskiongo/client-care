from django.urls import path

from . import views

urlpatterns = [
    path("", views.ProgramView.as_view(), name="programs"),
    path(
        "program/<int:pk>/",
        views.ProgramSpecificView.as_view(),
        name="program_specific",
    ),
]
