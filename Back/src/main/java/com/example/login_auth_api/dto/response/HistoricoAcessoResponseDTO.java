package com.example.login_auth_api.dto.response;

import com.example.login_auth_api.domain.historico.HistoricoAcesso;
import com.example.login_auth_api.domain.historico.PerfilUsuario;

import java.time.LocalDateTime;

public record HistoricoAcessoResponseDTO(
        Integer id,
        Integer idUsuario,
        String nomeUsuario,
        PerfilUsuario role,
        LocalDateTime dataHoraAcesso
) {
    public HistoricoAcessoResponseDTO(HistoricoAcesso entity) {
        this(
                entity.getId(),
                entity.getIdUsuario(),
                entity.getNomeUsuario(),
                entity.getRole(),
                entity.getDataHoraAcesso());
    }
}