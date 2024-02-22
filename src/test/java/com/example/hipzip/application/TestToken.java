package com.example.hipzip.application;

import com.example.hipzip.infra.IdToken;

public class TestToken implements IdToken {

    private final String email;
    private final String nickName;
    private final String image;

    public TestToken(final String email, final String nickName, final String image) {
        this.email = email;
        this.nickName = nickName;
        this.image = image;
    }

    @Override
    public String getEmail() {
        return email;
    }

    @Override
    public String getNickName() {
        return null;
    }

    @Override
    public String getImage() {
        return null;
    }
}
