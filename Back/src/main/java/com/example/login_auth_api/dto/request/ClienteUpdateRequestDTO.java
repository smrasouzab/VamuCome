package com.example.login_auth_api.dto.request;

import jakarta.validation.constraints.NotBlank;

public record ClienteUpdateRequestDTO(
        @NotBlank String nmUsuarioCliente
) {}