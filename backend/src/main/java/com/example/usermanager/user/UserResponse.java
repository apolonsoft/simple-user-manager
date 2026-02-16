package com.example.usermanager.user;

public record UserResponse(
    Long id,
    String name,
    String email
) {
}
