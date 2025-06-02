package com.example.login_auth_api.controllers;

import com.example.login_auth_api.dto.request.ProdutoRequestDTO;
import com.example.login_auth_api.dto.response.ProdutoResponseDTO;
import com.example.login_auth_api.service.ProdutoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final ProdutoService produtoService;

    @PostMapping("/cadastrar-produto")
    public ResponseEntity<ProdutoResponseDTO> cadastrarProduto(
            @RequestBody @Valid ProdutoRequestDTO dto
    ) {
        ProdutoResponseDTO response = produtoService.criarProdutoAdmin(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
