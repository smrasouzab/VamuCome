package com.example.login_auth_api.domain.avaliacao;

import com.example.login_auth_api.domain.cliente.Cliente;
import com.example.login_auth_api.domain.fornecedor.Fornecedor;
import com.example.login_auth_api.domain.pedido.Pedido;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tbavaliacao")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Avaliacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idAvaliacao;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer qtNota;

    @NotBlank
    @Column(length = 500)
    private String dsComentario;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "fornecedor_id")
    private Fornecedor fornecedor;

    @OneToOne
    @JoinColumn(name = "pedido_id", unique = true) // um pedido só pode ter 1 avaliação
    private Pedido pedido;
}
