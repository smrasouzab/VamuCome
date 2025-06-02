package com.example.login_auth_api.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record FornecedorUpdateRequestDTO(
        @NotBlank(message = "Usuário não pode estar em branco")
        String nmUsuarioFornecedor,
        @NotNull(message = "Horário de abertura não pode ser nulo")
        LocalDateTime dtHorarioAbertura,
        @NotNull(message = "Horário de fechamento não pode ser nulo")
        LocalDateTime dtHorarioFechamento,
        @NotNull(message = "Valor mínimo de compra não pode ser nulo")
        @DecimalMin(value = "0.0", inclusive = false, message = "O valor mínimo de compra deve ser maior que zero")
        BigDecimal vlMinimoCompra,
        String urlFotoFornecedor
) {}