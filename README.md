# RunRabbit

### Local(Mac)

#### 1 Install RabbitMQ
```batch
brew install rabbitmq
```

#### 2 Edit application.properties

Update src/main/resources/application.properties
```batch
spring.profiles.active=rabbitmq-local
```

#### 3 Run
```batch
mvn spring-boot:run
```


### Cloud Foundry

#### 1 Edit application.properties

Update src/main/resources/application.properties 
```batch
spring.profiles.active=rabbitmq-cloud
```

#### 2 Compile
```batch
mvn clean package
```

#### 3 Push to Cloud Foundry
```batch
cf push
cf bind-service <app name in the manifest.yml> <rabbitmq servie instance>
```
