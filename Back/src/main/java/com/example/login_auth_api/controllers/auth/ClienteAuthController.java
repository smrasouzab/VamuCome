package com.example.login_auth_api.controllers.auth;

import com.example.login_auth_api.domain.cliente.Cliente;
import com.example.login_auth_api.dto.request.login.ClienteRequestLoginDTO;
import com.example.login_auth_api.dto.request.register.ClienteRequestRegisterDTO;
import com.example.login_auth_api.dto.response.LoginResponseDTO;
import com.example.login_auth_api.service.TokenService;
import com.example.login_auth_api.service.auth.ClienteAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth/cliente")
@RequiredArgsConstructor
public class ClienteAuthController {

    private final ClienteAuthService clienteAuthService;
    private final TokenService tokenService;

    @Qualifier("authenticationManager")
    private final AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid ClienteRequestLoginDTO dto) {
        System.out.println("Entrou no controller de login com email: " + dto.dsEmailCliente());

        var credentials = new UsernamePasswordAuthenticationToken(dto.dsEmailCliente(), dto.dsSenhaCliente());
        System.out.println("🔑 Tentando autenticar com senha: " + dto.dsSenhaCliente());
        var auth = authenticationManager.authenticate(credentials);
        System.out.println("Autenticação concluída");

        Cliente cliente = (Cliente) auth.getPrincipal();
        System.out.println("Cliente autenticado: " + cliente.getNmUsuarioCliente());

        String token = tokenService.generateToken(cliente);
        System.out.println("Token gerado");

        return ResponseEntity.ok(new LoginResponseDTO(
                cliente.getIdCliente(),
                cliente.getNmUsuarioCliente(),
                token,
                "CLIENTE"
        ));
    }

    /*
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid ClienteRequestLoginDTO dto) {
        System.out.println("📥 Entrou no controller de login com email: " + dto.dsEmailCliente());

        // NÃO AUTENTICA — apenas simula
        return ResponseEntity.ok(new LoginResponseDTO(
                1,
                "Mock Cliente",
                "mock-token",
                "CLIENTE"
        ));
    }
     */

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid ClienteRequestRegisterDTO dto) {
        clienteAuthService.register(dto);
        return ResponseEntity.ok().build();
    }
}