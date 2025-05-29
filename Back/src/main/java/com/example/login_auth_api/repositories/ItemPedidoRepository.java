package com.example.login_auth_api.repositories;

import com.example.login_auth_api.domain.itemPedido.ItemPedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemPedidoRepository extends JpaRepository<ItemPedido, Integer> {
    List<ItemPedido> findByPedido_IdPedido(Integer idPedido);
}
