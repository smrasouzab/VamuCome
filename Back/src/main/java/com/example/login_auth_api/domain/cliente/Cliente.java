package com.example.login_auth_api.domain.cliente;

import com.example.login_auth_api.domain.endereco.Endereco;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "tbcliente", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"idCliente"})})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cliente implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idCliente", nullable = false)
    private Integer idCliente;

    @Column(unique = true, nullable = false)
    private String dsEmailCliente;

    @Column(nullable = false)
    private LocalDateTime dataCadastroCliente;

    private String nmUsuarioCliente;
    private String dsSenhaCliente;
    private String nuCPF;

    @Column(name = "nu_tel_cliente")
    private String nuTelCliente;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "idCliente")
    private List<Endereco> endereco;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_CLIENTE"));
    }

    @Override public String getPassword() { return dsSenhaCliente; }
    @Override public String getUsername() { return dsEmailCliente; }
    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }
}