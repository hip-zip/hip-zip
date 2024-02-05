package com.example.hipzip.domain.album;

import com.example.hipzip.domain.artist.Artist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlbumRepository extends JpaRepository<Album, Long> {

    Page<Album> findAll(Pageable pageable);

    default Album getById(Long id) {
        return findById(id).orElseThrow(() -> new RuntimeException("앨범을 찾을 수 없습니다"));
    }
}
