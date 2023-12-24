package com.example.hipzip.application;

import com.example.hipzip.application.dto.ArtistListRequest;
import com.example.hipzip.application.dto.ArtistListResponse;
import com.example.hipzip.domain.artist.ArtistTag;
import com.example.hipzip.domain.artist.ArtistTagRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ArtistTagService {

    private final ArtistTagRepository artistTagRepository;

    public List<ArtistListResponse> findArtistTag(ArtistListRequest request) {
        List<ArtistTag> artistTags = artistTagRepository.findByName(request.name());
        return artistTags.stream()
                .map(ArtistTag::getArtist)
                .map(ArtistListResponse::from)
                .toList();
    }
}
