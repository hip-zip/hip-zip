package com.example.hipzip.ui;

import com.example.hipzip.application.ArtistService;
import com.example.hipzip.application.dto.ArtistSaveRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ArtistController {

    private final ArtistService artistService;

    @PostMapping("/artists")
    public ResponseEntity<Void> artistDetail(ArtistSaveRequest request) {
        artistService.saveArtist(request);
        return ResponseEntity.ok().build();
    }
}
