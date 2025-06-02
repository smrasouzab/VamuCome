# Etapa 1: build com Maven e Java 24
FROM eclipse-temurin:24-jdk AS build
WORKDIR /app

# Instala Maven manualmente
RUN apt-get update && \
    apt-get install -y maven && \
    apt-get clean

COPY Back/ /app
RUN mvn clean package -DskipTests

# Etapa 2: runtime mais leve com JDK 24
FROM eclipse-temurin:24-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]