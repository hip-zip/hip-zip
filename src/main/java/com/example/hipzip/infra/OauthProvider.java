package com.example.hipzip.infra;

public interface OauthProvider {

    boolean supports(final String providerName);
    String getUrl();
    String getIdToken(OauthTokenRequest request);
}
