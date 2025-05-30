package com.example.login_auth_api.repositories;

import com.example.login_auth_api.domain.cliente.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
    Optional<Cliente> findByDsEmailCliente(String email);
    Optional<Cliente> findByNuCPF(String cpf);
}