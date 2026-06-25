from django.contrib import admin
from .models import Device, Telemetry, Alert

# This serves as a built-in backend dashboard.
# to view, create, update, and delete database records without building a frontend.
# admin is useful to quickly inspect whether devices, telemetry, and alerts are being saved correctly.

# When the  simulator starts sending fake telemetry, 
# this is a quick way to verify the database is receiving it.

@admin.register(Device)
class DeviceAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "device_type", "location", "status", "last_seen")
    search_fields = ("name", "device_type", "location")
    list_filter = ("status", "device_type")


@admin.register(Telemetry)
class TelemetryAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "device",
        "temperature",
        "humidity",
        "battery_level",
        "signal_strength",
        "created_at",
    )
    list_filter = ("device", "created_at")


@admin.register(Alert)
class AlertAdmin(admin.ModelAdmin):
    list_display = ("id", "device", "alert_type", "severity", "resolved", "created_at")
    list_filter = ("severity", "resolved", "created_at")
    search_fields = ("alert_type", "message")