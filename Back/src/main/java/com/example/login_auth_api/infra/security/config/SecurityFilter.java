package com.example.login_auth_api.infra.security.config;

import com.example.login_auth_api.service.TokenService;
import com.example.login_auth_api.service.auth.ClienteAuthService;
import com.example.login_auth_api.service.auth.FornecedorAuthService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
@Component
public class SecurityFilter extends OncePerRequestFilter {
    private final TokenService tokenService;
    private final ClienteAuthService clienteAuthService;
    private final FornecedorAuthService fornecedorAuthService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String uri = request.getRequestURI();

        if (uri.startsWith("/auth/")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String token = recoverToken(request);
            if (token != null) {
                String email = tokenService.verifyToken(token);
                if (email != null && !email.isBlank()) {
                    // 🔍 Decide com base na URI
                    UserDetails user;
                    if (uri.startsWith("/cliente/")) {
                        user = clienteAuthService.loadUserByUsername(email);
                    } else if (uri.startsWith("/fornecedor/")) {
                        user = fornecedorAuthService.loadUserByUsername(email);
                    } else {
                        throw new RuntimeException("Tipo de usuário não identificado para rota: " + uri);
                    }

                    var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        } catch (Exception e) {
            System.out.println("Falha na autenticação via token: " + e.getMessage());
        }
        filterChain.doFilter(request, response);
    }
    private String recoverToken(HttpServletRequest request){
        var authHeader = request.getHeader("Authorization");
        if(authHeader == null) return null;
        return authHeader.replace("Bearer ", "");
    }
}