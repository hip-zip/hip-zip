package com.example.hipzip.application.dto;

import com.example.hipzip.domain.album.Album;

public record AlbumResponse(
        Long id,
        String name,
        String image
) {

    public static AlbumResponse of(Album album){
        return new AlbumResponse(
                album.getId(),
                album.getName(),
                album.getImage()
        );
    }
}
