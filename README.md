# Client-care system

A streamlined health program management system designed for healthcare providers to efficiently register clients, enroll them in various health programs, and manage their profiles.

## Project Links

[Project Presentation](https://www.slideshare.net/secret/dKFHzijP7Ajng8)

[Video Walk through](https://www.loom.com/share/ac0ad0fee1bb46fd994850f780228fd3?sid=98f88790-46a8-4b71-bf6f-082ffe865de1)

## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Django, Django rest famework

## Installation

1. Clone repo and install dependencies:

```bash
git clone https://github.com/jameskiongo/client-care.git
cd client-care/backend
pip install -r requirements.txt
```

## Make migrations

python manage.py migrate

## Create superuser

python manage.py createsuperuser

## Run Server

python manage.py runserver

## Frontend

```bash
cd ../frontend
npm install
npm run dev
```

## Running Tests

To run tests, run the following command

```bash
  cd ../backend
  pytest
```

## Documentation

To run tests, run the following command

```bash
  python3 manage.py spectacular --color --file schema.yml
```

