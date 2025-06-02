package com.example.login_auth_api.controllers;

import com.example.login_auth_api.domain.avaliacao.Avaliacao;
import com.example.login_auth_api.dto.request.avaliacao.AvaliacaoRequestDTO;
import com.example.login_auth_api.dto.request.avaliacao.AvaliacaoUpdateDTO;
import com.example.login_auth_api.dto.response.AvaliacaoResponseDTO;
import com.example.login_auth_api.service.AvaliacaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cliente/avaliacao")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AvaliacaoController {

    private final AvaliacaoService avaliacaoService;

    @PostMapping("/avaliar")
    public ResponseEntity<?> avaliarPedidoCliente(@RequestBody @Valid AvaliacaoRequestDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Avaliacao avaliacao = avaliacaoService.cadastrarAvaliacao(dto, email);
        return ResponseEntity.status(HttpStatus.CREATED).body("Avaliação cadastrada com sucesso!");
    }

    @GetMapping("/listar")
    public ResponseEntity<List<AvaliacaoResponseDTO>> listarAvaliacoesCliente() {
        List<AvaliacaoResponseDTO> avaliacoes = avaliacaoService.listarAvaliacoes();

        return avaliacoes.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(avaliacoes);
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<AvaliacaoResponseDTO> atualizarAvaliacaoCliente(
            @PathVariable Integer id,
            @RequestBody @Valid AvaliacaoUpdateDTO dto
    ) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        AvaliacaoResponseDTO response = avaliacaoService.atualizarAvaliacao(id, dto, email);
        return ResponseEntity.ok(response);
    }
}
