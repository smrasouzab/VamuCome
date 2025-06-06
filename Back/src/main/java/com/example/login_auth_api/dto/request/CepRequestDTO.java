package com.example.login_auth_api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CepRequestDTO(
        @NotBlank
        @Size(min = 8, max = 8, message = "O cep deve ter apenas oito algarismos.")
        String nuCodigoPostal
) {
}
