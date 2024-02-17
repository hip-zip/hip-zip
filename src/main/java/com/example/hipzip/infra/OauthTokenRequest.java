package com.example.hipzip.infra;

public record OauthTokenRequest(
        String state,
        String code
) {
}
