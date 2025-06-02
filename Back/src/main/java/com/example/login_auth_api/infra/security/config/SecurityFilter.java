package com.example.login_auth_api.infra.security.config;

import com.example.login_auth_api.service.TokenService;
import com.example.login_auth_api.service.auth.AdminAuthService;
import com.example.login_auth_api.service.auth.ClienteAuthService;
import com.example.login_auth_api.service.auth.FornecedorAuthService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
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

    @Lazy
    private final ClienteAuthService clienteAuthService;

    @Lazy
    private final FornecedorAuthService fornecedorAuthService;

    @Lazy
    private final AdminAuthService adminAuthService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String uri = request.getRequestURI();
        System.out.println("➡️ [SecurityFilter] Requisição recebida: " + uri);

        if (uri.startsWith("/auth/")
                || uri.startsWith("/fornecedor/listar-todos")
                || uri.startsWith("/fornecedor/produto/geral")
                || uri.startsWith("/fornecedor/produto/todos-por-fornecedor/{idFornecedor}")
                || uri.startsWith("/fornecedor/{id}")
                || uri.startsWith("/fornecedor/buscar-por-cnpj/{cnpj}")
                || uri.startsWith("/fornecedor/buscar-por-razao/{razao}")
        ) {
            System.out.println("🟡 [SecurityFilter] Rota pública ignorada: " + uri);
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String token = recoverToken(request);
            System.out.println("🔐 [SecurityFilter] Token recebido: " + (token != null ? token : "NULO"));

            if (token != null) {
                String email = tokenService.verifyToken(token);
                System.out.println("🔍 [SecurityFilter] Email extraído do token: " + email);

                if (email != null && !email.isBlank()) {
                    UserDetails user;

                    if (uri.startsWith("/cliente/")) {
                        System.out.println("👤 [SecurityFilter] Autenticando cliente: " + email);
                        user = clienteAuthService.loadUserByUsername(email);
                    } else if (uri.startsWith("/fornecedor/")) {
                        System.out.println("👤 [SecurityFilter] Autenticando fornecedor: " + email);
                        user = fornecedorAuthService.loadUserByUsername(email);
                    } else if (uri.startsWith("/admin/")) {
                        user = adminAuthService.loadByUsername(email); //na verdade username
                        System.out.println("👤 [SecurityFilter] Autenticando admin: " + email);
                    } else {
                        System.out.println("❌ [SecurityFilter] Rota não reconhecida: " + uri);
                        throw new RuntimeException("Tipo de usuário não identificado para rota: " + uri);
                    }

                    var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    System.out.println("✅ [SecurityFilter] Usuário autenticado e contexto de segurança definido.");
                }
            }
        } catch (Exception e) {
            System.out.println("❌ [SecurityFilter] Falha na autenticação via token: " + e.getMessage());
        }

        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request){
        var authHeader = request.getHeader("Authorization");
        if(authHeader == null) return null;
        return authHeader.replace("Bearer ", "");
    }
}