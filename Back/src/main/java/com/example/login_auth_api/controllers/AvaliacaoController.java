package com.example.login_auth_api.controllers;

import com.example.login_auth_api.domain.avaliacao.Avaliacao;
import com.example.login_auth_api.dto.request.AvaliacaoRequestDTO;
import com.example.login_auth_api.service.AvaliacaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cliente/avaliacao")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AvaliacaoController {

    private final AvaliacaoService avaliacaoService;

    @PostMapping("/avaliar")
    public ResponseEntity<?> avaliarPedido(@RequestBody @Valid AvaliacaoRequestDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Avaliacao avaliacao = avaliacaoService.cadastrarAvaliacao(dto, email);
        return ResponseEntity.status(HttpStatus.CREATED).body("Avaliação cadastrada com sucesso!" + avaliacao);
    }
}
