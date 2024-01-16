package com.example.hipzip.domain.artist;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HashtagRepository extends JpaRepository<Hashtag, Long> {

    List<Hashtag> findByNameStartsWith(String name);
    Hashtag findByName(String name);
}
