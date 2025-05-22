package com.example.login_auth_api.dto.request;

import com.example.login_auth_api.domain.cliente.Cliente;
import com.example.login_auth_api.domain.fornecedor.Fornecedor;
import com.example.login_auth_api.domain.pagamento.TipoPagamento;
import com.example.login_auth_api.domain.status.StatusPedido;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record PedidoRequestDTO(
        @NotBlank Cliente cliente,
        @NotBlank Fornecedor fornecedor,
        @NotBlank StatusPedido statusPedido,
        @NotBlank TipoPagamento tipoPagamento,
        @NotNull BigDecimal vlTotalPedido
        //FALTA ITEMPEDIDO
) {
}
