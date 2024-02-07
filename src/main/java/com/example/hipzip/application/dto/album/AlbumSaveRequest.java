package com.example.hipzip.application.dto.album;

import java.time.LocalDate;

public record AlbumSaveRequest(
    String name,
    String image,
    LocalDate releaseDate,
    String musicVideo,
    Long artistId
) {
}
