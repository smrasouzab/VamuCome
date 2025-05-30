package com.example.login_auth_api.dto.request.register;

import com.example.login_auth_api.domain.endereco.Endereco;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record FornecedorRequestRegisterDTO(
        @NotBlank(message = "Usuário não pode estar em branco")
        String nmUsuarioFornecedor,
        @NotBlank(message = "E-mail não pode estar em branco")
        @Email(message = "Formato de e-mail inválido")
        String dsEmailFornecedor,
        @NotBlank(message = "Senha não pode estar em branco")
        @Size(min = 6, max = 50, message = "A senha deve ter entre 6 e 50 caracteres")
        String dsSenhaFornecedor,
        @NotBlank(message = "Razão Social não pode estar em branco")
        String dsRazaoSocial,
        @NotBlank(message = "CNPJ não pode estar em branco")
        @Pattern(regexp = "\\d{14}", message = "O CNPJ deve conter exatamente 14 dígitos numéricos")
        String nuCNPJ,
        @NotNull(message = "Horário de abertura não pode ser nulo")
        LocalDateTime dtHorarioAbertura,
        @NotNull(message = "Horário de fechamento não pode ser nulo")
        LocalDateTime dtHorarioFechamento,
        @NotNull(message = "Valor mínimo de compra não pode ser nulo")
        @DecimalMin(value = "0.0", inclusive = false, message = "O valor mínimo de compra deve ser maior que zero")
        BigDecimal vlMinimoCompra,
        @NotNull(message = "Endereço não pode ser nulo")
        Endereco endereco
) {}