FROM java:8
WORKDIR /
ADD build/libs/project-0.0.1-SNAPSHOT.jar project.jar
EXPOSE 9090
CMD ["java", "-jar", "project.jar"]
