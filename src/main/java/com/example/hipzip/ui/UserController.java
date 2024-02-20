package com.example.hipzip.ui;

import com.example.hipzip.domain.user.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/check")
    public ResponseEntity<String> generateToken(
            @LoginUser User user
    ) {
        return ResponseEntity.ok(user.getEmail());
    }
}
