package com.example.usermanager.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserRequest(
    @NotBlank String name,
    @NotBlank @Email String email,
    @Size(min = 6) String password
) {
}
