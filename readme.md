# IoT Device Monitoring Platform

A cloud-native IoT monitoring platform built with **Django REST Framework, React, Docker, Terraform, and AWS EC2**.

This project simulates IoT edge devices transmitting telemetry to a REST API. Incoming telemetry is processed by a Django backend, stored in a database, evaluated for alert conditions, and visualized through an interactive React dashboard. The application is fully containerized with Docker Compose, deployed on AWS EC2, and includes Terraform infrastructure definitions for reproducible cloud deployments.

---

# Project Highlights

- Simulated fleet of IoT edge devices
- Continuous telemetry ingestion
- Automatic alert generation
- Django REST API
- Interactive React dashboard
- Dockerized backend, frontend, and simulator
- AWS EC2 cloud deployment
- Infrastructure as Code using Terraform
- Reproducible cloud provisioning
- RESTful architecture

---

# Dashboard

![Dashboard](screenshots/frontend_dashboard.png)

---

# Devices

![Devices](screenshots/devices.png)

---

# Alerts

![Alerts](screenshots/alerts.png)

---

# Telemetry

![Telemetry](screenshots/telemetry.png)

---

# Technology Stack

## Backend

- Django
- Django REST Framework
- SQLite

## Frontend

- React
- Vite
- Axios
- Recharts

## Infrastructure

- Docker
- Docker Compose
- AWS EC2
- Terraform
- Ubuntu 24.04

## Development

- Git
- GitHub

---

# System Architecture

```text
                 Simulated IoT Devices
                          │
                          ▼
                 Django REST API
                          │
                 Alert Processing
                          │
                    SQLite Database
                          │
                          ▼
                 React Dashboard
                          │
                    Docker Compose
                          │
                    AWS EC2 (Ubuntu)

          Infrastructure Provisioned by Terraform
```

---

# Project Structure

```text
iot-device-monitoring-platform/

├── backend/
├── frontend/
├── simulator/
├── infrastructure/
│   └── terraform/
├── screenshots/
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

# REST API

| Endpoint | Description |
|----------|-------------|
| `/api/devices/` | List all registered devices |
| `/api/telemetry/` | Retrieve telemetry readings |
| `/api/alerts/` | Retrieve generated alerts |
| `/api/telemetry/ingest/` | Receive simulated telemetry |

---

# Running Locally

Clone the repository

```bash
git clone https://github.com/nanakwamekankam/iot-device-monitoring-platform.git

cd iot-device-monitoring-platform
```

Build and start all services

```bash
docker compose up --build
```

Access the application

Frontend

```
http://localhost:5173
```

Backend API

```
http://localhost:8000/api/
```

Stop services

```bash
docker compose down
```

---

# Deploying to AWS EC2

Clone the repository

```bash
git clone https://github.com/nanakwamekankam/iot-device-monitoring-platform.git

cd iot-device-monitoring-platform
```

Build and start

```bash
docker compose up -d --build
```

Verify

```bash
docker compose ps
```

---

# Terraform Infrastructure

Terraform files are located in:

```text
infrastructure/terraform/
```

Validate configuration

```bash
terraform fmt

terraform init

terraform validate
```

Preview infrastructure changes

```bash
terraform plan
```

![Teraform](screenshots/teraform-plan-output.png)

Provision infrastructure

```bash
terraform apply
```

Destroy infrastructure

```bash
terraform destroy
```

> **Note:** Terraform provisions a new EC2 instance and security group. It does not manage the manually created EC2 instance used during development.

---

# Skills Demonstrated

- Full-stack software engineering
- REST API development
- React frontend development
- Infrastructure as Code (Terraform)
- Docker containerization
- Cloud deployment on AWS EC2
- Cloud networking (Security Groups)
- Linux server administration
- Git-based deployment workflow
- Client-server architecture