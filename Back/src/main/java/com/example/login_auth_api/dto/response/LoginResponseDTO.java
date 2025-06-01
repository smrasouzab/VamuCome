package com.example.login_auth_api.dto.response;

public record LoginResponseDTO(
        Integer id,
        String nome,
        String token,
        String role
) {}
