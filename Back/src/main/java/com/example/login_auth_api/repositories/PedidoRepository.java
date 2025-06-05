package com.example.login_auth_api.repositories;

import com.example.login_auth_api.domain.pedido.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
    List<Pedido> findByClienteIdCliente(Integer idCliente);
    List<Pedido> findByFornecedorIdFornecedor(Integer idFornecedor);
}
