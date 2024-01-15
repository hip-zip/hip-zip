package com.example.hipzip.domain.artist;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HashtagRepository extends JpaRepository<Hashtag, Long> {

    Hashtag findByNameStartsWith(String name);
}
