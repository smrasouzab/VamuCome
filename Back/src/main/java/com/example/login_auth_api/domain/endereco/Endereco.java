package com.example.login_auth_api.domain.endereco;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "TBENDERECO")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Endereco {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idEndereco", nullable = false)
    private Integer idEndereco;
    private String dsLogradouro;
    private String nmNumero;
    private String dsComplemento;
    private Boolean endFavorito;
}
