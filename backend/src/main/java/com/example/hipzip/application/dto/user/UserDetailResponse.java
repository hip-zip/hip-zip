package com.example.hipzip.application.dto.user;

import com.example.hipzip.domain.user.User;

public record UserDetailResponse(
        String email,
        String nickName,
        String image
) {

    public static UserDetailResponse of(final User user) {
        return new UserDetailResponse(
                user.getEmail(),
                user.getNickname(),
                user.getImage()
        );
    }
}
