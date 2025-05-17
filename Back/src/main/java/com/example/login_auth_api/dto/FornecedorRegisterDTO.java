package com.example.login_auth_api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record FornecedorRegisterDTO(
        @NotNull Integer idUsuario,
        @NotBlank String dsRazaoSocial,
        @NotBlank String dtHorarioFunc
        ) {
}
