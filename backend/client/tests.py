# Create your tests here.
import pytest
from django.urls import reverse

from client.models import Client
from client.serializers import ClientSerializer


@pytest.mark.django_db
def test_get_clients(client):
    url = reverse("clients")
    response = client.get(url)

    articles = Client.objects.all()
    expected_data = ClientSerializer(articles, many=True).data

    assert response.status_code == 200
    assert response.data == expected_data
