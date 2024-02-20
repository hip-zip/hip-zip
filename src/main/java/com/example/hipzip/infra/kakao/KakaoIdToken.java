package com.example.hipzip.infra.kakao;

import com.auth0.jwt.interfaces.Claim;
import com.example.hipzip.infra.IdToken;
import java.util.Map;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class KakaoIdToken implements IdToken {

    private static final String EMAIL = "email";

    private final Map<String, Claim> claims;

    @Override
    public String getEmail() {
        return claims.get(EMAIL).asString();
    }
}
