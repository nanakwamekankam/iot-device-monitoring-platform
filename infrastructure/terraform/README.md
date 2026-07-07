# Terraform Infrastructure

This folder contains Terraform configuration for provisioning the AWS infrastructure used by the IoT Device Monitoring Platform.

## Resources Created

- EC2 instance
- Security group
- Inbound ports:
  - 22 for SSH
  - 8000 for Django API
  - 5173 for React frontend
- Ubuntu 24.04 AMI
- Existing AWS key pair reference
- Public IP output

## Important Safety Note

This Terraform setup is meant to recreate the EC2 infrastructure used for the project.

It does not manage the currently running manually-created EC2 instance unless explicitly imported into Terraform state. Do not destroy or replace the working instance without testing first.

## Usage

Initialize Terraform:

```bash
terraform init
