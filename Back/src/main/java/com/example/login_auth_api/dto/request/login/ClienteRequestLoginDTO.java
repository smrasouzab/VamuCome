package com.example.login_auth_api.dto.request.login;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ClienteRequestLoginDTO (
        @NotBlank(message = "E-mail não pode estar em branco") @Email(message = "Formato de e-mail inválido") String dsEmailCliente,
        @NotBlank(message = "Senha não pode estar em branco") String dsSenhaCliente
) {}