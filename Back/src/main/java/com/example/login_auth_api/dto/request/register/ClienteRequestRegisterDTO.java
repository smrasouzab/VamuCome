package com.example.login_auth_api.dto.request.register;

import com.example.login_auth_api.domain.endereco.Endereco;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record ClienteRequestRegisterDTO(
        @NotBlank String nmUsuarioCliente,
        @NotBlank @Email String dsEmailCliente,
        @NotBlank String dsSenhaCliente,
        @NotBlank String nuCPF,
        @NotNull List<Endereco> endereco
) {}