package com.example.login_auth_api.service;

import com.example.login_auth_api.domain.cliente.Cliente;
import com.example.login_auth_api.domain.fornecedor.Fornecedor;
import com.example.login_auth_api.domain.itemPedido.ItemPedido;
import com.example.login_auth_api.domain.pedido.Pedido;
import com.example.login_auth_api.domain.status.StatusPedido;
import com.example.login_auth_api.dto.request.PedidoRequestDTO;
import com.example.login_auth_api.dto.response.PedidoResponseDTO;
import com.example.login_auth_api.dto.response.ProdutoResponseDTO;
import com.example.login_auth_api.repositories.ClienteRepository;
import com.example.login_auth_api.repositories.FornecedorRepository;
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

        Pedido finalPedido = pedido;
        List<ItemPedido> itens = dto.itens().stream()
                .map(itemDto -> itemPedidoService.criarItem(itemDto, finalPedido))
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
}
