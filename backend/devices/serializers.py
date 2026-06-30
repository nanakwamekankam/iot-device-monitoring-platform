from rest_framework import serializers
from .models import Device, Telemetry, Alert

# Database models are Python objects, this serializer is going to convert objects to JSON format
class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = "__all__"


class TelemetrySerializer(serializers.ModelSerializer):
    device_name = serializers.CharField(source="device.name", read_only=True)

    class Meta:
        model = Telemetry
        fields = [
            "id",
            "device",
            "device_name",
            "temperature",
            "humidity",
            "battery_level",
            "signal_strength",
            "created_at",
        ]


class AlertSerializer(serializers.ModelSerializer):
    device_name = serializers.CharField(source="device.name", read_only=True)

    class Meta:
        model = Alert
        fields = [
            "id",
            "device",
            "device_name",
            "alert_type",
            "severity",
            "message",
            "resolved",
            "created_at",
        ]


class TelemetryIngestSerializer(serializers.Serializer):
    device_id = serializers.CharField()
    temperature = serializers.FloatField()
    humidity = serializers.FloatField()
    battery_level = serializers.FloatField()
    signal_strength = serializers.FloatField()