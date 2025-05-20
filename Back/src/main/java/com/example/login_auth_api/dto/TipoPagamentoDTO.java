package com.example.login_auth_api.dto;

import jakarta.validation.constraints.NotBlank;

public record TipoPagamentoDTO(
        @NotBlank String dsTipoPagamento
) {
}
