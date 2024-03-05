package com.example.hipzip.domain.album;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AlbumRepository extends JpaRepository<Album, Long> {

    Page<Album> findAll(Pageable pageable);

    @Query("select a from Album a where LOWER(Function('replace', a.name, ' ', '')) like LOWER(concat('%', Function('replace', :name, ' ', ''), '%'))")
    List<Album> findByNameStartsWith(String name);

    default Album getById(Long id) {
        return findById(id).orElseThrow(() -> new RuntimeException("앨범을 찾을 수 없습니다"));
    }
}
