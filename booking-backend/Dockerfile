FROM openjdk:17-alpine

MAINTAINER Digicert

RUN addgroup -S agencybookingapp && adduser -S agencybookingapp -G agencybookingapp

ENV HOTEL_SYSTEM_HOME /opt/deployment/agencybookingapp/

# make deployment dir if not exist use if does
RUN mkdir -p /opt/deployment/agencybookingapp/lib/
RUN mkdir -p /opt/deployment/log/
RUN mkdir -p /opt/deployment/agencybookingapp/config/

# configure external jars:
#COPY config/* /opt/deployment/agencybookingapp/config/
#COPY lib/* /opt/deployment/agencybookingapp/lib/

COPY target/agency-booking-app-backend-0.0.1-SNAPSHOT.jar /opt/deployment/agencybookingapp/agency.jar

WORKDIR $HOTEL_SYSTEM_HOME

RUN chown -R agencybookingapp:agencybookingapp /opt/deployment
USER agencybookingapp

CMD java -Xms128m -Xmx1024m -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005  -jar /opt/deployment/agencybookingapp/agency.jar

