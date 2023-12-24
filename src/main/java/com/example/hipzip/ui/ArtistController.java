package com.example.hipzip.ui;

import com.example.hipzip.application.ArtistService;
import com.example.hipzip.application.ArtistTagService;
import com.example.hipzip.application.dto.ArtistSaveRequest;
import com.example.hipzip.application.dto.ArtistListRequest;
import com.example.hipzip.application.dto.ArtistListResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ArtistController {

    private final ArtistService artistService;
    private final ArtistTagService artistTagService;

    @PostMapping("/artists")
    public ResponseEntity<Void> artistSave(@RequestBody ArtistSaveRequest request) {
        artistService.saveArtist(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/artists")
    public ResponseEntity<List<ArtistListResponse>> artistList(@RequestBody ArtistListRequest request) {
        List<ArtistListResponse> artistTag = artistTagService.findArtistTag(request);
        return ResponseEntity.ok(artistTag);
    }
}
