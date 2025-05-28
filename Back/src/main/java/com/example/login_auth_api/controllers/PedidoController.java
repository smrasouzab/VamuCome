package com.example.login_auth_api.controllers;

import com.example.login_auth_api.domain.pagamento.TipoPagamento;
import com.example.login_auth_api.domain.status.StatusPedido;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import java.util.Arrays;

@RestController
@RequestMapping("/fornecedor/pedido")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PedidoController {

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
