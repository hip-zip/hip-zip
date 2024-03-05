package com.example.hipzip.application;

import com.example.hipzip.domain.artist.Hashtag;
import com.example.hipzip.domain.artist.HashtagRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class HashtagService {

    private final HashtagRepository hashTagRepository;

    public List<Hashtag> findByName(final String name) {
        return hashTagRepository.findByNameStartsWith(name);
    }

    public List<Hashtag> findOrCreateHashtag(final List<String> tagNames){
        return tagNames.stream()
                .map(this::findOrCreateHashtag)
                .distinct()
                .toList();
    }

    private Hashtag findOrCreateHashtag(final String name) {
        Hashtag hashTag = hashTagRepository.findByName(name);
        if (hashTag != null) {
            return hashTag;
        }
        return hashTagRepository.save(new Hashtag(name));
    }
}
