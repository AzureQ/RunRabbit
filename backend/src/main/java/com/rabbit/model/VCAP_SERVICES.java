package com.rabbit.model;

import com.google.gson.annotations.SerializedName;

import java.util.List;

/**
 * Created by qshao on 3/3/17.
 */
public class VCAP_SERVICES {
    @SerializedName(value = "p-rabbitmq", alternate = {"rabbitmq-odb"})
    private List<RabbitMQService> rabbits;

    public List<RabbitMQService> getRabbits() {
        return rabbits;
    }

    public void setRabbits(List<RabbitMQService> rabbits) {
        this.rabbits = rabbits;
    }

}
