package com.example.hipzip.infra.kakao;

import com.auth0.jwt.interfaces.Claim;
import com.example.hipzip.infra.IdToken;
import java.util.Map;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class KakaoIdToken implements IdToken {

    private static final String EMAIL = "email";
    private static final String NICKNAME = "nickname";
    private static final String PICTURE = "picture";

    private final Map<String, Claim> claims;

    @Override
    public String getEmail() {
        return claims.get(EMAIL).asString();
    }

    @Override
    public String getNickName() {
        return claims.get(NICKNAME).asString();
    }

    @Override
    public String getImage() {
        return claims.get(PICTURE).asString();
    }
}
