package com.example.login_auth_api.dto.response;

import com.example.login_auth_api.domain.itemPedido.ItemPedido;
import com.example.login_auth_api.domain.pagamento.TipoPagamento;
import com.example.login_auth_api.domain.pedido.Pedido;
import com.example.login_auth_api.domain.status.StatusPedido;

import java.math.BigDecimal;
import java.util.List;

public record PedidoResponseDTO(
        Integer idPedido,
        BigDecimal vlTotalPedido,
        StatusPedido statusPedido,
        TipoPagamento tipoPagamento,
        List<ItemPedido> itens
) {
    public PedidoResponseDTO(Pedido pedido) {
        this(pedido.getIdPedido(), pedido.getVlTotalPedido(),
                pedido.getStatusPedido(), pedido.getTipoPagamento(), pedido.getItensPedido());
    }
}
