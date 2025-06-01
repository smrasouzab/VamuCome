package com.example.login_auth_api.dto.response;

public record AvaliacaoRelatorioDTO(
        Integer idFornecedor,
        String nomeFornecedor,
        Long totalAvaliacoes,
        Double mediaNota
) {
}
