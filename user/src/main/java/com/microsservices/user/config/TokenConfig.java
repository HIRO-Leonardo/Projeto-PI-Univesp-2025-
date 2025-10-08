package com.microsservices.user.config;


import com.auth0.jwt.JWT;

import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.microsservices.user.dtos.JWTUserData;
import com.microsservices.user.models.UserModels;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.auth0.jwt.algorithms.Algorithm.HMAC256;

@Component
public class TokenConfig  {

    @Value("${jwt.secret-key}")
    private String secret;

    public String generateToken(UserModels username) {



        String authorities = username.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        return JWT.create().withClaim("userId", username.getId())
                .withSubject(username.getEmail())
                .withClaim("roles", authorities)
                .withExpiresAt(Instant.now().plusSeconds(96000))
                .withIssuedAt(Instant.now())
                .sign(HMAC256(secret));
    }

    public Optional<JWTUserData> validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            DecodedJWT decodedJWT = JWT.require(algorithm)
                    .build().verify(token);
            return Optional.of(JWTUserData.builder()
                    .userId(decodedJWT.getClaim("userId").asLong())
                    .email(decodedJWT.getSubject())
                    .build());

        }catch (JWTVerificationException EX){
            return Optional.empty();
        }


    }
}
