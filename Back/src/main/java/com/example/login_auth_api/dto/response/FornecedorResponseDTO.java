package com.example.login_auth_api.dto.response;

import com.example.login_auth_api.domain.endereco.Endereco;
import com.example.login_auth_api.domain.fornecedor.Fornecedor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record FornecedorResponseDTO(
        Integer idFornecedor,
        LocalDateTime dataCadastroFornecedor,
        String nmUsuarioFornecedor,
        String dsEmailFornecedor,
        String dsRazaoSocial,
        String nuCNPJ,
        LocalDateTime dtHorarioAbertura,
        LocalDateTime dtHorarioFechamento,
        BigDecimal vlMinimoCompra,
        Endereco endereco
) {
    public FornecedorResponseDTO(Fornecedor fornecedor) {
        this(
                fornecedor.getIdFornecedor(),
                fornecedor.getDataCadastroFornecedor(),
                fornecedor.getNmUsuarioFornecedor(),
                fornecedor.getDsEmailFornecedor(),
                fornecedor.getDsRazaoSocial(),
                fornecedor.getNuCNPJ(),
                fornecedor.getDtHorarioAbertura(),
                fornecedor.getDtHorarioFechamento(),
                fornecedor.getVlMinimoCompra(),
                fornecedor.getEndereco()
        );
    }
}