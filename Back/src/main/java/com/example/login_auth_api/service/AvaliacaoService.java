package com.example.login_auth_api.service;

import com.example.login_auth_api.domain.avaliacao.Avaliacao;
import com.example.login_auth_api.domain.cliente.Cliente;
import com.example.login_auth_api.domain.pedido.Pedido;
import com.example.login_auth_api.domain.status.StatusPedido;
import com.example.login_auth_api.dto.request.AvaliacaoRequestDTO;
import com.example.login_auth_api.repositories.AvaliacaoRepository;
import com.example.login_auth_api.repositories.ClienteRepository;
import com.example.login_auth_api.repositories.PedidoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AvaliacaoService {
    private final AvaliacaoRepository avaliacaoRepository;
    private final PedidoRepository pedidoRepository;
    private final ClienteRepository clienteRepository;

    @Transactional
    public Avaliacao cadastrarAvaliacao(AvaliacaoRequestDTO dto, String emailCliente) {
        Cliente cliente = clienteRepository.findByDsEmailCliente(emailCliente)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        Pedido pedido = pedidoRepository.findById(dto.idPedido())
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        if (!pedido.getCliente().getIdCliente().equals(cliente.getIdCliente())) {
            throw new RuntimeException("Esse pedido não pertence ao cliente autenticado.");
        }

        if (pedido.getStatusPedido().equals(StatusPedido.ENTREGUE)) {
            throw new RuntimeException("A avaliação só pode ser feita após o pedido ser entregue.");
        }

        if (avaliacaoRepository.existsByPedido_IdPedido(pedido.getIdPedido())) {
            throw new RuntimeException("Esse pedido já foi avaliado.");
        }

        // Cria avaliação
        Avaliacao avaliacao = new Avaliacao();
        avaliacao.setCliente(cliente);
        avaliacao.setFornecedor(pedido.getFornecedor());
        BeanUtils.copyProperties(dto, avaliacao);

        return avaliacaoRepository.save(avaliacao);
    }
}
