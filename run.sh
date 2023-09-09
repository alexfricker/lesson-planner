#! /bin/bash

python3 manage.py migrate
python3 manage.py createsuperuser --noinput
nginx
uwsgi --ini uwsgi.ini

exec "$@"