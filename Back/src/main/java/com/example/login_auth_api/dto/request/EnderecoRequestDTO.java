package com.example.login_auth_api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record EnderecoRequestDTO(
        @NotBlank(message = "Logradouro não pode estar em branco")
        String dsLogradouro,
        @NotBlank(message = "Número não pode estar em branco")
        String nmNumero,
        String dsComplemento,
        @NotNull(message = "Endereço favorito não pode ser nulo")
        Boolean endFavorito
) {}