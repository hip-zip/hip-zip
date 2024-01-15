package com.example.hipzip.ui;

import com.example.hipzip.application.ArtistService;
import com.example.hipzip.application.dto.ArtistListResponse;
import com.example.hipzip.application.dto.ArtistModifyRequest;
import com.example.hipzip.application.dto.ArtistSaveRequest;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ArtistController {

    private final ArtistService artistService;

    @PostMapping("/artists")
    public ResponseEntity<Void> artistSave(@RequestBody @Valid ArtistSaveRequest request) {
        artistService.saveArtist(request);
        return ResponseEntity.ok().build();
    }

    //todo    검색,디테일 분리 필요
    @GetMapping("/artists")
    public ResponseEntity<List<ArtistListResponse>> artistList(@RequestParam("name") String name) {
        List<ArtistListResponse> artistTag = artistService.findArtist(name);
        return ResponseEntity.ok(artistTag);
    }

    @PutMapping("/artists")
    public ResponseEntity<Void> artistModify(@RequestBody @Valid ArtistModifyRequest request) {
        artistService.editArtist(request);
        return ResponseEntity.ok().build();
    }
}
