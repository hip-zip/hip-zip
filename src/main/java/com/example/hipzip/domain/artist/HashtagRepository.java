package com.example.hipzip.domain.artist;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface HashtagRepository extends JpaRepository<Hashtag, Long> {

    @Query("select h from Hashtag h where LOWER(Function('replace', h.name, ' ', '')) like LOWER(concat('%', Function('replace', :name, ' ', ''), '%'))")
    List<Hashtag> findByNameStartsWith(String name);

    @Query("select h from Hashtag h where LOWER(Function('replace', h.name, ' ', '')) like LOWER(concat('%', Function('replace', :name, ' ', '')))")
    Hashtag findByName(String name);
}
