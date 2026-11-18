
FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

COPY . .

RUN chmod +x gradlew

RUN ./gradlew bootJar --no-daemon

RUN JAR_FILE=$(find build/libs -maxdepth 1 -name "*.jar" ! -name "*-plain.jar" | head -n 1) \
    && cp "$JAR_FILE" /app/app.jar


FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/app.jar app.jar

EXPOSE 10000

ENTRYPOINT ["java", "-jar", "app.jar"]
