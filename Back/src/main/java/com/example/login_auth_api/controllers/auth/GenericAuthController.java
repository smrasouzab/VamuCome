package com.example.login_auth_api.controllers.auth;

import com.example.login_auth_api.domain.admin.Admin;
import com.example.login_auth_api.domain.cliente.Cliente;
import com.example.login_auth_api.domain.fornecedor.Fornecedor;
import com.example.login_auth_api.dto.response.UsuarioLogadoDTO;
import com.example.login_auth_api.repositories.AdminRepository;
import com.example.login_auth_api.repositories.ClienteRepository;
import com.example.login_auth_api.repositories.FornecedorRepository;
import com.example.login_auth_api.service.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class GenericAuthController {
    private final TokenService tokenService;
    private final ClienteRepository clienteRepository;
    private final FornecedorRepository fornecedorRepository;
    private final AdminRepository adminRepository;

    @GetMapping("/validate-token")
    public ResponseEntity<?> validateToken(HttpServletRequest request) {
        String token = tokenService.extractToken(request);
        System.out.println("🔍 Token extraído: " + token);

        if (token == null || token.isBlank()) {
            System.out.println("❌ Token ausente");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token ausente");
        }

        try {
            String email = tokenService.verifyToken(token);
            System.out.println("✅ Token válido para usuário: " + email);

            // Tenta buscar nas três entidades
            Optional<Cliente> cliente = clienteRepository.findByDsEmailCliente(email);
            if (cliente.isPresent()) {
                Cliente c = cliente.get();
                System.out.println("Cliente encontrado");
                return ResponseEntity.ok(new UsuarioLogadoDTO(c.getIdCliente(), c.getNmUsuarioCliente(), "CLIENTE"));
            }

            Optional<Fornecedor> fornecedor = fornecedorRepository.findByDsEmailFornecedor(email);
            if (fornecedor.isPresent()) {
                Fornecedor f = fornecedor.get();
                System.out.println("Fornecedor encontrado");
                return ResponseEntity.ok(new UsuarioLogadoDTO(f.getIdFornecedor(), f.getNmUsuarioFornecedor(), "FORNECEDOR"));
            }

            Optional<Admin> admin = adminRepository.findByNmUsuarioAdmin(email);
            if (admin.isPresent()) {
                Admin a = admin.get();
                System.out.println("Admin encontrado");
                return ResponseEntity.ok(new UsuarioLogadoDTO(a.getIdAdmin(), a.getNmUsuarioAdmin(), "ADMIN"));
            }

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não encontrado");

        } catch (Exception e) {
            System.out.println("❌ Erro ao validar token: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido ou expirado");
        }
    }
}