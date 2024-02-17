package com.example.hipzip.application;

import com.example.hipzip.infra.OauthProviders;
import com.example.hipzip.infra.OauthTokenRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OauthService {

    private final OauthProviders oauthProviders;

    public String getIdToken(final OauthTokenRequest request, final String providerName) {
        return oauthProviders.getIdToken(request, providerName);
    }

    public String getUrl(final String providerName) {
        return oauthProviders.getUrl(providerName);
    }
}
