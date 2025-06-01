package com.example.login_auth_api.dto.request.register;

import com.example.login_auth_api.domain.endereco.Endereco;
import jakarta.validation.constraints.*;

import java.util.List;

public record ClienteRequestRegisterDTO(
        @NotBlank(message = "Usuário não pode estar em branco")
        String nmUsuarioCliente,
        @NotBlank(message = "E-mail não pode estar em branco")
        @Email(message = "Formato de e-mail inválido")
        String dsEmailCliente,
        @NotBlank(message = "Senha não pode estar em branco")
        @Size(min = 6, max = 50, message = "A senha deve ter entre 6 e 50 caracteres")
        String dsSenhaCliente,
        @NotBlank(message = "CPF não pode estar em branco")
        @Pattern(regexp = "\\d{11}", message = "O CPF deve conter exatamente 11 dígitos numéricos")
        String nuCPF,
        @NotBlank(message = "Número de telefone não pode estar em branco")
        @Pattern(regexp = "\\d{10,11}", message = "Telefone deve conter 10 ou 11 dígitos numéricos")
        String nuTelCliente,
        @NotNull(message = "Endereço não pode ser nulo")
        List<Endereco> endereco
) {}