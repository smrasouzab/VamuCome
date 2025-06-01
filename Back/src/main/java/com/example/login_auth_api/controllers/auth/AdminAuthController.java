package com.example.login_auth_api.controllers.auth;

import com.example.login_auth_api.domain.admin.Admin;
import com.example.login_auth_api.dto.request.login.AdminRequestLoginDTO;
import com.example.login_auth_api.dto.response.LoginResponseDTO;
import com.example.login_auth_api.service.auth.AdminAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth/admin")
@RequiredArgsConstructor
public class AdminAuthController {

    private final AdminAuthService adminAuthService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid AdminRequestLoginDTO dto) {
        System.out.println("🔐 [AdminLogin] Tentando login com: " + dto.nmUsuarioAdmin());

        String token = adminAuthService.login(dto);
        System.out.println("✅ Token gerado com sucesso para: " + dto.nmUsuarioAdmin());

        Admin admin = adminAuthService.loadByUsername(dto.nmUsuarioAdmin());
        System.out.println("👤 Admin carregado: " + admin.getNmUsuarioAdmin() + " (ID: " + admin.getIdAdmin() + ")");

        return ResponseEntity.ok(new LoginResponseDTO(admin.getIdAdmin(), admin.getNmUsuarioAdmin(), token, "ADMIN"));
    }
}
