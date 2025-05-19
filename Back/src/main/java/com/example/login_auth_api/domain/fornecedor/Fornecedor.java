package com.example.login_auth_api.domain.fornecedor;

import com.example.login_auth_api.domain.endereco.Endereco;
import com.example.login_auth_api.domain.produto.Produto;
import com.example.login_auth_api.domain.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

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
