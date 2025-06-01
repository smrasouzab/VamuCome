package com.example.login_auth_api.repositories;

import com.example.login_auth_api.domain.historico.HistoricoAcesso;
import com.example.login_auth_api.domain.historico.PerfilUsuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HistoricoAcessoRepository extends JpaRepository<HistoricoAcesso, Integer> {
    List<HistoricoAcesso> findByRole(PerfilUsuario role); // Exemplo de filtro - criado pelo gpt
}