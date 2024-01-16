package com.example.hipzip.domain.artist;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistHashtagRepository extends JpaRepository<ArtistHashtag, Long> {
    void deleteAllByArtistId(Long id);
    List<ArtistHashtag> findByArtistId(Long id);
}
