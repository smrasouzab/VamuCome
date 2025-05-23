package com.example.login_auth_api.controllers;

import com.example.login_auth_api.dto.request.register.FornecedorRequestRegisterDTO;
import com.example.login_auth_api.dto.response.FornecedorResponseDTO;
import com.example.login_auth_api.service.FornecedorService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fornecedor")
@RequiredArgsConstructor
public class FornecedorController {

    private final FornecedorService fornecedorService;

    @PostMapping("/register")
    public ResponseEntity<?> registrarFornecedor(@RequestBody @Valid FornecedorRequestRegisterDTO dto) {
        try {
            FornecedorResponseDTO fornecedorCriado = fornecedorService.registrarFornecedor(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(fornecedorCriado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

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
            FornecedorResponseDTO dto = fornecedorService.buscarFornecedorPorId(id);
            return ResponseEntity.ok(dto);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}