package com.example.hipzip.ui;

import com.example.hipzip.application.ArtistService;
import com.example.hipzip.application.dto.ArtistDetailResponse;
import com.example.hipzip.application.dto.ArtistResponse;
import com.example.hipzip.application.dto.ArtistModifyRequest;
import com.example.hipzip.application.dto.ArtistSaveRequest;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/artists")
    public ResponseEntity<List<ArtistResponse>> artistList(
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "20") int size
    ) {
        List<ArtistResponse> artistTag = artistService.findArtist(name, page, size);
        return ResponseEntity.ok(artistTag);
    }

    @GetMapping("/artists/{id}")
    public ResponseEntity<ArtistDetailResponse> artistDetail(
            @PathVariable Long id
    ) {
        ArtistDetailResponse artistDetail = artistService.findArtistDetail(id);
        return ResponseEntity.ok(artistDetail);
    }

    @PutMapping("/artists")
    public ResponseEntity<Void> artistModify(@RequestBody @Valid ArtistModifyRequest request) {
        artistService.editArtist(request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/artists/{id}")
    public ResponseEntity<Void> artistModify(@PathVariable Long id) {
        artistService.deleteArtist(id);
        return ResponseEntity.ok().build();
    }
}
