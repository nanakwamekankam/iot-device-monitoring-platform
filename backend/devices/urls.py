# from rest_framework.routers import DefaultRouter
# from .views import DeviceViewSet, TelemetryViewSet, AlertViewSet

# router = DefaultRouter()
# router.register(r"devices", DeviceViewSet)
# router.register(r"telemetry", TelemetryViewSet)
# router.register(r"alerts", AlertViewSet)

# urlpatterns = router.urls

# ----------------------------------------------------------------------------------------------

from django.urls import path
from . import views

urlpatterns = [
    path("devices/", views.device_list, name="device-list"),
    path("telemetry/", views.telemetry_list, name="telemetry-list"),
    path("alerts/", views.alert_list, name="alert-list"),
    path("telemetry/ingest/", views.ingest_telemetry, name="ingest-telemetry"),
    path("devices/check-offline/", views.check_offline_devices, name="check-offline-devices"),
]