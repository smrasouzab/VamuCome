package com.example.login_auth_api.service;

import com.example.login_auth_api.domain.itemPedido.ItemPedido;
import com.example.login_auth_api.domain.pedido.Pedido;
import com.example.login_auth_api.domain.produto.Produto;
import com.example.login_auth_api.dto.request.ItemPedidoRequestDTO;
import com.example.login_auth_api.repositories.ItemPedidoRepository;
import com.example.login_auth_api.repositories.PedidoRepository;
import com.example.login_auth_api.repositories.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemPedidoService {

    private final ProdutoRepository produtoRepository;
    private final PedidoRepository pedidoRepository;
    private final ItemPedidoRepository itemPedidoRepository;

    public ItemPedido criarItem(ItemPedidoRequestDTO dto, Pedido pedido) {
        if (dto.idProduto() == null) {
            throw new IllegalArgumentException("ID do produto não pode ser nulo");
        }

        Produto produto = produtoRepository.findById(dto.idProduto())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        ItemPedido item = new ItemPedido();
        item.setProduto(produto);
        item.setPedido(pedido);
        item.setQtItem(dto.qtItem());
        item.setDsObservacaoItem(dto.dsObservacaoItem());
        item.setVlItem(produto.getVlProduto());
        item.calcularTotalItemPedido();

        return itemPedidoRepository.save(item);
    }

    public List<ItemPedido> listarItensPorPedido(Integer pedidoId) {
        return itemPedidoRepository.findByPedido_IdPedido(pedidoId);
    }
}
