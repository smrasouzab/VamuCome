package com.example.login_auth_api.controllers;

import com.example.login_auth_api.dto.response.AvaliacaoRelatorioDTO;
import com.example.login_auth_api.dto.response.FaturamentoAnualResponseDTO;
import com.example.login_auth_api.dto.response.FaturamentoMensalResponseDTO;
import com.example.login_auth_api.dto.response.HistoricoAcessoResponseDTO;
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

    @GetMapping("/avaliacoes-fornecedores")
    public ResponseEntity<List<AvaliacaoRelatorioDTO>> getRelatorioAvaliacoes() {
        List<AvaliacaoRelatorioDTO> dados = relatorioService.obterRelatorioAvaliacoes();
        return ResponseEntity.ok(dados);
    }

    @GetMapping("/acesso-usuarios")
    public ResponseEntity<List<HistoricoAcessoResponseDTO>> listarTudo() {
        List<HistoricoAcessoResponseDTO> lista = relatorioService.obterRelatorioAcessoUsuarios();
        return ResponseEntity.ok(lista);
    }
}