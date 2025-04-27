from django.shortcuts import get_object_or_404
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Program
from .serializers import ProgramDetailSerializer, ProgramSerializer


class ProgramView(APIView):

    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    @extend_schema(
        description="Retrieve a list of all programs.",
        responses={
            200: ProgramSerializer(many=True),
            401: "Unauthorized - Authentication credentials were not provided",
        },
    )
    def get(self, request):
        programs = Program.objects.all()
        serializer = ProgramSerializer(programs, many=True)
        return Response(serializer.data)

    @extend_schema(
        description="Create a new program.",
        request=ProgramSerializer,
        responses={
            201: ProgramSerializer,
            400: "Bad Request - Invalid data",
            401: "Unauthorized - Authentication credentials were not provided",
        },
    )
    def post(self, request):
        serializer = ProgramSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProgramSpecificView(APIView):

    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    @extend_schema(
        description="Retrieve detailed information about a specific program.",
        responses={
            200: ProgramDetailSerializer,
            401: "Unauthorized - Authentication credentials were not provided",
            404: "Not Found - Program with the specified ID does not exist",
        },
    )
    def get(self, request, pk):
        program = get_object_or_404(Program, pk=pk)
        serializer = ProgramDetailSerializer(program)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(
        description="Update an existing program (partial updates supported).",
        request=ProgramDetailSerializer,
        responses={
            200: ProgramDetailSerializer,
            400: "Bad Request - Invalid data",
            401: "Unauthorized - Authentication credentials were not provided",
            404: "Not Found - Program with the specified ID does not exist",
        },
    )
    def put(self, request, pk):
        program = get_object_or_404(Program, pk=pk)
        serializer = ProgramDetailSerializer(program, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
        description="Delete a specific program.",
        responses={
            204: "No Content - Program successfully deleted",
            401: "Unauthorized - Authentication credentials were not provided",
            404: "Not Found - Program with the specified ID does not exist",
        },
    )
    def delete(self, request, pk):
        program = get_object_or_404(Program, pk=pk)
        program.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
