package com.example.login_auth_api.service;

import com.example.login_auth_api.domain.cliente.Cliente;
import com.example.login_auth_api.domain.fornecedor.Fornecedor;
import com.example.login_auth_api.domain.itemPedido.ItemPedido;
import com.example.login_auth_api.domain.pedido.Pedido;
import com.example.login_auth_api.domain.status.StatusPedido;
import com.example.login_auth_api.dto.request.pedido.PedidoRequestDTO;
import com.example.login_auth_api.dto.request.pedido.PedidoUpdateDTO;
import com.example.login_auth_api.dto.request.pedido.StatusPedidoUpdateDTO;
import com.example.login_auth_api.dto.response.PedidoResponseDTO;
import com.example.login_auth_api.repositories.ClienteRepository;
import com.example.login_auth_api.repositories.FornecedorRepository;
import com.example.login_auth_api.repositories.ItemPedidoRepository;
import com.example.login_auth_api.repositories.PedidoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ClienteRepository clienteRepository;
    private final FornecedorRepository fornecedorRepository;
    private final ItemPedidoService itemPedidoService;
    private final ItemPedidoRepository itemPedidoRepository;

    @Transactional
    public PedidoResponseDTO criarPedido(PedidoRequestDTO dto, String emailCliente) {
        Cliente cliente = clienteRepository.findByDsEmailCliente(emailCliente)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        Fornecedor fornecedor = fornecedorRepository.findById(dto.idFornecedor())
                .orElseThrow(() -> new RuntimeException("Fornecedor não encontrado"));

        LocalTime agora = LocalTime.now();
        if (!isDentroDoHorario(fornecedor, agora)) {
            throw new RuntimeException("Fora do horário de funcionamento do fornecedor");
        }

        Pedido pedido = new Pedido();
        pedido.setCliente(cliente);
        pedido.setFornecedor(fornecedor);
        pedido.setTipoPagamento(dto.tipoPagamento());
        pedido.setStatusPedido(StatusPedido.AGUARDANDO_PAGAMENTO);
        pedido.setVlTotalPedido(BigDecimal.ZERO);

        pedido = pedidoRepository.save(pedido); // garantir ID

        Pedido pedidoFinal = pedido;
        List<ItemPedido> itens = dto.itens().stream()
                .map(itemDto -> itemPedidoService.criarItem(itemDto, pedidoFinal))
                .collect(Collectors.toCollection(ArrayList::new));

        BigDecimal total = itens.stream()
                .map(ItemPedido::getVlTotalItemPedido)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        pedido.setItensPedido(itens);
        pedido.setVlTotalPedido(total);

        return new PedidoResponseDTO(pedidoRepository.save(pedido));
    }

    private boolean isDentroDoHorario(Fornecedor fornecedor, LocalTime agora) {
        return !agora.isBefore(fornecedor.getDtHorarioAbertura().toLocalTime()) ||
                !agora.isAfter(fornecedor.getDtHorarioFechamento().toLocalTime());
    }

    public List<PedidoResponseDTO> listarPedidos() {
        return pedidoRepository.findAll().stream()
                .map(PedidoResponseDTO::new)
                .toList();
    }

    public List<PedidoResponseDTO> listarPedidosPorCliente(Integer idCliente) {
        List<Pedido> pedidos = pedidoRepository.findByClienteIdCliente(idCliente);
        return pedidos.stream()
                .map(PedidoResponseDTO::new)
                .collect(Collectors.toList());
    }

    public List<PedidoResponseDTO> listarPedidosPorFornecedor(Integer idFornecedor) {
        List<Pedido> pedidos = pedidoRepository.findByFornecedorIdFornecedor(idFornecedor);
        return pedidos.stream()
                .map(PedidoResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public PedidoResponseDTO atualizarPedido(Integer idPedido, PedidoUpdateDTO dto, String emailCliente) {
        Pedido pedido = pedidoRepository.findById(idPedido)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        if (!pedido.getCliente().getDsEmailCliente().equals(emailCliente)) {
            throw new RuntimeException("Você não tem permissão para alterar esse pedido");
        }

        if (pedido.getStatusPedido().ordinal() >= StatusPedido.EM_PREPARO.ordinal()) {
            throw new RuntimeException("Pedido não pode ser atualizado. Já está em preparo ou além.");
        }
        // Limpar os itens antigos
        itemPedidoRepository.deleteAll(pedido.getItensPedido());

        // Criar novos itens com base no DTO
        List<ItemPedido> novosItens = dto.itens().stream()
                .map(itemDto -> itemPedidoService.criarItem(itemDto, pedido))
                .collect(Collectors.toCollection(ArrayList::new));

        BigDecimal total = novosItens.stream()
                .map(ItemPedido::getVlTotalItemPedido)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        pedido.getItensPedido().clear();
        pedido.getItensPedido().addAll(novosItens);
        pedido.setVlTotalPedido(total);
        pedido.setTipoPagamento(dto.tipoPagamento());

        return new PedidoResponseDTO(pedidoRepository.save(pedido));
    }

    @Transactional
    public Pedido atualizarStatusPedido(Integer idPedido, StatusPedidoUpdateDTO dto) {
        Pedido pedido = pedidoRepository.findById(idPedido)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        pedido.setStatusPedido(dto.statusPedido());
        return pedidoRepository.save(pedido);
    }
}
