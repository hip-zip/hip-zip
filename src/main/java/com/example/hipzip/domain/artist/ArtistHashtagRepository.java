package com.example.hipzip.domain.artist;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistHashtagRepository extends JpaRepository<ArtistHashtag, Long> {
    void deleteAllByArtist_Id(Long id);
    List<ArtistHashtag> findByArtist_Id(Long id);
}
