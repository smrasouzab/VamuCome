package com.example.login_auth_api.service;

import com.example.login_auth_api.dto.response.relatorios.AvaliacaoRelatorioDTO;
import com.example.login_auth_api.dto.response.relatorios.FaturamentoAnualResponseDTO;
import com.example.login_auth_api.dto.response.relatorios.FaturamentoMensalResponseDTO;
import com.example.login_auth_api.dto.response.relatorios.HistoricoAcessoResponseDTO;
import com.example.login_auth_api.repositories.HistoricoAcessoRepository;
import com.example.login_auth_api.repositories.RelatorioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RelatorioService {

    private final RelatorioRepository relatorioRepository;

    public List<FaturamentoAnualResponseDTO> obterFaturamentoAnual() {
        return relatorioRepository.consultarFaturamentoAgrupado().stream()
                .map(obj -> new FaturamentoAnualResponseDTO(
                        ((Number) obj[0]).intValue(),
                        ((Number) obj[1]).longValue(),
                        ((Number) obj[2]).longValue(),
                        ((Number) obj[3]).longValue()
                ))
                .toList();
    }

    public List<FaturamentoMensalResponseDTO> obterFaturamentoMensal() {
        return relatorioRepository.consultarFaturamentoMensal().stream()
                .map(obj -> new FaturamentoMensalResponseDTO(
                        ((Number) obj[0]).intValue(), // ano
                        ((Number) obj[1]).intValue(), // mes
                        ((Number) obj[2]).longValue(),
                        ((Number) obj[3]).longValue(),
                        ((Number) obj[4]).longValue()
                ))
                .toList();
    }

    public List<AvaliacaoRelatorioDTO> obterRelatorioAvaliacoes() {
        return relatorioRepository.consultarRelatorioAvaliacoes().stream()
                .map(obj -> new AvaliacaoRelatorioDTO(
                        ((Number) obj[0]).intValue(),
                        (String) obj[1],
                        ((Number) obj[2]).longValue(),
                        ((Number) obj[3]).doubleValue()
                ))
                .toList();
    }

    private final HistoricoAcessoRepository historicoRepository;

    public List<HistoricoAcessoResponseDTO> obterRelatorioAcessoUsuarios() {
        return historicoRepository.findAll().stream()
                .map(HistoricoAcessoResponseDTO::new)
                .toList();
    }
}