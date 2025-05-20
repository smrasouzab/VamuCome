package com.example.login_auth_api.dto;

import jakarta.validation.constraints.NotBlank;

public record StatusPedidoDTO(
        @NotBlank String dsStatusPedido
) {
}
