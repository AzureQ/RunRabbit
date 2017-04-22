
package com.rabbit.model;

import java.util.List;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class RabbitMQService {

    @SerializedName("credentials")
    @Expose
    private Credentials credentials;
    @SerializedName("label")
    @Expose
    private String label;
    @SerializedName("name")
    @Expose
    private String name;
    @SerializedName("plan")
    @Expose
    private String plan;
    @SerializedName("provider")
    @Expose
    private Object provider;
    @SerializedName("syslog_drain_url")
    @Expose
    private Object syslogDrainUrl;
    @SerializedName("tags")
    @Expose
    private List<String> tags = null;
    @SerializedName("volume_mounts")
    @Expose
    private List<Object> volumeMounts = null;

    public Credentials getCredentials() {
        return credentials;
    }

    public void setCredentials(Credentials credentials) {
        this.credentials = credentials;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPlan() {
        return plan;
    }

    public void setPlan(String plan) {
        this.plan = plan;
    }

    public Object getProvider() {
        return provider;
    }

    public void setProvider(Object provider) {
        this.provider = provider;
    }

    public Object getSyslogDrainUrl() {
        return syslogDrainUrl;
    }

    public void setSyslogDrainUrl(Object syslogDrainUrl) {
        this.syslogDrainUrl = syslogDrainUrl;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public List<Object> getVolumeMounts() {
        return volumeMounts;
    }

    public void setVolumeMounts(List<Object> volumeMounts) {
        this.volumeMounts = volumeMounts;
    }

}
