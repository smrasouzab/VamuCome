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
@Table(name = "tbavaliacao",uniqueConstraints = {
        @UniqueConstraint(columnNames = {"pedido_id", "id_avaliacao","cliente_id","fornecedor_id"})})
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Avaliacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idAvaliacao", nullable = false)
    private Integer idAvaliacao;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer qtNota;

    @NotBlank
    @Column(length = 500)
    private String dsComentario;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "fornecedor_id", nullable = false)
    private Fornecedor fornecedor;

    @OneToOne
    @JoinColumn(name = "pedido_id", unique = true, nullable = false) // um pedido só pode ter 1 avaliação
    private Pedido pedido;
}
