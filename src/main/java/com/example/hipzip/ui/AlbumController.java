package com.example.hipzip.ui;

import com.example.hipzip.application.AlbumService;
import com.example.hipzip.application.dto.AlbumDetailResponse;
import com.example.hipzip.application.dto.AlbumResponse;
import com.example.hipzip.application.dto.AlbumSaveRequest;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
}
