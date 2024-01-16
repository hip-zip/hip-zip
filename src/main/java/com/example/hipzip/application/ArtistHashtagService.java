package com.example.hipzip.application;

import com.example.hipzip.domain.artist.ArtistHashtag;
import com.example.hipzip.domain.artist.ArtistHashtagRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ArtistHashtagService {

    private final ArtistHashtagRepository artistHashtagRepository;

    public void saveAll(List<ArtistHashtag> artistHashtags) {
        artistHashtagRepository.saveAll(artistHashtags);
    }

    public List<ArtistHashtag> findByArtistId(Long artistId){
        return artistHashtagRepository.findByArtistId(artistId);
    }

    public void deleteAllByArtistId(Long artistId){
        artistHashtagRepository.deleteAllByArtistId(artistId);
    }
}
