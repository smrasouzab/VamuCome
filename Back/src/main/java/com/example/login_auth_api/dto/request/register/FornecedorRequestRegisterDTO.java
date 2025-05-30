package com.example.login_auth_api.dto.request.register;

import com.example.login_auth_api.domain.endereco.Endereco;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record FornecedorRequestRegisterDTO(
        @NotBlank String nmUsuarioFornecedor,
        @NotBlank @Email String dsEmailFornecedor,
        @NotBlank String dsSenhaFornecedor,
        @NotBlank String dsRazaoSocial,
        @NotBlank @Pattern(regexp = "\\d{14}", message = "O CNPJ deve conter exatamente 14 dígitos numéricos") String nuCNPJ,
        @NotNull LocalDateTime dtHorarioAbertura,
        @NotNull LocalDateTime dtHorarioFechamento,
        @NotNull BigDecimal vlMinimoCompra,
        @NotNull Endereco endereco
) {}