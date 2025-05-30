package com.example.login_auth_api.dto.response;

import com.example.login_auth_api.domain.avaliacao.Avaliacao;
import com.example.login_auth_api.domain.cliente.Cliente;
import com.example.login_auth_api.domain.fornecedor.Fornecedor;
import com.example.login_auth_api.domain.pedido.Pedido;

public record AvaliacaoResponseDTO(
        Integer idAvaliacao,
        String dsComentario,
        String nmUsuarioCliente,
        Integer idPedido,
        String nmUsuarioFornecedor
) {
    public AvaliacaoResponseDTO(Avaliacao avaliacao) {
        this(avaliacao.getIdAvaliacao(), avaliacao.getDsComentario(), avaliacao.getCliente().getNmUsuarioCliente(), avaliacao.getPedido().getIdPedido(), avaliacao.getFornecedor().getNmUsuarioFornecedor());
    }
}
