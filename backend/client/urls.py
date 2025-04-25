from django.urls import include, path

from .views import ClientDetailsView, ClientView

urlpatterns = [
    path("", ClientView.as_view(), name="clients"),
    path("client/<int:pk>/", ClientDetailsView.as_view(), name="client-detail"),
]
