import pytest
from django.urls import reverse

from client.models import Client
from client.serializers import ClientSerializer


### Unit Tests ###
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
def test_list_client(client):
    url = reverse("clients")
    response = client.get(url)

    clients = Client.objects.all()
    expected_data = ClientSerializer(clients, many=True).data

    assert response.status_code == 200
    assert response.data == expected_data


@pytest.mark.django_db
def test_create_client(client):
    url = reverse("clients")
    data = {
        "name": "John Doe",
        "email": "j@mail.com",
        "phone": "+123456789",
        "address": "123 Main St",
    }
    response = client.post(url, data, format="json")
    assert response.status_code == 201
    assert response.data["name"] == data["name"]
