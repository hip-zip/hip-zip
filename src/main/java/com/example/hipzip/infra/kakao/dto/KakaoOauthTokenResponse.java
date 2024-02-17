package com.example.hipzip.infra.kakao.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class KakaoOauthTokenResponse {

    @JsonProperty("access_token")
    String accessToken;
    @JsonProperty("token_type")
    String tokenType;
    @JsonProperty("id_token")
    String idToken;
}
