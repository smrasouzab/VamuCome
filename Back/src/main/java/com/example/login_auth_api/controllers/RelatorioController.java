package com.example.login_auth_api.controllers;

import com.example.login_auth_api.dto.response.*;
import com.example.login_auth_api.service.AvaliacaoService;
import com.example.login_auth_api.service.RelatorioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin/relatorios")
@RequiredArgsConstructor
public class RelatorioController {

    private final RelatorioService relatorioService;
    private final AvaliacaoService avaliacaoService;

    @GetMapping("/anual")
    public ResponseEntity<List<FaturamentoAnualResponseDTO>> getFaturamento() {
        List<FaturamentoAnualResponseDTO> dados = relatorioService.obterFaturamentoAnual();
        return ResponseEntity.ok(dados);
    }

    @GetMapping("/mensal")
    public ResponseEntity<List<FaturamentoMensalResponseDTO>> getFaturamentoMensal() {
        List<FaturamentoMensalResponseDTO> dados = relatorioService.obterFaturamentoMensal();
        return ResponseEntity.ok(dados);
    }

    @GetMapping("/avaliacoes")
    public ResponseEntity<List<AvaliacaoResponseDTO>> listarAvaliacoes() {
        List<AvaliacaoResponseDTO> avaliacoes = avaliacaoService.listarAvaliacoes();

        return avaliacoes.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(avaliacoes);
    }

    @GetMapping("/acesso-usuarios")
    public ResponseEntity<List<HistoricoAcessoResponseDTO>> listarTudo() {
        List<HistoricoAcessoResponseDTO> lista = relatorioService.obterRelatorioAcessoUsuarios();
        return ResponseEntity.ok(lista);
    }
}