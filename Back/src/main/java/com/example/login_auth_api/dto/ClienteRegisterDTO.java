package com.example.login_auth_api.dto;

import com.example.login_auth_api.domain.endereco.Endereco;
import com.example.login_auth_api.domain.user.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record ClienteRegisterDTO(
        @NotBlank String nmUsuario,
        @NotBlank @Email String dsEmail,
        @NotBlank @Size(min = 8, message = "A senha deve ter pelo menos 8 caracteres")String dsSenha,
        @NotNull UserRole enRole,
        @NotBlank @Size(min = 8, message = "O campo deve ter no máximo 20 caracteres") String nuCPF,
        @NotBlank List<Endereco> dsEndereco
) {
}
