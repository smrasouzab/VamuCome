package com.example.login_auth_api.dto.response;

import com.example.login_auth_api.domain.user.UserRole;

public record LoginResponseDTO(
        Integer id,
        String nome,
        String token,
        String role
) {}
