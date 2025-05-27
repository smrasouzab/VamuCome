package com.example.login_auth_api.controllers;

import com.example.login_auth_api.dto.response.ClienteResponseDTO;
import com.example.login_auth_api.service.ClienteService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/cliente")
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
}
