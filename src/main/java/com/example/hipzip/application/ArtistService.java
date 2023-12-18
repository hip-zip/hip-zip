package com.example.hipzip.application;

import com.example.hipzip.application.dto.ArtistSaveRequest;
import com.example.hipzip.domain.artist.ArtistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ArtistService {

    private final ArtistRepository artistRepository;

    public void saveArtist(ArtistSaveRequest request) {
        artistRepository.save(request.toEntity());
    }
}
