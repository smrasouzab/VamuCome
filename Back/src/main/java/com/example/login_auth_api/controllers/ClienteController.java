package com.example.login_auth_api.controllers;

import com.example.login_auth_api.domain.endereco.Endereco;
import com.example.login_auth_api.dto.request.EnderecoRequestDTO;
import com.example.login_auth_api.dto.response.ClienteResponseDTO;
import com.example.login_auth_api.service.ClienteService;
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
@RequestMapping("/cliente")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ClienteController {

    private final ClienteService clienteService;

    @GetMapping("/listar-todos")
    public ResponseEntity<List<ClienteResponseDTO>> listarTodosClientes() {
        List<ClienteResponseDTO> clientes = clienteService.listarTodosClientes();

        if (clientes.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204
        }

        return ResponseEntity.ok(clientes); // 200
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarCliente(@PathVariable Integer id) {
        try {
            ClienteResponseDTO dto = clienteService.listarClientePorId(id);
            return ResponseEntity.ok(dto);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/endereco/cadastrar")
    public ResponseEntity<?> adicionarEndereco(@RequestBody @Valid EnderecoRequestDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        clienteService.adicionarEndereco(email, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Endereço cadastrado para o cliente.");
    }

    @GetMapping("/endereco/listar")
    public ResponseEntity<List<Endereco>> listarEnderecos() {
        List<Endereco> enderecos = clienteService.listarEnderecosDoCliente();
        return ResponseEntity.ok(enderecos);
    }

    @PutMapping("/endereco/atualizar/{id}")
    public ResponseEntity<String> atualizarEndereco(
            @PathVariable Integer id,
            @RequestBody @Valid EnderecoRequestDTO dto
    ) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        clienteService.atualizarEnderecoDoCliente(id, dto, email);
        return ResponseEntity.ok("Endereço atualizado com sucesso");
    }


}
