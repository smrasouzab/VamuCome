package com.example.login_auth_api.service;

import com.example.login_auth_api.domain.avaliacao.Avaliacao;
import com.example.login_auth_api.domain.cliente.Cliente;
import com.example.login_auth_api.domain.fornecedor.Fornecedor;
import com.example.login_auth_api.domain.pedido.Pedido;
import com.example.login_auth_api.domain.produto.Produto;
import com.example.login_auth_api.domain.status.StatusPedido;
import com.example.login_auth_api.dto.request.avaliacao.AvaliacaoRequestDTO;
import com.example.login_auth_api.dto.request.avaliacao.AvaliacaoUpdateDTO;
import com.example.login_auth_api.dto.response.AvaliacaoResponseDTO;
import com.example.login_auth_api.dto.response.ProdutoResponseDTO;
import com.example.login_auth_api.repositories.AvaliacaoRepository;
import com.example.login_auth_api.repositories.ClienteRepository;
import com.example.login_auth_api.repositories.PedidoRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

        Avaliacao avaliacao = new Avaliacao();
        avaliacao.setCliente(cliente);
        avaliacao.setFornecedor(pedido.getFornecedor());
        avaliacao.setPedido(pedido);
        BeanUtils.copyProperties(dto, avaliacao);

        return avaliacaoRepository.save(avaliacao);
    }

    public List<AvaliacaoResponseDTO> listarAvaliacoes() {
        return avaliacaoRepository.findAll().stream()
                .map(AvaliacaoResponseDTO::new)
                .toList();
    }

    @Transactional
    public AvaliacaoResponseDTO atualizarAvaliacao(Integer idAvaliacao, AvaliacaoUpdateDTO dto, String emailCliente) {

        Avaliacao avaliacao = avaliacaoRepository.findById(idAvaliacao)
                .orElseThrow(() -> new EntityNotFoundException("Avaliação não encontrada"));

        Cliente cliente = clienteRepository.findByDsEmailCliente(emailCliente)
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado"));

        if (!avaliacao.getCliente().getIdCliente().equals(cliente.getIdCliente())) {
            throw new RuntimeException("Você não tem permissão para alterar essa avaliacao");
        }

        avaliacao.setQtNota(dto.qtNota());
        avaliacao.setDsComentario(dto.dsComentario());

        return new AvaliacaoResponseDTO(avaliacaoRepository.save(avaliacao));
    }
}
