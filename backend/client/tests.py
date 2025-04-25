import pytest
from django.urls import reverse
from rest_framework.test import APIClient

from authentication.models import User
from client.models import Client
from client.serializers import ClientSerializer


## Unit Tests ###
def test_client_serializer_valid_data():
    data = {
        "name": "John Doe",
        "email": "john@mail.com",
        "phone": "+123456789",
    }
    serializer = ClientSerializer(data=data)
    assert serializer.is_valid()
    assert serializer.validated_data["name"] == "John Doe"


### Integration Tests ###
@pytest.mark.django_db
def test_list_client_authenticated():

    client = APIClient()
    # 1. Create test user
    test_email = "testuser@example.com"
    test_password = "testpass123"
    user = User.objects.create_user(
        email=test_email,
        password=test_password,
        username="test",
        is_active=True,  # Ensure user is active
    )

    # Verify user was created
    assert User.objects.filter(email=test_email).exists(), "Test user was not created"

    # 1. First login to get access token
    login_response = client.post(
        reverse("rest_login"),
        {"email": "testuser@example.com", "password": "testpass123"},
    )

    # Print login response for debugging
    print("\nLogin response:", login_response.json())

    assert login_response.status_code == 200, f"Login failed: {login_response.json()}"

    # Get access token (adjust key based on your API response)
    access_token = (
        login_response.json().get("access_token")
        or login_response.json().get("key")
        or login_response.json().get("access")
    )
    assert access_token, "No access token found in login response"

    # 2. Set authorization header
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")

    # client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")
    headers = {"Authorization": f"Bearer {access_token}"}
    response = client.get(reverse("clients"), headers=headers, format="json")

    assert response.status_code == 200


@pytest.mark.django_db
def test_create_client_authenticated(client):
    client = APIClient()

    # 1. Create test user
    test_email = "testuser@example.com"
    test_password = "testpass123"
    user = User.objects.create_user(
        email=test_email,
        password=test_password,
        username="test",
        is_active=True,  # Ensure user is active
    )

    # Verify user was created
    assert User.objects.filter(email=test_email).exists(), "Test user was not created"

    # 1. First login to get access token
    login_response = client.post(
        reverse("rest_login"),
        {"email": "testuser@example.com", "password": "testpass123"},
    )

    # Print login response for debugging
    print("\nLogin response:", login_response.json())

    assert login_response.status_code == 200, f"Login failed: {login_response.json()}"

    # Get access token (adjust key based on your API response)
    access_token = (
        login_response.json().get("access_token")
        or login_response.json().get("key")
        or login_response.json().get("access")
    )
    assert access_token, "No access token found in login response"

    # 2. Set authorization header
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")

    # 3. Make authenticated request to create client
    url = reverse("clients")
    data = {
        "name": "John Doe",
        "email": "j@mail.com",
        "phone": "+123456789",
    }
    response = client.post(url, data, format="json")

    # Print creation response for debugging
    print("\nCreate client response:", response.json())

    # Assertions
    assert response.status_code == 201, f"Client creation failed: {response.json()}"
    assert response.data["name"] == data["name"]
    assert response.data["email"] == data["email"]
