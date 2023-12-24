package com.example.hipzip.domain.artist;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ArtistTagRepository extends JpaRepository<ArtistTag, Long> {

    @Query("select m from ArtistTag m where m.name like %:name%")
    List<ArtistTag> findByName(@Param("name") String name);
}
