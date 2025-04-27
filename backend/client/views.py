from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework import status
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Client
from .serializers import ClientDetailSerializer, ClientSerializer


class ClientView(APIView):
    """
    API endpoint for listing and creating clients.

    Provides get and post methods to:
    - List all clients (with filtering and search capabilities)
    - Create new client records
    """

    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ["email"]
    search_fields = ["name", "email"]

    @extend_schema(
        description="Retrieve a list of all clients. Supports filtering by email and searching by name or email.",
        parameters=[
            OpenApiParameter(
                name="search",
                description="Search clients by name or email",
                required=False,
                type=str,
            ),
        ],
        responses={200: ClientSerializer(many=True)},
    )
    def get(self, request):
        clients = Client.objects.all()
        # Apply filtering
        for backend in list(self.filter_backends):
            clients = backend().filter_queryset(self.request, clients, self)

        serializer = ClientSerializer(clients, many=True)
        return Response(serializer.data)

    @extend_schema(
        description="Create a new client record.",
        request=ClientSerializer,
        responses={201: ClientSerializer, 400: "Bad Request - Invalid data"},
    )
    def post(self, request):
        serializer = ClientSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ClientDetailsView(APIView):
    """
    API endpoint for retrieving individual client details.
    """

    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    @extend_schema(
        description="Retrieve detailed information about a specific client.",
        responses={
            200: ClientDetailSerializer,
            404: "Not Found - Client with the specified ID does not exist",
        },
    )
    def get(self, request, pk):
        client = get_object_or_404(Client, pk=pk)
        serializer = ClientDetailSerializer(client)
        return Response(serializer.data, status=status.HTTP_200_OK)


# TODO: Filter clients by username
