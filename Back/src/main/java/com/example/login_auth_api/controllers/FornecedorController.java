package com.example.login_auth_api.controllers;

import com.example.login_auth_api.domain.endereco.Endereco;
import com.example.login_auth_api.dto.request.EnderecoRequestDTO;
import com.example.login_auth_api.dto.request.FornecedorUpdateRequestDTO;
import com.example.login_auth_api.dto.request.AltSenhaFornecedorRequestDTO;
import com.example.login_auth_api.dto.response.FornecedorResponseDTO;
import com.example.login_auth_api.dto.response.PedidoResponseDTO;
import com.example.login_auth_api.service.FornecedorService;
import com.example.login_auth_api.service.PedidoService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/fornecedor")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FornecedorController {

    private final FornecedorService fornecedorService;
    private final PedidoController pedidoController;
    private final PedidoService pedidoService;

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

    @GetMapping("/buscar-por-cnpj/{cnpj}")
    public ResponseEntity<?> buscarPorCnpj(@RequestParam String cnpj) {
        try {
            FornecedorResponseDTO dto = fornecedorService.buscarPorCnpj(cnpj);
            return ResponseEntity.ok(dto);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/buscar-por-razao/{razao}")
    public ResponseEntity<?> buscarPorRazaoSocial(@RequestParam String razao) {
        try {
            FornecedorResponseDTO dto = fornecedorService.buscarPorRazaoSocial(razao);
            return ResponseEntity.ok(dto);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarFornecedor(@PathVariable Integer id, @RequestBody @Valid FornecedorUpdateRequestDTO dto) {
        try {
            FornecedorResponseDTO atualizado = fornecedorService.atualizarFornecedor(id, dto);
            return ResponseEntity.ok(atualizado);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/{id}/alterar-senha")
    public ResponseEntity<?> alterarSenha(@PathVariable Integer id, @RequestBody @Valid AltSenhaFornecedorRequestDTO dto) {
        try {
            fornecedorService.alterarSenhaFornecedor(id, dto);
            return ResponseEntity.ok("Senha atualizada com sucesso.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/endereco/cadastrar")
    public ResponseEntity<?> cadastrarEndereco(@RequestBody @Valid EnderecoRequestDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        fornecedorService.cadastrarEndereco(email, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Endereço cadastrado para o fornecedor.");
    }

    @GetMapping("/endereco/listar")
    public ResponseEntity<Endereco> mostrarEndereco() {
        Endereco endereco = fornecedorService.mostrarEnderecoFornecedor();
        return ResponseEntity.ok(endereco);
    }

    @PutMapping("/endereco/atualizar/{id}")
    public ResponseEntity<String> atualizarEndereco(
            @PathVariable Integer id,
            @RequestBody @Valid EnderecoRequestDTO dto
    ) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        fornecedorService.atualizarEnderecoDoFornecedor(id, dto, email);
        return ResponseEntity.ok("Endereço atualizado com sucesso");
    }

    @GetMapping("/pedido/listar")
    public ResponseEntity<List<PedidoResponseDTO>> listarPedidosPorFornecedor() {
        List<PedidoResponseDTO> pedidos = pedidoService.listarPedidos();

        return pedidos.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(pedidos);
    }
}