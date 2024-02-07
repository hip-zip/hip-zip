package com.example.hipzip.ui;

import com.example.hipzip.application.AlbumService;
import com.example.hipzip.application.dto.album.AlbumDetailResponse;
import com.example.hipzip.application.dto.album.AlbumResponse;
import com.example.hipzip.application.dto.album.AlbumSaveRequest;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AlbumController {

    private final AlbumService albumService;

    @PostMapping("/albums")
    public ResponseEntity<Void> save(@RequestBody @Valid AlbumSaveRequest request) {
        Long albumId = albumService.save(request);

        return ResponseEntity.created(URI.create("/albums/" + albumId)).build();
    }

    @GetMapping("/albums")
    public ResponseEntity<List<AlbumResponse>> findAll(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "20") int size
    ) {
        return ResponseEntity.ok(albumService.findAll(page, size));
    }

    @GetMapping("/albums/{id}")
    public ResponseEntity<AlbumDetailResponse> findById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(albumService.findById(id));
    }

    @GetMapping("/albums/search")
    public ResponseEntity<List<AlbumResponse>> findByName(
            @RequestParam(value = "name") String name
    ) {
        List<AlbumResponse> responses = albumService.findByName(name);
        return ResponseEntity.ok(responses);
    }

    @DeleteMapping("/albums/{id}")
    public ResponseEntity<AlbumDetailResponse> deleteById(
            @PathVariable Long id
    ) {
        albumService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
