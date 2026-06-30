import time
import random
import requests
from datetime import datetime


API_URL = "http://127.0.0.1:8000/api/telemetry/ingest/"

DEVICES = ["edge-001", "edge-002", "edge-003"]


def generate_telemetry(device_id):
    """
    Generate fake telemetry data for one device.
    This imitates real sensor readings from an edge/IoT device.
    """
    return {
        "device_id": device_id,
        "temperature": round(random.uniform(65, 105), 2),
        "humidity": round(random.uniform(30, 80), 2),
        "battery_level": random.randint(5, 100),
        "signal_strength": random.randint(-90, -40),
        "timestamp": datetime.utcnow().isoformat()
    }


def send_telemetry(payload):
    """
    Send telemetry payload to the Django backend.
    """
    try:
        response = requests.post(API_URL, json=payload, timeout=5)

        if response.status_code in [200, 201]:
            print(f"Sent: {payload}")
        else:
            print(f"Failed: {response.status_code} - {response.text}")

    except requests.exceptions.RequestException as error:
        print(f"Connection error: {error}")


def run_simulator():
    """
    Continuously generate and send telemetry.
    """
    while True:
        for device_id in DEVICES:
            payload = generate_telemetry(device_id)
            send_telemetry(payload)

        time.sleep(10)


if __name__ == "__main__":
    run_simulator()