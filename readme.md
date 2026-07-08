# IoT Device Monitoring Platform

A cloud-native IoT monitoring platform built with **Django REST Framework**, **React**, **Docker**, **Terraform**, and **AWS EC2**.

This project simulates a fleet of IoT edge devices transmitting telemetry to a REST API. Incoming telemetry is stored in a database, monitored for threshold violations, and displayed through a responsive React dashboard. The application is containerized with Docker Compose, deployed on AWS EC2, and the cloud infrastructure can be recreated using Terraform.

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

# Features

- Simulated fleet of IoT devices
- Automatic telemetry generation
- Threshold-based alert generation
- Django REST API
- React dashboard
- Interactive telemetry visualization
- Dockerized backend and frontend
- Infrastructure as Code using Terraform
- AWS EC2 deployment
- RESTful architecture

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

- AWS EC2
- Ubuntu 24.04
- Docker
- Docker Compose
- Terraform

## Development

- Git
- GitHub

---

# System Architecture

```text
                    Simulated IoT Devices
                             │
                             │
                      HTTP REST Requests
                             │
                             ▼
                 ┌─────────────────────────┐
                 │     Django REST API     │
                 └──────────┬──────────────┘
                            │
                     Store Telemetry
                            │
                            ▼
                     SQLite Database
                            │
                     REST Endpoints
                            │
                            ▼
                  React Dashboard (Vite)
                            │
                     Interactive Charts
                            │
                            ▼
                    End User Browser


Entire application deployed on:

AWS EC2
    │
Ubuntu 24.04
    │
Docker Compose
```

---

# Project Structure

```text
iot-device-monitoring-platform/

├── backend/
│   ├── devices/
│   ├── monitoring/
│   ├── Dockerfile
│   └── manage.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── Dockerfile
│
├── simulator/
│   └── device_simulator.py
│
├── infrastructure/
│   └── terraform/
│       ├── main.tf
│       ├── variables.tf
│       ├── outputs.tf
│       └── README.md
│
├── screenshots/
│
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

# REST API

| Endpoint | Description |
|-----------|-------------|
| `/api/devices/` | List all simulated devices |
| `/api/telemetry/` | Retrieve telemetry readings |
| `/api/alerts/` | Retrieve generated alerts |

---

# Running Locally

Clone the repository

```bash
git clone https://github.com/nanakwamekankam/iot-device-monitoring-platform.git

cd iot-device-monitoring-platform
```

Start all services

```bash
docker compose up -d --build
```

Verify containers

```bash
docker compose ps
```

Stop the application

```bash
docker compose down
```

---

# Running the Device Simulator

Start the backend first, then run

```bash
python simulator/device_simulator.py
```

The simulator continuously generates random telemetry and automatically creates alerts whenever configured thresholds are exceeded.

---

# Deployment

Update the server

```bash
git pull
```

Rebuild containers

```bash
docker compose down

docker compose up -d --build
```

Verify

```bash
docker compose ps
```

---

# Terraform Infrastructure

The project includes Terraform configuration capable of provisioning AWS infrastructure.

Resources include:

- EC2 instance
- Security Group
- SSH access
- Django API port (8000)
- React frontend port (5173)
- Terraform outputs for public IP and DNS

Initialize Terraform

```bash
cd infrastructure/terraform

terraform init
```

Validate configuration

```bash
terraform validate
```

Preview infrastructure

```bash
terraform plan
```
![Terraform-Plan](screenshots/terraform-plan-output.png)

To provision infrastructure

```bash
terraform apply
```

---

# Skills Demonstrated

- Full-stack application development
- Django REST API development
- React frontend development
- Docker containerization
- Infrastructure as Code (Terraform)
- Cloud deployment on AWS EC2
- Linux server administration
- Git and GitHub workflow
- RESTful architecture
- IoT telemetry simulation
- Client-server architecture

---

# Future Improvements

- PostgreSQL instead of SQLite
- MQTT message broker
- AWS RDS backend
- AWS Application Load Balancer
- HTTPS with Nginx
- GitHub Actions CI/CD
- CloudWatch monitoring
- Authentication and user management
- Device registration workflow
- Historical analytics dashboard