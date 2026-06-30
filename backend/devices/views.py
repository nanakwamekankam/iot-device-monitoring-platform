# from django.shortcuts import render
# from rest_framework import viewsets
# from .models import Device, Telemetry, Alert
# from .serializers import DeviceSerializer, TelemetrySerializer, AlertSerializer

# class DeviceViewSet(viewsets.ModelViewSet):
#     queryset = Device.objects.all().order_by("id")
#     serializer_class = DeviceSerializer


# class TelemetryViewSet(viewsets.ModelViewSet):
#     queryset = Telemetry.objects.select_related("device").all()
#     serializer_class = TelemetrySerializer

#     def get_queryset(self):
#         queryset = super().get_queryset()
#         device_id = self.request.query_params.get("device")

#         if device_id:
#             queryset = queryset.filter(device_id=device_id)

#         return queryset


# class AlertViewSet(viewsets.ModelViewSet):
#     queryset = Alert.objects.select_related("device").all()
#     serializer_class = AlertSerializer

#     def get_queryset(self):
#         queryset = super().get_queryset()
#         resolved = self.request.query_params.get("resolved")
#         severity = self.request.query_params.get("severity")

#         if resolved is not None:
#             queryset = queryset.filter(resolved=resolved.lower() == "true")

#         if severity:
#             queryset = queryset.filter(severity=severity)

#         return queryset

# ------------------------------------------------------------------------------------------------

from datetime import timedelta

from django.utils import timezone

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Device, Telemetry, Alert
from .serializers import DeviceSerializer, TelemetrySerializer, AlertSerializer, TelemetryIngestSerializer


@api_view(["GET"])
def device_list(request):
    devices = Device.objects.all()
    serializer = DeviceSerializer(devices, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def telemetry_list(request):
    telemetry = Telemetry.objects.all()[:100]
    serializer = TelemetrySerializer(telemetry, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def alert_list(request):
    alerts = Alert.objects.all()[:100]
    serializer = AlertSerializer(alerts, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def ingest_telemetry(request):
    serializer = TelemetryIngestSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    data = serializer.validated_data
    device_id = data["device_id"]

    device, created = Device.objects.get_or_create(
        name=device_id,
        defaults={
            "device_type": "simulated-edge-device",
            "location": "Simulated Environment",
            "status": "online",
            "last_seen": timezone.now(),
        },
    )

    device.status = "online"
    device.last_seen = timezone.now()
    device.save()

    telemetry = Telemetry.objects.create(
        device=device,
        temperature=data["temperature"],
        humidity=data["humidity"],
        battery_level=data["battery_level"],
        signal_strength=data["signal_strength"],
    )

    created_alerts = []

    if telemetry.temperature > 90:
        alert = Alert.objects.create(
            device=device,
            alert_type="HIGH_TEMPERATURE",
            severity="high",
            message=f"{device.name} temperature is too high: {telemetry.temperature}°F",
        )
        created_alerts.append(alert)

        device.status = "warning"
        device.save()

    if telemetry.battery_level < 20:
        alert = Alert.objects.create(
            device=device,
            alert_type="LOW_BATTERY",
            severity="medium",
            message=f"{device.name} battery is low: {telemetry.battery_level}%",
        )
        created_alerts.append(alert)

        device.status = "warning"
        device.save()

    telemetry_response = TelemetrySerializer(telemetry)
    alert_response = AlertSerializer(created_alerts, many=True)

    return Response(
        {
            "message": "Telemetry received successfully.",
            "telemetry": telemetry_response.data,
            "alerts_created": alert_response.data,
        },
        status=status.HTTP_201_CREATED,
    )


@api_view(["POST"])
def check_offline_devices(request):
    cutoff_time = timezone.now() - timedelta(minutes=5)
    devices = Device.objects.all()

    offline_alerts = []

    for device in devices:
        if device.last_seen and device.last_seen < cutoff_time:
            device.status = "offline"
            device.save()

            existing_alert = Alert.objects.filter(
                device=device,
                alert_type="OFFLINE",
                resolved=False,
            ).exists()

            if not existing_alert:
                alert = Alert.objects.create(
                    device=device,
                    alert_type="OFFLINE",
                    severity="critical",
                    message=f"{device.name} has not sent telemetry in over 5 minutes.",
                )
                offline_alerts.append(alert)

    serializer = AlertSerializer(offline_alerts, many=True)

    return Response(
        {
            "message": "Offline device check completed.",
            "offline_alerts_created": serializer.data,
        }
    )