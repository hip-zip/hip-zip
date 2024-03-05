package com.example.hipzip.infra.kakao.dto;

import feign.form.FormProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class KakaoOauthTokenRequest {

    @FormProperty("grant_type")
    private String grantType;
    @FormProperty("client_id")
    private String clientId;
    @FormProperty("redirect_uri")
    private String redirectUri;
    @FormProperty("client_secret")
    private String clientSecret;
    private String code;
}
