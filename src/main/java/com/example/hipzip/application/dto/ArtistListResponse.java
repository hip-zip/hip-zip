package com.example.hipzip.application.dto;

import com.example.hipzip.domain.artist.Artist;

public record ArtistListResponse(
        Long id,
        String name,
        String image
) {

    public static ArtistListResponse from(Artist artist) {
        return new ArtistListResponse(artist.getId(), artist.getName(), artist.getImage());
    }
}
