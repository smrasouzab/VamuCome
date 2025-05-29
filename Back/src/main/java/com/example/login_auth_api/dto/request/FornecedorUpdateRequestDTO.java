package com.example.login_auth_api.dto.request;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record FornecedorUpdateRequestDTO(
        String nmUsuarioFornecedor,
        LocalDateTime dtHorarioAbertura,
        LocalDateTime dtHorarioFechamento,
        BigDecimal vlMinimoCompra
) {}