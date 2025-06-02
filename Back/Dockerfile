# Etapa 1: build com Maven e Java 21
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY Back/ /app
RUN mvn clean package -DskipTests

# Etapa 2: usar JDK leve com o .jar final
FROM eclipse-temurin:21-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]