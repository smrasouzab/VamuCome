package com.example.login_auth_api.dto.request.login;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ClienteRequestLoginDTO (
        @NotBlank @Email String dsEmailCliente,
        @NotBlank String dsSenhaCliente
) {}
