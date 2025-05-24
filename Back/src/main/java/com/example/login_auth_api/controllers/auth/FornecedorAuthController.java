package com.example.login_auth_api.controllers.auth;

import com.example.login_auth_api.domain.fornecedor.Fornecedor;
import com.example.login_auth_api.dto.request.login.FornecedorRequestLoginDTO;
import com.example.login_auth_api.dto.request.register.FornecedorRequestRegisterDTO;
import com.example.login_auth_api.dto.response.LoginResponseDTO;
import com.example.login_auth_api.service.TokenService;
import com.example.login_auth_api.service.auth.FornecedorAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth/fornecedor")
@RequiredArgsConstructor
public class FornecedorAuthController {

    private final FornecedorAuthService fornecedorAuthService;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    /*
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid FornecedorRequestLoginDTO dto) {
        String token = fornecedorAuthService.login(dto);
        Fornecedor fornecedor = fornecedorAuthService.loadByEmail(dto.dsEmailFornecedor());

        return ResponseEntity.ok(new LoginResponseDTO(
                fornecedor.getIdFornecedor(),
                fornecedor.getNmUsuarioFornecedor(),
                token,
                "FORNECEDOR"
        ));
    }
     */

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid FornecedorRequestLoginDTO dto) {
        var credentials = new UsernamePasswordAuthenticationToken(dto.dsEmailFornecedor(), dto.dsSenhaFornecedor());
        var auth = authenticationManager.authenticate(credentials);
        Fornecedor fornecedor = (Fornecedor) auth.getPrincipal();

        String token = tokenService.generateToken(fornecedor);
        return ResponseEntity.ok(new LoginResponseDTO(
                fornecedor.getIdFornecedor(),
                fornecedor.getNmUsuarioFornecedor(),
                token,
                "FORNECEDOR"
        ));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid FornecedorRequestRegisterDTO dto) {
        fornecedorAuthService.register(dto);
        return ResponseEntity.ok().build();
    }
}