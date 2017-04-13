
package com.rabbit.model;

import java.util.List;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Management {

    @SerializedName("host")
    @Expose
    private String host;
    @SerializedName("hosts")
    @Expose
    private List<String> hosts = null;
    @SerializedName("password")
    @Expose
    private String password;
    @SerializedName("path")
    @Expose
    private String path;
    @SerializedName("port")
    @Expose
    private Integer port;
    @SerializedName("ssl")
    @Expose
    private Boolean ssl;
    @SerializedName("uri")
    @Expose
    private String uri;
    @SerializedName("uris")
    @Expose
    private List<String> uris = null;
    @SerializedName("username")
    @Expose
    private String username;

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public List<String> getHosts() {
        return hosts;
    }

    public void setHosts(List<String> hosts) {
        this.hosts = hosts;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Integer getPort() {
        return port;
    }

    public void setPort(Integer port) {
        this.port = port;
    }

    public Boolean getSsl() {
        return ssl;
    }

    public void setSsl(Boolean ssl) {
        this.ssl = ssl;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public List<String> getUris() {
        return uris;
    }

    public void setUris(List<String> uris) {
        this.uris = uris;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}
