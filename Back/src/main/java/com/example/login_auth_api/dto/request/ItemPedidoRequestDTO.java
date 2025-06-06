package com.example.login_auth_api.dto.request;

import jakarta.validation.constraints.NotNull;

public record ItemPedidoRequestDTO(
        @NotNull Integer idProduto,
        @NotNull Integer qtItem,
        String dsObservacaoItem
) {
}
