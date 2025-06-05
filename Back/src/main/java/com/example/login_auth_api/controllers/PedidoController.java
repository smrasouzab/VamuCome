package com.example.login_auth_api.controllers;

import com.example.login_auth_api.domain.cliente.Cliente;
import com.example.login_auth_api.domain.pagamento.TipoPagamento;
import com.example.login_auth_api.domain.pedido.Pedido;
import com.example.login_auth_api.domain.status.StatusPedido;
import com.example.login_auth_api.dto.request.pedido.PedidoRequestDTO;
import com.example.login_auth_api.dto.request.pedido.PedidoUpdateDTO;
import com.example.login_auth_api.dto.request.pedido.StatusPedidoUpdateDTO;
import com.example.login_auth_api.dto.response.PedidoResponseDTO;
import com.example.login_auth_api.repositories.ClienteRepository;
import com.example.login_auth_api.service.PedidoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import java.util.Arrays;
import java.util.Optional;

@RestController
@RequestMapping("/cliente/pedido")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PedidoController {
    private final PedidoService pedidoService;
    private final ClienteRepository clienteRepository;

    @GetMapping("/listar")
    public ResponseEntity<List<PedidoResponseDTO>> listarPedidosPorCliente(Authentication auth) {
        Optional<Cliente> cliente = clienteRepository.findByDsEmailCliente(auth.getName());

        if (cliente.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Integer idCliente = cliente.get().getIdCliente();
        List<PedidoResponseDTO> pedidos = pedidoService.listarPedidosPorCliente(idCliente);
        return ResponseEntity.ok(pedidos);
    }

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

    @PutMapping("/atualizar/{idPedido}")
    public ResponseEntity<Object> atualizarPedido(
            @PathVariable Integer idPedido,
            @RequestBody @Valid PedidoUpdateDTO dto
    ) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        try {
            PedidoResponseDTO response = pedidoService.atualizarPedido(idPedido, dto, email);
            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @PutMapping("/atualizar/status-pedido/{idPedido}")
    public ResponseEntity<Object> atualizarStatusPedido(
            @PathVariable Integer idPedido,
            @RequestBody @Valid StatusPedidoUpdateDTO dto
    ) {
           Pedido pedido = pedidoService.atualizarStatusPedido(idPedido, dto);
           if (pedido != null) {
               return ResponseEntity.ok(pedido);
           }
           return ResponseEntity.ok("Não foi possível atualizar o status do pedido");

    }
}
