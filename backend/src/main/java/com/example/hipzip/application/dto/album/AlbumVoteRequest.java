package com.example.hipzip.application.dto.album;

import jakarta.validation.constraints.NotNull;

public record AlbumVoteRequest(
        @NotNull(message = "투표 개수를 입력해 주세요")
        Long count
) {
}
