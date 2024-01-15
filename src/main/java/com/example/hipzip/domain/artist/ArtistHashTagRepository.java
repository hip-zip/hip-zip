package com.example.hipzip.domain.artist;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistHashTagRepository extends JpaRepository<ArtistHashTag, Long> {
    void deleteAllByArtist_Id(Long id);
    List<ArtistHashTag> findByArtist_Id(Long id);
}
