package com.example.login_auth_api.dto.response.relatorios;

import com.example.login_auth_api.domain.historico.HistoricoAcesso;
import com.example.login_auth_api.domain.historico.PerfilUsuario;

import java.time.LocalDateTime;

public record HistoricoAcessoResponseDTO(
        Integer id,
        Integer idUsuario,
        String nmUsuario,
        PerfilUsuario role,
        LocalDateTime dtHoraAcesso
) {
    public HistoricoAcessoResponseDTO(HistoricoAcesso entity) {
        this(
                entity.getId(),
                entity.getIdUsuario(),
                entity.getNmUsuario(),
                entity.getRole(),
                entity.getDtHoraAcesso());
    }
}