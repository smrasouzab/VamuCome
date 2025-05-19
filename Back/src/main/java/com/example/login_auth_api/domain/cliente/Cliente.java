package com.example.login_auth_api.domain.cliente;

import com.example.login_auth_api.domain.endereco.Endereco;
import com.example.login_auth_api.domain.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "tbcliente")
@Getter
@Setter
@PrimaryKeyJoinColumn(name = "idUsuario")
public class Cliente extends User {
    private String nuCPF;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "cliente_id")
    private List<Endereco> endereco;
}
