admin username: admin
email: nanakwameboakyekankam@gmail.com
password: iotmonitoradmin

For Docker
build the container
    docker build -t iot-backend ./backend

run the container
    docker run --rm -p 8000:8000 iot-backend
    
**docker run --rm iot-backend python manage.py migrate**