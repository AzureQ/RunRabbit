# RunRabbit

### Local(Mac)

#### 1 Install RabbitMQ
```batch
brew install rabbitmq
```

#### 2 Compile

```batch
cd RunRabbit
mvn clean package
mvn spring-boot:run
```


### Cloud Foundry

#### 1 Compile
```batch
mvn clean package
```

#### 2 Push to Cloud Foundry
```batch
cf push
cf bind-service <app name in the manifest.yml> <rabbitmq servie instance>
```
