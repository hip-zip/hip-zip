package com.example.hipzip.application.dto;

import com.example.hipzip.domain.artist.Artist;
import java.util.List;

public record ArtistDetailResponse(
        Long id,
        String name,
        String image,
        String artistType,
        ArtistResponse group,
        List<String> hashtag
) {
    public static ArtistDetailResponse from(Artist artist, List<String> hashtags) {
        return new ArtistDetailResponse(
                artist.getId(),
                artist.getName(),
                artist.getImage(),
                artist.getArtistType().name(),
                artist.getGroup() == null ? null : ArtistResponse.from(artist.getGroup()),
                hashtags
        );
    }
}
