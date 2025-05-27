package com.example.login_auth_api.controllers;

import com.example.login_auth_api.dto.response.FornecedorResponseDTO;
import com.example.login_auth_api.service.FornecedorService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/fornecedor")
public class FornecedorController {

    private final FornecedorService fornecedorService;

    @GetMapping("/listar-todos")
    public ResponseEntity<List<FornecedorResponseDTO>> listarTodosFornecedores() {
        List<FornecedorResponseDTO> fornecedores = fornecedorService.listarTodosFornecedores();

        if (fornecedores.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(fornecedores);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarFornecedorPorId(@PathVariable Integer id) {
        try {
            FornecedorResponseDTO dto = fornecedorService.listarFornecedorPorId(id);
            return ResponseEntity.ok(dto);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}