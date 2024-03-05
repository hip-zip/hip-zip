package com.example.hipzip.application;

import com.example.hipzip.application.dto.album.AlbumDetailResponse;
import com.example.hipzip.application.dto.album.AlbumModifyRequest;
import com.example.hipzip.application.dto.album.AlbumResponse;
import com.example.hipzip.application.dto.album.AlbumSaveRequest;
import com.example.hipzip.application.dto.album.AlbumVoteRequest;
import com.example.hipzip.domain.album.Album;
import com.example.hipzip.domain.album.AlbumRepository;
import com.example.hipzip.domain.artist.Artist;
import com.example.hipzip.domain.artist.ArtistRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
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

    public List<AlbumResponse> findAll(final int page, final int size) {
        Pageable pageRequest = PageRequest.of(page, size, Sort.by(Direction.DESC, "id"));

        Page<Album> albums = albumRepository.findAll(pageRequest);
        return albums.stream()
                .map(AlbumResponse::of)
                .toList();
    }

    public AlbumDetailResponse findById(final Long id) {
        return AlbumDetailResponse.of(albumRepository.getById(id));
    }

    public List<AlbumResponse> findByName(final String name) {
        List<Album> albums = albumRepository.findByNameStartsWith(name);
        return albums.stream()
                .map(AlbumResponse::of)
                .toList();
    }

    public void edit(final AlbumModifyRequest request) {
        Album album = albumRepository.getById(request.id());
        Artist artist = artistRepository.getById(request.artistId());
        album.update(
                request.name(),
                request.image(),
                request.releaseDate(),
                request.musicVideo(),
                artist
        );
    }

    public void deleteById(final Long id) {
        albumRepository.deleteById(id);
    }

    public void addVote(final Long albumId, final Long userId, final AlbumVoteRequest request) {
        Album album = albumRepository.findById(albumId)
                .orElseThrow(() -> new IllegalArgumentException("앨범을 찾을 수 없습니다."));

        album.increaseVoteCount(userId, request.count());
    }
}
