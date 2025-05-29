package com.example.login_auth_api.controllers;

import com.example.login_auth_api.domain.pagamento.TipoPagamento;
import com.example.login_auth_api.domain.status.StatusPedido;
import com.example.login_auth_api.dto.request.PedidoRequestDTO;
import com.example.login_auth_api.dto.response.PedidoResponseDTO;
import com.example.login_auth_api.service.PedidoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import java.util.Arrays;

@RestController
@RequestMapping("/cliente/pedido")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PedidoController {
    private final PedidoService pedidoService;

    @PostMapping("/cadastrar")
    public ResponseEntity<PedidoResponseDTO> cadastrarPedido(
            @RequestBody @Valid PedidoRequestDTO dto
    ) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        PedidoResponseDTO response = pedidoService.criarPedido(dto, email);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    @GetMapping("/tipo-pagamento")
    public ResponseEntity<List<String>> listarTiposPagamento() {
        List<String> tipos = Arrays.stream(TipoPagamento.values())
                .map(Enum::name)
                .toList();

        return ResponseEntity.ok(tipos);
    }

    @GetMapping("/status-pedido")
    public ResponseEntity<List<String>> listarStatusPedido() {
        List<String> status = Arrays.stream(StatusPedido.values())
                .map(Enum::name)
                .toList();

        return ResponseEntity.ok(status);
    }
}
