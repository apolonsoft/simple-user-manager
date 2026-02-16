package com.example.usermanager.auth;

public record AuthResponse(
    Long id,
    String name,
    String email,
    String message
) {
}
