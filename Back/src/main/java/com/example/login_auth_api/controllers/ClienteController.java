package com.example.login_auth_api.controllers;

import com.example.login_auth_api.dto.ClienteRegisterDTO;
import com.example.login_auth_api.dto.response.ClienteResponseDTO;
import com.example.login_auth_api.service.ClienteService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/cliente")
public class ClienteController {

    private final ClienteService clienteService;

    @PostMapping("/register")
    public ResponseEntity<?> registrarCliente(@RequestBody @Valid ClienteRegisterDTO dto) {
        try {
            ClienteResponseDTO clienteCriado = clienteService.registrarCliente(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(clienteCriado); // HTTP 201 + corpo
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // HTTP 400 + mensagem de erro
        }
    }

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
}
