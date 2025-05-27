package com.example.login_auth_api.controllers.auth;

import com.example.login_auth_api.domain.cliente.Cliente;
import com.example.login_auth_api.dto.request.login.ClienteRequestLoginDTO;
import com.example.login_auth_api.dto.request.register.ClienteRequestRegisterDTO;
import com.example.login_auth_api.dto.response.ClienteResponseDTO;
import com.example.login_auth_api.dto.response.LoginResponseDTO;
import com.example.login_auth_api.service.auth.ClienteAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth/cliente")
@RequiredArgsConstructor
public class ClienteAuthController {

    private final ClienteAuthService clienteAuthService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid ClienteRequestLoginDTO dto) {
        System.out.println("➡️ [POST] /auth/cliente/login chamado com email: " + dto.dsEmailCliente());

        String token = clienteAuthService.login(dto);
        System.out.println("✅ Token gerado com sucesso para: " + dto.dsEmailCliente());

        Cliente cliente = clienteAuthService.loadByEmail(dto.dsEmailCliente());
        System.out.println("👤 Cliente carregado: " + cliente.getNmUsuarioCliente() + " (ID: " + cliente.getIdCliente() + ")");

        return ResponseEntity.ok(new LoginResponseDTO(cliente.getIdCliente(), cliente.getNmUsuarioCliente(), token, "CLIENTE"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid ClienteRequestRegisterDTO dto) {
        System.out.println("➡️ [POST] /auth/cliente/register chamado com email: " + dto.dsEmailCliente());

        try {
            ClienteResponseDTO clienteCriado = clienteAuthService.register(dto);
            System.out.println("✅ Cliente registrado com sucesso: " + clienteCriado.nmUsuarioCliente());
            return ResponseEntity.status(HttpStatus.CREATED).body(clienteCriado); // HTTP 201 + corpo
        } catch (IllegalArgumentException e) {
            System.out.println("❌ Erro ao registrar cliente: " + e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage()); // HTTP 400 + mensagem de erro
        }
    }
}