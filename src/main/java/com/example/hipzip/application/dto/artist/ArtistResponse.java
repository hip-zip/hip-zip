package com.example.hipzip.application.dto.artist;

import com.example.hipzip.domain.artist.Artist;

public record ArtistResponse(
        Long id,
        String name,
        String image,
        String artistType
) {

    public static ArtistResponse of(Artist artist) {
        return new ArtistResponse(
                artist.getId(),
                artist.getName(),
                artist.getImage(),
                artist.getArtistType().name()
        );
    }
}
