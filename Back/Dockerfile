# Etapa 1: build com Maven
FROM maven:3.9.2-eclipse-temurin-24 AS build
WORKDIR /app
COPY Back/ /app
RUN mvn clean package -DskipTests

# Etapa 2: usar JDK mais leve só com o .jar final
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]