package com.example.login_auth_api.controllers.auth;

import com.example.login_auth_api.domain.fornecedor.Fornecedor;
import com.example.login_auth_api.dto.request.login.FornecedorRequestLoginDTO;
import com.example.login_auth_api.dto.request.register.FornecedorRequestRegisterDTO;
import com.example.login_auth_api.dto.response.FornecedorResponseDTO;
import com.example.login_auth_api.dto.response.LoginResponseDTO;
import com.example.login_auth_api.service.auth.FornecedorAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth/fornecedor")
@RequiredArgsConstructor
public class FornecedorAuthController {

    private final FornecedorAuthService fornecedorAuthService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid FornecedorRequestLoginDTO dto) {
        System.out.println("➡️ [POST] /auth/fornecedor/login chamado com email: " + dto.dsEmailFornecedor());

        String token = fornecedorAuthService.login(dto);
        System.out.println("✅ Token gerado com sucesso para: " + dto.dsEmailFornecedor());

        Fornecedor fornecedor = fornecedorAuthService.loadByEmail(dto.dsEmailFornecedor());
        System.out.println("👤 Fornecedor carregado: " + fornecedor.getNmUsuarioFornecedor() + " (ID: " + fornecedor.getIdFornecedor() + ")");

        return ResponseEntity.ok(new LoginResponseDTO(fornecedor.getIdFornecedor(), fornecedor.getNmUsuarioFornecedor(), token, "FORNECEDOR"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid FornecedorRequestRegisterDTO dto) {
        System.out.println("➡️ [POST] /auth/fornecedor/register chamado com email: " + dto.dsEmailFornecedor());

        try {
            FornecedorResponseDTO fornecedorCriado = fornecedorAuthService.register(dto);
            System.out.println("✅ Fornecedor registrado com sucesso: " + fornecedorCriado.nmUsuarioFornecedor());
            return ResponseEntity.status(HttpStatus.CREATED).body(fornecedorCriado); // HTTP 201 + corpo
        } catch (IllegalArgumentException e) {
            System.out.println("❌ Erro ao registrar fornecedor: " + e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage()); // HTTP 400 + mensagem de erro
        }
    }
}