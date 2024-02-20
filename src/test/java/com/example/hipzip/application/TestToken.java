package com.example.hipzip.application;

import com.example.hipzip.infra.IdToken;

public class TestToken implements IdToken {

    private final String email;

    public TestToken(String email) {
        this.email = email;
    }

    @Override
    public String getEmail() {
        return email;
    }
}
