package com.example.login_auth_api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record ProdutoRequestDTO(
        @NotBlank String nmProduto,
        @NotNull BigDecimal vlProduto,
        @NotBlank String dsProduto
        ) {}
