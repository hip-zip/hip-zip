package com.example.hipzip.application.dto.album;

import java.time.LocalDate;

public record AlbumModifyRequest(
        Long id,
        String name,
        String image,
        LocalDate releaseDate,
        String musicVideo,
        Long artistId
) {
}
