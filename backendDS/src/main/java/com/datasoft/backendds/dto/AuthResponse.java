package com.datasoft.backendds.dto;

public record AuthResponse(
        String token,
        String tokenType,
        String username
) {
}
