package com.example.login_auth_api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record ClienteUpdateRequestDTO(
        @NotBlank(message = "Usuário não pode estar em branco")
        String nmUsuarioCliente,
        @NotBlank(message = "Número de telefone não pode estar em branco")
        @Pattern(regexp = "\\d{10,11}", message = "Telefone deve conter 10 ou 11 dígitos numéricos")
        String nuTelCliente
) {}