/*
package com.example.login_auth_api.infra.security.config;

import com.example.login_auth_api.service.auth.ClienteAuthService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class ClienteAuthConfig {

    @Bean
    public DaoAuthenticationProvider clienteAuthProvider(ClienteAuthService clienteAuthService, PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(clienteAuthService);
        provider.setPasswordEncoder(passwordEncoder);
        return provider;
    }

    @Bean
    public AuthenticationManager clienteAuthenticationManager(DaoAuthenticationProvider clienteAuthProvider) {
        return new ProviderManager(clienteAuthProvider);
    }
}

 */