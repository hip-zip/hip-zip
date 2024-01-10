package com.example.hipzip.application.dto;

import com.example.hipzip.domain.artist.Artist;
import com.example.hipzip.domain.artist.ArtistType;
import java.util.List;

public record ArtistSaveRequest(
        String name,
        String image,
        ArtistType artistType,
        List<String> artistTags
) {

    public Artist toArtist() {
        return Artist.builder()
                .name(name)
                .image(image)
                .artistType(artistType)
                .build();
    }
}
