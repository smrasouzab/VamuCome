package com.example.login_auth_api.dto.response.relatorios;

public record FaturamentoMensalResponseDTO(
        Integer ano,
        Integer mes,
        Long totalMensalidades,
        Long faturamentoBrutoMensal,
        Long lucroMensal

) {
}
