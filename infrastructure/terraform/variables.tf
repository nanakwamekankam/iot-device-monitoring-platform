variable "aws_region" {
  description = "AWS region where infrastructure will be created"
  type        = string
  default     = "us-east-2"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "key_pair_name" {
  description = "Name of the existing AWS EC2 key pair"
  type        = string
}

variable "project_name" {
  description = "Project name used for resource tags"
  type        = string
  default     = "iot-device-monitoring"
}

variable "allowed_cidr" {
  description = "CIDR block allowed to access SSH, backend, and frontend ports"
  type        = string
  default     = "0.0.0.0/0"
}
