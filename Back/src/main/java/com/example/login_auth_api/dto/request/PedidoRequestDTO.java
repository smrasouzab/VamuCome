package com.example.login_auth_api.dto.request;

import com.example.login_auth_api.domain.pagamento.TipoPagamento;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record PedidoRequestDTO(
        @NotNull(message = "idFornecedor é obrigatório")
        Integer idFornecedor,

        @NotNull(message = "Tipo de pagamento é obrigatório")
        TipoPagamento tipoPagamento,

        @NotNull(message = "A lista de itens não pode ser nula")
        @Size(min = 1, message = "O pedido deve conter pelo menos um item")
        List<@Valid ItemPedidoRequestDTO> itens
) {}
