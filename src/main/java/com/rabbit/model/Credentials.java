
package com.rabbit.model;

import java.util.List;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Credentials {

    @SerializedName("dashboard_url")
    @Expose
    private String dashboardUrl;
    @SerializedName("hostname")
    @Expose
    private String hostname;
    @SerializedName("hostnames")
    @Expose
    private List<String> hostnames = null;
    @SerializedName("http_api_uri")
    @Expose
    private String httpApiUri;
    @SerializedName("http_api_uris")
    @Expose
    private List<String> httpApiUris = null;
    @SerializedName("password")
    @Expose
    private String password;
    @SerializedName("protocols")
    @Expose
    private Protocols protocols;
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
    @SerializedName("vhost")
    @Expose
    private String vhost;

    public String getDashboardUrl() {
        return dashboardUrl;
    }

    public void setDashboardUrl(String dashboardUrl) {
        this.dashboardUrl = dashboardUrl;
    }

    public String getHostname() {
        return hostname;
    }

    public void setHostname(String hostname) {
        this.hostname = hostname;
    }

    public List<String> getHostnames() {
        return hostnames;
    }

    public void setHostnames(List<String> hostnames) {
        this.hostnames = hostnames;
    }

    public String getHttpApiUri() {
        return httpApiUri;
    }

    public void setHttpApiUri(String httpApiUri) {
        this.httpApiUri = httpApiUri;
    }

    public List<String> getHttpApiUris() {
        return httpApiUris;
    }

    public void setHttpApiUris(List<String> httpApiUris) {
        this.httpApiUris = httpApiUris;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Protocols getProtocols() {
        return protocols;
    }

    public void setProtocols(Protocols protocols) {
        this.protocols = protocols;
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

    public String getVhost() {
        return vhost;
    }

    public void setVhost(String vhost) {
        this.vhost = vhost;
    }

}
