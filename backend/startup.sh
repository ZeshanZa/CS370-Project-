#!/bin/bash
python manage.py collectstatic && gunicorn --workers 2 django_proj.wsgi
python manage.py runserver 8000
