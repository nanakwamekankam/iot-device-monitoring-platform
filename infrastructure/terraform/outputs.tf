output "instance_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.iot_monitor.public_ip
}

output "instance_public_dns" {
  description = "Public DNS name of the EC2 instance"
  value       = aws_instance.iot_monitor.public_dns
}

output "security_group_id" {
  description = "Security group ID"
  value       = aws_security_group.iot_monitor_sg.id
}
