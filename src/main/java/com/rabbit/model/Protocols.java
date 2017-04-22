
package com.rabbit.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Protocols {

    @SerializedName("amqp")
    @Expose
    private Amqp amqp;
    @SerializedName("management")
    @Expose
    private Management management;

    public Amqp getAmqp() {
        return amqp;
    }

    public void setAmqp(Amqp amqp) {
        this.amqp = amqp;
    }

    public Management getManagement() {
        return management;
    }

    public void setManagement(Management management) {
        this.management = management;
    }

}
