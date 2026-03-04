# Build stage
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM amazoncorretto:21
ARG PROFILE=dev
ARG APP_VERSION=0.0.3-SNAPSHOT

WORKDIR /app

COPY --from=build /build/target/book.network-${APP_VERSION}.jar /app/

EXPOSE 8088

ENV DB_URL=jdbc:postgresql://postgres-sql-bsn:5432/book_social_network
ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}
ENV EMAIL_HOSTNAME=smtp.gmail.com
ENV EMAIL_USER_NAME=farag0336@gmail.com
ENV EMAIL_PASSWORD=llaygylypsxkpufp

CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL} book.network-${APP_VERSION}.jar




