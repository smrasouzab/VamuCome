package com.example.login_auth_api.infra.security.config;

import com.example.login_auth_api.service.auth.FornecedorAuthService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class FornecedorAuthConfig {

    @Bean
    public DaoAuthenticationProvider fornecedorAuthProvider(FornecedorAuthService fornecedorAuthService, PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(fornecedorAuthService);
        provider.setPasswordEncoder(passwordEncoder);
        return provider;
    }

    @Bean
    public AuthenticationManager fornecedorAuthenticationManager(DaoAuthenticationProvider fornecedorAuthProvider) {
        return new ProviderManager(fornecedorAuthProvider);
    }
}