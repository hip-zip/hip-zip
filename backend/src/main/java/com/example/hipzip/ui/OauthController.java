package com.example.hipzip.ui;

import com.example.hipzip.application.OauthService;
import com.example.hipzip.infra.OauthTokenRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/oauth")
@RestController
@RequiredArgsConstructor
public class OauthController {

    private final OauthService oauthService;

    @GetMapping("/{provider}")
    public ResponseEntity<String> generateUrl(@PathVariable String provider) {
        String url = oauthService.generateUrl(provider);
        return ResponseEntity.ok(url);
    }

    @PostMapping("/{provider}/callback")
    public ResponseEntity<String> generateToken(
            OauthTokenRequest request,
            @PathVariable("provider") String providerName
    ) {
        String token = oauthService.generateToken(request, providerName);
        return ResponseEntity.ok(token);
    }
}
