package com.example.login_auth_api.domain.fornecedor;

import com.example.login_auth_api.domain.endereco.Endereco;
import com.example.login_auth_api.domain.produto.Produto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
/*
@Entity
@Table(name = "tbfornecedor")
@Getter
@Setter
@PrimaryKeyJoinColumn(name = "idUsuario")
public class Fornecedor extends User {

    private String nuCNPJ;
    private String dsRazaoSocial;
    private LocalDateTime dtHorarioAbertura;
    private LocalDateTime dtHorarioFechamento;
    private BigDecimal vlMinimoCompra;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "endereco_id")
    private Endereco endereco;

    @OneToMany(mappedBy = "fornecedor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Produto> produto;

}
*/
@Entity
@Table(name = "tbfornecedor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Fornecedor implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idFornecedor;

    @Column(unique = true, nullable = false)
    private String dsEmailFornecedor;

    private String nmUsuarioFornecedor;
    private String dsSenhaFornecedor;
    private String dsRazaoSocial;
    private String nuCNPJ;
    private LocalDateTime dtHorarioAbertura;
    private LocalDateTime dtHorarioFechamento;
    private BigDecimal vlMinimoCompra;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "idEndereco")
    private Endereco endereco;

    /*
    @OneToMany(mappedBy = "fornecedor")
    @JsonIgnore
    private List<Pedido> pedidos;

    Inserir se precisar listar todos os pedidos que estão em um fornecedor.
     */

    @OneToMany(mappedBy = "fornecedor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Produto> produto;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_FORNECEDOR"));
    }

    @Override public String getPassword() { return dsSenhaFornecedor; }
    @Override public String getUsername() { return dsEmailFornecedor; }
    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }
}
