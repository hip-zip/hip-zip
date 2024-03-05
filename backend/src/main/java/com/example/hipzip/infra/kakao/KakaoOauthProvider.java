package com.example.hipzip.infra.kakao;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.hipzip.infra.IdToken;
import com.example.hipzip.infra.OauthProvider;
import com.example.hipzip.infra.OauthTokenRequest;
import com.example.hipzip.infra.kakao.dto.KakaoOauthTokenRequest;
import com.example.hipzip.infra.kakao.dto.KakaoOauthTokenResponse;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@RequiredArgsConstructor
public class KakaoOauthProvider implements OauthProvider {

    private final KakaoOauthConfig config;
    private final KaKaoOauthTokenClient client;

    @Override
    public boolean supports(final String providerName) {
        return config.providerName().equals(providerName);
    }

    @Override
    public String getUrl() {
        return UriComponentsBuilder
                .fromHttpUrl("https://kauth.kakao.com/oauth/authorize")
                .queryParam("scope", config.scope())
                .queryParam("client_id", config.clientId())
                .queryParam("redirect_uri", config.redirectUri())
                .queryParam("response_type", "code")
                .toUriString();
    }

    @Override
    public IdToken getIdToken(final OauthTokenRequest request) {
        KakaoOauthTokenRequest kakaoOauthTokenRequest = KakaoOauthTokenRequest.builder()
                .clientId(config.clientId())
                .redirectUri(config.redirectUri())
                .grantType("authorization_code")
                .clientSecret(config.clientSecret())
                .code(request.code())
                .build();

        KakaoOauthTokenResponse response = client.getToken(kakaoOauthTokenRequest);

        DecodedJWT decoded = JWT.decode(response.getIdToken());
        Map<String, Claim> claims = decoded.getClaims();

        return new KakaoIdToken(claims);
    }
}
