package com.example.login_auth_api.dto.request;

import jakarta.validation.constraints.NotBlank;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record FornecedorUpdateRequestDTO(
        @NotBlank String nmUsuarioFornecedor,
        @NotBlank LocalDateTime dtHorarioAbertura,
        @NotBlank LocalDateTime dtHorarioFechamento,
        @NotBlank BigDecimal vlMinimoCompra
) {}