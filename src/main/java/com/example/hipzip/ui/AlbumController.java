package com.example.hipzip.ui;

import com.example.hipzip.application.AlbumService;
import com.example.hipzip.application.dto.AlbumSaveRequest;
import com.example.hipzip.application.dto.ArtistSaveRequest;
import jakarta.validation.Valid;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AlbumController {

    private final AlbumService albumService;

    @PostMapping("/albums")
    public ResponseEntity<Void> save(@RequestBody @Valid AlbumSaveRequest request) {
        Long albumId = albumService.save(request);

        return ResponseEntity.created(URI.create("/albums/"+albumId)).build();
    }
}
