package com.example.login_auth_api.dto.response;

public record FaturamentoAnualResponseDTO(
        Integer ano,
        Long totalMensalidades,
        Long faturamentoBrutoAnual,
        Long lucroAnual
) {}