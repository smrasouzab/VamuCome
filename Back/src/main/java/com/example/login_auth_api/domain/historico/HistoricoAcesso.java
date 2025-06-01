package com.example.login_auth_api.domain.historico;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "tbhistorico")
@Getter
@Setter
@NoArgsConstructor
public class HistoricoAcesso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer idUsuario;

    private String nomeUsuario;

    @Enumerated(EnumType.STRING)
    private PerfilUsuario role;

    private LocalDateTime dataHoraAcesso;
}