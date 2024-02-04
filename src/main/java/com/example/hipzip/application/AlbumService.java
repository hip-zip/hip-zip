package com.example.hipzip.application;

import com.example.hipzip.application.dto.AlbumSaveRequest;
import com.example.hipzip.domain.album.Album;
import com.example.hipzip.domain.album.AlbumRepository;
import com.example.hipzip.domain.artist.Artist;
import com.example.hipzip.domain.artist.ArtistRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class AlbumService {

    private final AlbumRepository albumRepository;
    private final ArtistRepository artistRepository;

    public Long save(final AlbumSaveRequest request) {
        Artist artist = artistRepository.getById(request.artistId());

        Album album = Album.builder()
                .name(request.name())
                .image(request.image())
                .releaseDate(request.releaseDate())
                .musicVideo(request.musicVideo())
                .artist(artist)
                .build();

        Album save = albumRepository.save(album);
        return save.getId();
    }
}
