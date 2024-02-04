package com.example.hipzip.application.dto;

import com.example.hipzip.domain.album.Album;
import com.example.hipzip.domain.artist.Artist;
import com.example.hipzip.domain.artist.ArtistType;
import java.time.LocalDateTime;

public record AlbumSaveRequest(
    String name,
    String image,
    LocalDateTime releaseDate,
    String musicVideo,
    Long artistId
) {
}
