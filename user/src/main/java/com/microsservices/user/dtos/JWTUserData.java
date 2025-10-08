package com.microsservices.user.dtos;

import lombok.Builder;

@Builder
public record JWTUserData(Long userId, String email) {
}
