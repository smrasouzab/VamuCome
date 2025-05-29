package com.example.login_auth_api.repositories;

import com.example.login_auth_api.domain.avaliacao.Avaliacao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Integer> {
    boolean existsByPedido_IdPedido(Integer idPedido);
}
