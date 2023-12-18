package com.example.hipzip.application.dto;

import com.example.hipzip.domain.artist.Artist;
import com.example.hipzip.domain.artist.ArtistType;

public record ArtistSaveRequest(String name, String image, ArtistType artistType) {

    public Artist toEntity() {
        return Artist.create(name, image, artistType);
    }
}
