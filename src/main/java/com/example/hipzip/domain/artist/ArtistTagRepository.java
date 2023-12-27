package com.example.hipzip.domain.artist;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface ArtistTagRepository extends JpaRepository<ArtistTag, Long> {

    List<ArtistTag> findByNameLike(@Param("name") String name);
}
