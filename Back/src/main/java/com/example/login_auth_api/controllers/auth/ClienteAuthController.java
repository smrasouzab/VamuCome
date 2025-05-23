package com.example.login_auth_api.controllers.auth;

import com.example.login_auth_api.domain.cliente.Cliente;
import com.example.login_auth_api.dto.request.login.ClienteRequestLoginDTO;
import com.example.login_auth_api.dto.request.register.ClienteRequestRegisterDTO;
import com.example.login_auth_api.dto.response.LoginResponseDTO;
import com.example.login_auth_api.service.auth.ClienteAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
        String token = clienteAuthService.login(dto);
        Cliente cliente = clienteAuthService.loadByEmail(dto.dsEmailCliente()); // método utilitário se quiser puxar nome, ID, etc.

        return ResponseEntity.ok(new LoginResponseDTO(
                cliente.getIdCliente(),
                cliente.getNmUsuarioCliente(),
                token,
                "CLIENTE"
        ));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid ClienteRequestRegisterDTO dto) {
        clienteAuthService.register(dto);
        return ResponseEntity.ok().build();
    }
}