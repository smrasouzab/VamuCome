package com.example.login_auth_api.infra.config;

import com.example.login_auth_api.domain.admin.Admin;
import com.example.login_auth_api.repositories.AdminRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class AdminInitializer {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.default.password}")
    private String defaultPassword;

    @PostConstruct
    public void createDefaultAdminIfNotExists() {
        String defaultUser = "vc-admin";

        boolean adminExiste = adminRepository.findByNmUsuarioAdmin(defaultUser).isPresent();
        if (!adminExiste) {
            Admin admin = new Admin();
            admin.setNmUsuarioAdmin(defaultUser);
            admin.setDsSenhaAdmin(passwordEncoder.encode(defaultPassword));
            admin.setDataCadastroAdmin(LocalDateTime.now());
            adminRepository.save(admin);
            System.out.println("✅ Admin padrão criado com sucesso");
        } else {
            System.out.println("ℹ️ Admin já existe, não será recriado");
        }
    }
}