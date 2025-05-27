package com.example.login_auth_api.infra.details;

import com.example.login_auth_api.domain.fornecedor.Fornecedor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class FornecedorUserDetails implements UserDetails {
    private final Fornecedor fornecedor;

    public FornecedorUserDetails(Fornecedor fornecedor) {
        this.fornecedor = fornecedor;
    }

    public Fornecedor getFornecedor() {
        return fornecedor;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_FORNECEDOR"));
    }

    @Override
    public String getPassword() {
        return fornecedor.getDsSenhaFornecedor();
    }

    @Override
    public String getUsername() {
        return fornecedor.getDsEmailFornecedor();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String toString() {
        return "FornecedorUserDetails{email=" + fornecedor.getDsEmailFornecedor() + '}';
    }
}