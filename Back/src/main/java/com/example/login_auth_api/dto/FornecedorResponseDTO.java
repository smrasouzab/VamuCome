package com.example.login_auth_api.dto;

import com.example.login_auth_api.domain.fornecedor.Fornecedor;

public record FornecedorResponseDTO(
        Integer id,
        String razaoSocial,
        String horarioFunc,
        String email
) {
    public static FornecedorResponseDTO fromEntity(Fornecedor fornecedor) {
        return new FornecedorResponseDTO(
                fornecedor.getIdFornecedor(),
                fornecedor.getDsRazaoSocial(),
                fornecedor.getDtHorarioFunc().toString(),
                fornecedor.getUsuarioFornecedor().getDsEmail()
        );
    }
}