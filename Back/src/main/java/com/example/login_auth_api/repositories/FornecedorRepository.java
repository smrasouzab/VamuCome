package com.example.login_auth_api.repositories;

import com.example.login_auth_api.domain.cliente.Cliente;
import com.example.login_auth_api.domain.fornecedor.Fornecedor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FornecedorRepository extends JpaRepository<Fornecedor, Integer> {
    Optional<Fornecedor> findByDsEmailFornecedor(String email);
    Optional<Fornecedor> findByDsRazaoSocial(String dsRazaoSocial);
    Optional<Fornecedor> findByNuCNPJ(String nuCNPJ);
}