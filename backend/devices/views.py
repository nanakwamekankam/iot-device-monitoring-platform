from django.shortcuts import render
from rest_framework import viewsets
from .models import Device, Telemetry, Alert
from .serializers import DeviceSerializer, TelemetrySerializer, AlertSerializer


class DeviceViewSet(viewsets.ModelViewSet):
    queryset = Device.objects.all().order_by("id")
    serializer_class = DeviceSerializer


class TelemetryViewSet(viewsets.ModelViewSet):
    queryset = Telemetry.objects.select_related("device").all()
    serializer_class = TelemetrySerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        device_id = self.request.query_params.get("device")

        if device_id:
            queryset = queryset.filter(device_id=device_id)

        return queryset


class AlertViewSet(viewsets.ModelViewSet):
    queryset = Alert.objects.select_related("device").all()
    serializer_class = AlertSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        resolved = self.request.query_params.get("resolved")
        severity = self.request.query_params.get("severity")

        if resolved is not None:
            queryset = queryset.filter(resolved=resolved.lower() == "true")

        if severity:
            queryset = queryset.filter(severity=severity)

        return queryset