package com.example.hipzip.infra.kakao;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "oauth.kakao")
public record KakaoOauthConfig(
        String clientId,
        String redirectUri,
        String providerName,
        String clientSecret,
        String scope
) {
}
