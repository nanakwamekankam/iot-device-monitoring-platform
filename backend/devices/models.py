from django.db import models
# Builds the backend foundation and the core data and API layer.
# Establishes and manages the devices, their readings and alerts
# Device → the IoT machine/sensor
# Telemetry → readings coming from that device
# Alert → problems detected from that device


class Device(models.Model):
    STATUS_CHOICES = [
        ("online", "Online"),
        ("offline", "Offline"),
        ("warning", "Warning"),
        ("maintenance", "Maintenance"),
    ]

    name = models.CharField(max_length=100) # Human-readable device name.
    device_type = models.CharField(max_length=100) # The category of device.
    location = models.CharField(max_length=150) # Where the device is installed.
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="offline"
    ) # Current state of the device
    last_seen = models.DateTimeField(null=True, blank=True) # Last time the backend received data from it

    def __str__(self):
        return f"{self.name} ({self.status})"


class Telemetry(models.Model):
    device = models.ForeignKey(
        Device,
        on_delete=models.CASCADE,
        related_name="telemetry"
    )
    temperature = models.FloatField()
    humidity = models.FloatField()
    battery_level = models.FloatField()
    signal_strength = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.device.name} telemetry @ {self.created_at}"


class Alert(models.Model):
    SEVERITY_CHOICES = [
        ("low", "Low"),
        ("medium", "Medium"),
        ("high", "High"),
        ("critical", "Critical"),
    ]

    device = models.ForeignKey(
        Device,
        on_delete=models.CASCADE,
        related_name="alerts"
    )
    alert_type = models.CharField(max_length=100)
    severity = models.CharField(max_length=20, choices=SEVERITY_CHOICES)
    message = models.TextField()
    resolved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.severity.upper()} - {self.alert_type}"