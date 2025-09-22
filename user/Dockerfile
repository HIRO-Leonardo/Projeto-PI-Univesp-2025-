FROM  maven:3.9.7-eclipse-temurin-21 AS build

COPY src /user/src
COPY pom.xml /user

WORKDIR /user

# Compila o projeto
# Remova -DskipTests se quiser que os testes rodem no container
RUN mvn clean install

# Imagem de runtime com JRE mais recente
FROM openjdk:21-jdk

# Copia o JAR gerado da fase 'build'
COPY --from=build /user/target/user-0.0.1-SNAPSHOT.jar /user/app.jar

WORKDIR /user

EXPOSE 8080

# Executa a aplicação
CMD ["java", "-jar", "app.jar"]