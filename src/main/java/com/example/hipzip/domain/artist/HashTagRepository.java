package com.example.hipzip.domain.artist;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HashTagRepository extends JpaRepository<HashTag, Long> {

    HashTag findByName(String name);
}
