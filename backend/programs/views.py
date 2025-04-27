from django.shortcuts import get_object_or_404
from drf_spectacular.utils import (
    OpenApiExample,
    OpenApiResponse,
    extend_schema,
    inline_serializer,
)
from rest_framework import serializers, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Program
from .serializers import ProgramDetailSerializer, ProgramSerializer


class ProgramView(APIView):
    """
    API endpoint for managing programs collection.
    Provides operations to list all programs and create new ones.
    """

    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    @extend_schema(
        description="Retrieve a list of all programs.",
        responses={
            200: ProgramSerializer(many=True),
            401: OpenApiResponse(
                description="Unauthorized - Authentication credentials were not provided",
                response=inline_serializer(
                    name="UnauthorizedResponse",
                    fields={
                        "detail": serializers.CharField(
                            default="Authentication credentials were not provided."
                        )
                    },
                ),
            ),
        },
        examples=[
            OpenApiExample(
                "Success Example",
                value=[
                    {
                        "id": 1,
                        "name": "Sample Program",
                        "description": "Program description",
                        "start_date": "2023-01-01",
                    }
                ],
                status_codes=["200"],
            )
        ],
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
            400: OpenApiResponse(
                description="Bad Request - Invalid data",
                response=inline_serializer(
                    name="BadRequestResponse",
                    fields={
                        "field_name": serializers.ListField(
                            child=serializers.CharField(
                                default="This field is required."
                            )
                        )
                    },
                ),
            ),
            401: OpenApiResponse(
                description="Unauthorized - Authentication credentials were not provided",
                response=inline_serializer(
                    name="UnauthorizedResponse",
                    fields={
                        "detail": serializers.CharField(
                            default="Authentication credentials were not provided."
                        )
                    },
                ),
            ),
        },
        examples=[
            OpenApiExample(
                "Request Example",
                value={
                    "name": "New Program",
                    "description": "Program description",
                    "start_date": "2023-01-01",
                },
                request_only=True,
            )
        ],
    )
    def post(self, request):
        serializer = ProgramSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProgramSpecificView(APIView):
    """
    API endpoint for managing individual programs.
    Provides operations to retrieve, update, and delete specific programs.
    """

    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    @extend_schema(
        description="Retrieve detailed information about a specific program.",
        responses={
            200: ProgramDetailSerializer,
            401: OpenApiResponse(
                description="Unauthorized - Authentication credentials were not provided",
                response=inline_serializer(
                    name="UnauthorizedResponse",
                    fields={
                        "detail": serializers.CharField(
                            default="Authentication credentials were not provided."
                        )
                    },
                ),
            ),
            404: OpenApiResponse(
                description="Not Found - Program with the specified ID does not exist",
                response=inline_serializer(
                    name="NotFoundResponse",
                    fields={"detail": serializers.CharField(default="Not found.")},
                ),
            ),
        },
        examples=[
            OpenApiExample(
                "Success Example",
                value={
                    "id": 1,
                    "name": "Sample Program",
                    "description": "Detailed program description",
                    "start_date": "2023-01-01",
                    "end_date": "2023-12-31",
                    "created_at": "2023-01-01T00:00:00Z",
                },
                status_codes=["200"],
            )
        ],
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
            400: OpenApiResponse(
                description="Bad Request - Invalid data",
                response=inline_serializer(
                    name="BadRequestResponse",
                    fields={
                        "field_name": serializers.ListField(
                            child=serializers.CharField(
                                default="This field is required."
                            )
                        )
                    },
                ),
            ),
            401: OpenApiResponse(
                description="Unauthorized - Authentication credentials were not provided",
                response=inline_serializer(
                    name="UnauthorizedResponse",
                    fields={
                        "detail": serializers.CharField(
                            default="Authentication credentials were not provided."
                        )
                    },
                ),
            ),
            404: OpenApiResponse(
                description="Not Found - Program with the specified ID does not exist",
                response=inline_serializer(
                    name="NotFoundResponse",
                    fields={"detail": serializers.CharField(default="Not found.")},
                ),
            ),
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
            204: OpenApiResponse(
                description="No Content - Program successfully deleted"
            ),
            401: OpenApiResponse(
                description="Unauthorized - Authentication credentials were not provided",
                response=inline_serializer(
                    name="UnauthorizedResponse",
                    fields={
                        "detail": serializers.CharField(
                            default="Authentication credentials were not provided."
                        )
                    },
                ),
            ),
            404: OpenApiResponse(
                description="Not Found - Program with the specified ID does not exist",
                response=inline_serializer(
                    name="NotFoundResponse",
                    fields={"detail": serializers.CharField(default="Not found.")},
                ),
            ),
        },
    )
    def delete(self, request, pk):
        program = get_object_or_404(Program, pk=pk)
        program.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
