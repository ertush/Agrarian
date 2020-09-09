FROM eclipse-mosquitto:latest

WORKDIR /data

# Remove Existing config file
SHELL ["/bin/sh", "-c"]
RUN rm /mosquitto/config/mosquitto.conf

# Adding new config file
COPY ./config/mosquitto.conf /mosquitto/config/

SHELL ["/bin/sh", "-c"]
RUN touch /data/passfile ; mosquitto_passwd -b /data/passfile mqtt_user microARG77

ENTRYPOINT [ "mosquitto", "-c", "/mosquitto/config/mosquitto.conf", "-p", "1883", "-v" ]

LABEL Author="Eric Mutua" 