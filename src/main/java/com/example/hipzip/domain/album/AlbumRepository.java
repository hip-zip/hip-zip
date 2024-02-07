package com.example.hipzip.domain.album;

import com.example.hipzip.domain.artist.Artist;
import com.example.hipzip.domain.artist.Hashtag;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AlbumRepository extends JpaRepository<Album, Long> {

    Page<Album> findAll(Pageable pageable);

    default Album getById(Long id) {
        return findById(id).orElseThrow(() -> new RuntimeException("앨범을 찾을 수 없습니다"));
    }
}
