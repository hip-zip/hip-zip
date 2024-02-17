package com.example.hipzip.infra.kakao;

import com.example.hipzip.infra.kakao.dto.KakaoOauthTokenRequest;
import com.example.hipzip.infra.kakao.dto.KakaoOauthTokenResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;


@FeignClient(url = "https://kauth.kakao.com", value = "kakao")
public interface KaKaoOauthTokenClient {

    @PostMapping(value = "/oauth/token",
            consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    KakaoOauthTokenResponse getToken(KakaoOauthTokenRequest request);
}
