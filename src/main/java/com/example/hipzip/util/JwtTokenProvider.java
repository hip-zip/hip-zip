package com.example.hipzip.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {

    private final SecretKey secretKey;
    private final long expirationTime;

    public JwtTokenProvider(
            @Value("${jwt-secret}") final String secret,
            @Value("${jwt-expiration-time-millisecond}") final long expirationTime
    ) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expirationTime = expirationTime;
    }

    public String generateToken(final String payload) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + expirationTime);

        Claims claims = Jwts.claims().setSubject(payload);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiration)
                .setSubject(payload)
                .signWith(secretKey, SignatureAlgorithm.HS256).compact();
    }

    public void validate(final String token) {
        try {
            getJwsClaims(token);
        } catch (final ExpiredJwtException expired) {
            throw new IllegalArgumentException("만료된 토큰입니다.");
        } catch (final IllegalArgumentException e) {
            throw new IllegalArgumentException("유효하지 않은 토큰입니다.");
        }
    }

    public String getSubject(final String token) {
        return getJwsClaims(token)
                .getBody()
                .getSubject();
    }

    private Jws<Claims> getJwsClaims(final String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token);
    }
}
