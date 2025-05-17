package com.example.login_auth_api.dto;

import com.example.login_auth_api.domain.user.UserRole;

public record ResponseDTO(
        Integer idUsuario,
        String nmUsuario,
        String token, UserRole enRole
) {
}
