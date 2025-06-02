package com.example.login_auth_api.controllers;

import com.example.login_auth_api.dto.request.ProdutoRequestDTO;
import com.example.login_auth_api.dto.response.ProdutoResponseDTO;
import com.example.login_auth_api.service.ProdutoService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fornecedor/produto")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProdutoController {
    private final ProdutoService produtoService;

    @PostMapping("/cadastrar")
    public ResponseEntity<ProdutoResponseDTO> cadastrarProduto(
            @RequestBody @Valid ProdutoRequestDTO dto
    ) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        ProdutoResponseDTO response = produtoService.criarProduto(dto, email);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/geral")
    public ResponseEntity<List<ProdutoResponseDTO>> listarTodos() {
        List<ProdutoResponseDTO> produtos = produtoService.listarTodosProdutos();

        return produtos.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(produtos);
    }

    @GetMapping("/todos-por-fornecedor/{idFornecedor}")
    public ResponseEntity<?> listarPorFornecedor(@PathVariable Integer idFornecedor) {
        try {
            List<ProdutoResponseDTO> produtos = produtoService.listarProdutosDoFornecedor(idFornecedor);
            return produtos.isEmpty()
                    ? ResponseEntity.noContent().build()
                    : ResponseEntity.ok(produtos);

        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Fornecedor não encontrado");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno inesperado");
        }
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<Object> atualizarProduto(
            @PathVariable Integer id,
            @RequestBody @Valid ProdutoRequestDTO dto
    ) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        ProdutoResponseDTO response = produtoService.atualizarProduto(id, dto, email);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
