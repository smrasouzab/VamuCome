package com.example.login_auth_api.dto.response;

import com.example.login_auth_api.domain.pagamento.TipoPagamento;
import com.example.login_auth_api.domain.pedido.Pedido;
import com.example.login_auth_api.domain.status.StatusPedido;

import java.math.BigDecimal;

public record PedidoResponseDTO(
        Integer idPedido,
        BigDecimal vlTotalPedido,
        StatusPedido statusPedido,
        TipoPagamento tipoPagamento
) {
    public PedidoResponseDTO(Pedido pedido) {
        this(pedido.getIdPedido(), pedido.getVlTotalPedido(),
                pedido.getStatusPedido(), pedido.getTipoPagamento());
    }
}
