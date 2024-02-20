package com.example.hipzip.infra;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OauthProviders {

    private final List<OauthProvider> providers;

    public String getUrl(final String providerName) {
        OauthProvider provider = getProvider(providerName);
        return provider.getUrl();
    }

    public IdToken getIdToken(final OauthTokenRequest request, final String providerName) {
        OauthProvider provider = getProvider(providerName);
        return provider.getIdToken(request);
    }

    private OauthProvider getProvider(final String providerName) {
        return providers.stream()
                .filter(authorizationUriProvider -> authorizationUriProvider.supports(providerName))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("지원하지 않는 소셜 로그인입니다."));
    }
}
