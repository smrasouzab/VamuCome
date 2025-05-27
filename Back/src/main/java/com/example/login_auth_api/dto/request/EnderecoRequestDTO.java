package com.example.login_auth_api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record EnderecoRequestDTO(
        @NotBlank String dsLogradouro,
        @NotBlank String nmNumero,
        @NotBlank String dsComplemento,
        @NotNull Boolean endFavorito
) {
}
