package com.rabbit.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("rabbitmq-local")
public class RabbitMQLocalConfig {
    @Bean(name = "amqpURI")
    public String getURI() {
        return "amqp://guest:guest@localhost:5672/%2F";
    }
}