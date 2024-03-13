package com.example.hipzip.application.dto.artist;

import com.example.hipzip.application.dto.album.AlbumResponse;
import com.example.hipzip.domain.album.Album;
import com.example.hipzip.domain.artist.Artist;
import java.util.List;

public record ArtistDetailResponse(
        Long id,
        String name,
        String image,
        String artistType,
        ArtistResponse group,
        List<ArtistResponse> groupMembers,
        List<String> hashtag,
        List<AlbumResponse> albumResponses
) {
    public static ArtistDetailResponse of(
            Artist artist,
            List<Artist> groupMembers,
            List<String> hashtags
    ) {
        List<AlbumResponse> albums = artist.getAlbums()
                .stream()
                .map(AlbumResponse::of)
                .toList();

        return new ArtistDetailResponse(
                artist.getId(),
                artist.getName(),
                artist.getImage(),
                artist.getArtistType().name(),
                artist.getGroup() == null ? null : ArtistResponse.of(artist.getGroup()),
                groupMembers.stream().map(ArtistResponse::of).toList(),
                hashtags,
                albums
        );
    }
}
