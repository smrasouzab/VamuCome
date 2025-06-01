package com.example.login_auth_api.dto.request.login;

import jakarta.validation.constraints.NotBlank;

public record AdminRequestLoginDTO(
        @NotBlank(message = "Nome de usuário não pode estar em branco")
        String nmUsuarioAdmin,
        @NotBlank(message = "Senha não pode estar em branco")
        String dsSenhaAdmin
) {}