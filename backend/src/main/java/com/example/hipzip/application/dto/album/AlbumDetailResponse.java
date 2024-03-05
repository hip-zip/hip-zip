package com.example.hipzip.application.dto.album;

import com.example.hipzip.application.dto.artist.ArtistResponse;
import com.example.hipzip.domain.album.Album;
import java.time.LocalDate;

public record AlbumDetailResponse(
        Long id,
        String name,
        String image,
        LocalDate releaseDate,
        String musicVideo,
        ArtistResponse artistResponse,
        Long vote
) {
    public static AlbumDetailResponse of(Album album) {
        return new AlbumDetailResponse(
                album.getId(),
                album.getName(),
                album.getImage(),
                album.getReleaseDate(),
                album.getMusicVideo(),
                ArtistResponse.of(album.getArtist()),
                album.calculateTotalVotes()
        );
    }
}
