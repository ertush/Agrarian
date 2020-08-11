FROM eclipse-mosquitto:latest

WORKDIR /data

# Remove Existing config file
SHELL ["/bin/sh", "-c"]
RUN rm /mosquitto/config/mosquitto.conf

# Adding new config file
COPY ./config/mosquitto.conf /mosquitto/config/

# Set up a mosquitto pid file and a log file
# SHELL ["/bin/sh", "-c"]
# RUN touch /var/run/mosquitto.pid\
#     && touch /mosquitto/log/mosquitto.log\
#     && chmod 755 /mosquitto/log/mosquitto.log
   
# Setting a password for mosquitto
SHELL ["/bin/sh", "-c"]
RUN touch /data/passfile ; mosquitto_passwd -b /data/passfile mqtt_user microARG77

EXPOSE 1883

ENTRYPOINT [ "mosquitto", "-c", "/mosquitto/config/mosquitto.conf", "-p", "1883", "-v" ]