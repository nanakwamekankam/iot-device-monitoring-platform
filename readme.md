This project was built to demonstrate end-to-end IoT application development using modern cloud-native technologies. It simulates edge devices that publish telemetry, processes that telemetry through a Django REST API, visualizes device health in a React dashboard, and deploys the entire stack on AWS using Docker. The project serves as a practical demonstration of backend development, frontend development, cloud infrastructure, and container orchestration.

# IoT Device Monitoring Platform

A full-stack IoT monitoring platform built with Django, React, Docker, and AWS.

This project simulates edge IoT devices that continuously transmit telemetry to a Django REST API. The backend stores telemetry, generates alerts when thresholds are exceeded, and exposes REST endpoints that are consumed by a React dashboard.

The project demonstrates cloud deployment, containerization, REST API development, and full-stack application design.

---

## Technologies

### Backend

- Django
- Django REST Framework

### Frontend

- React
- Vite
- Axios
- Recharts

### Cloud

- AWS EC2 (Ubuntu 24.04)

### DevOps

- Docker
- Docker Compose
- Git
- GitHub

---

## Architecture

                    AWS EC2 (Ubuntu)
                           │
                     Docker Compose
                           │
      ┌────────────────────┼────────────────────┐
      │                    │                    │
      ▼                    ▼                    ▼
 Django Backend      React Frontend      Device Simulator
      │                                        │
      └────────────── REST API ────────────────┘
                           │
                     SQLite Database

---

## Features

- Device registration
- Simulated IoT telemetry generation
- Automatic alert generation
- Django REST API
- React dashboard
- Dockerized backend
- Dockerized frontend
- Dockerized device simulator
- Cloud deployment on AWS EC2

---

## Running Locally

Clone the repository

```bash
git clone https://github.com/nanakwamekankam/iot-device-monitoring-platform.git
cd iot-device-monitoring-platform
```

## Docker compose

Build and startall services(Docker containers)

``` bash
docker compose up -d -build
```
Likewise to stop all services

``` bash
docker compose down
```

## Docker

Build only the backend

```bash
docker build -t iot-backend ./backend 
```

Run only the backend

```bash 
docker run --rm -p 8000:8000 iot-backend
```

Apply migrations inside the container

```bash
docker run --rm iot-backend python manage.py migrate
```

# Deployment Workflow

Clone the latest code

```bash
git pull
```

Stop existing containers

```bash
docker compose down
```

Build and deploy

```bash 
docker compose up -d --build
```

Verify deployment

```bash 
docker compose ps
```
