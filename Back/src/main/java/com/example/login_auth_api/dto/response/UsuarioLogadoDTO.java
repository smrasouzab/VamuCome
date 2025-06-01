package com.example.login_auth_api.dto.response;

public record UsuarioLogadoDTO(
        Integer id,
        String nome,
        String role
) {}