runserver:
	docker-compose up psql -d
	docker-compose up api --build -d
	docker-compose exec api python3 manage.py migrate
	- docker-compose exec api python3 manage.py createsuperuser --noinput
	npm --prefix ./frontend/ run dev

api:
	docker-compose up psql -d
	docker-compose up api --build -d

migrate:
	docker-compose up psql -d
	docker-compose up api -d
	docker-compose exec api python3 manage.py migrate

migrations:
	docker-compose up psql -d
	docker-compose up api -d
	docker-compose exec api python3 manage.py makemigrations

shell:
	docker-compose up psql -d
	docker-compose up api -d
	docker-compose exec api python3 manage.py shell

black:
	docker-compose up psql -d
	docker-compose up api -d
	docker-compose exec api black .

down:
	docker-compose down