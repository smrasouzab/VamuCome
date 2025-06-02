package com.example.login_auth_api.dto.response;

import com.example.login_auth_api.domain.produto.Produto;

import java.math.BigDecimal;

public record ProdutoResponseDTO (
    Integer idProduto,
    String nmProduto,
    BigDecimal vlProduto,
    String dsProduto,
    String urlFotoProduto
) {
    public ProdutoResponseDTO(Produto produto) {
        this(
            produto.getIdProduto(), produto.getNmProduto(),
            produto.getVlProduto(),
            produto.getDsProduto(),
            produto.getUrlFotoProduto()
        );
    }
}