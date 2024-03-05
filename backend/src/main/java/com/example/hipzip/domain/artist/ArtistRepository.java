package com.example.hipzip.domain.artist;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistRepository extends JpaRepository<Artist, Long> {

    Page<Artist> findAll(Pageable pageable);

    default Artist getById(Long id) {
        return findById(id).orElseThrow(() -> new RuntimeException("아티스트를 찾을 수 없습니다"));
    }
}
