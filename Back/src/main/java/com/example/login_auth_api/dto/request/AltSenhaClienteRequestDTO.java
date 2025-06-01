package com.example.login_auth_api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AltSenhaClienteRequestDTO(
        @NotBlank(message = "Senha atual não pode estar em branco")
        String dsSenhaCliente,
        @NotBlank(message = "Senha nova não pode estar em branco")
        @Size(min = 6, max = 50, message = "A senha deve ter entre 6 e 50 caracteres")
        String novaSenha
){}