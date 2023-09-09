########################
# Build app files
########################
FROM node:lts AS build

WORKDIR /app

COPY frontend/package.json .
COPY frontend/package-lock.json .

RUN npm install

COPY frontend .

ENV CI=true
ENV PORT=3000

RUN npm run build

########################
# Build image
########################
FROM python:3.11-slim
EXPOSE 8080
ENV DJANGO_SETTINGS_MODULE=lesson_planner.settings
WORKDIR /app

# os dependencies
RUN apt update && apt upgrade -y
RUN apt install -y \
    wget \
    nginx \
    software-properties-common \
    build-essential

# python dependencies
RUN pip install --upgrade pip
RUN pip install poetry==1.5.1
COPY poetry.lock .
COPY pyproject.toml .
RUN poetry config virtualenvs.create false && poetry install

# file system
COPY . .
RUN chmod +x run.sh
COPY .nginx/nginx.conf /etc/nginx/sites-available/default
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html/

RUN python3 manage.py collectstatic --noinput

CMD ["bash", "run.sh"]