package com.example.login_auth_api.repositories;

import com.example.login_auth_api.domain.status.StatusPedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusPedidoRepository extends JpaRepository<StatusPedido, Integer> {
}
