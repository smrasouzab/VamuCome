package com.example.login_auth_api.dto.request.pedido;

import com.example.login_auth_api.domain.status.StatusPedido;
import jakarta.validation.constraints.NotNull;

public record StatusPedidoUpdateDTO(
        @NotNull(message = "Status do Pedido é Obrigatório!")
        StatusPedido statusPedido
) {
}
