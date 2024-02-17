package com.example.hipzip.ui;

import com.example.hipzip.application.OauthService;
import com.example.hipzip.infra.OauthTokenRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class OauthController {

    private final OauthService oauthService;

    @GetMapping("oauth/{provider}")
    public ResponseEntity<String> login(@PathVariable String provider) {
        String url = oauthService.getUrl(provider);
        return ResponseEntity.ok(url);
    }

    @GetMapping("oauth/{providerName}/callback")
    public ResponseEntity<String> login(
            @RequestParam("code") String code,
            @RequestParam(value = "state", required = false) String state,
            @PathVariable("providerName") String providerName
    ) {
        String idToken = oauthService.getIdToken(new OauthTokenRequest(state, code), providerName);
        return ResponseEntity.ok(idToken);
    }
}
