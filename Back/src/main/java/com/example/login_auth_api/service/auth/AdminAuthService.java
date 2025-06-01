package com.example.login_auth_api.service.auth;

import com.example.login_auth_api.domain.admin.Admin;
import com.example.login_auth_api.domain.cliente.Cliente;
import com.example.login_auth_api.dto.request.login.AdminRequestLoginDTO;
import com.example.login_auth_api.repositories.AdminRepository;
import com.example.login_auth_api.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AdminAuthService implements UserDetailsService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("🔍 [AuthService] Buscando admin por username: " + username);

        Admin admin = adminRepository.findByNmUsuarioAdmin(username)
                .orElseThrow(() -> {
                    System.out.println("❌ [AuthService] Admin não encontrado: " + username);
                    return new UsernameNotFoundException("Admin não encontrado");
                });

        System.out.println("✅ [AuthService] Admin encontrado: " + admin.getNmUsuarioAdmin());
        return admin;
    }

    public Admin loadByUsername(String username) {
        System.out.println("🔍 [loadByUsername] Carregando admin por username: " + username);
        return adminRepository.findByNmUsuarioAdmin(username)
                .orElseThrow(() -> new UsernameNotFoundException("Admin não encontrado"));
    }

    public String login(AdminRequestLoginDTO dto) {
        System.out.println("➡️ [Login] Iniciando login para: " + dto.nmUsuarioAdmin());

        Admin admin = adminRepository.findByNmUsuarioAdmin(dto.nmUsuarioAdmin())
                .orElseThrow(() -> {
                    System.out.println("❌ [Login] Username não encontrado: " + dto.nmUsuarioAdmin());
                    return new UsernameNotFoundException("Admin não encontrado");
                });

        System.out.println("🔐 [Login] Verificando senha...");
        if (!passwordEncoder.matches(dto.dsSenhaAdmin(), admin.getPassword())) {
            System.out.println("❌ [Login] Senha incorreta para: " + dto.nmUsuarioAdmin());
            throw new BadCredentialsException("Senha incorreta");
        }

        System.out.println("✅ [Login] Autenticação bem-sucedida para: " + dto.nmUsuarioAdmin());
        return tokenService.generateToken(admin);
    }
}