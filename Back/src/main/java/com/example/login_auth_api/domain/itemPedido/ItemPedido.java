package com.example.login_auth_api.domain.itemPedido;

import com.example.login_auth_api.domain.pedido.Pedido;
import com.example.login_auth_api.domain.produto.Produto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "tbitempedido",uniqueConstraints = {
        @UniqueConstraint(columnNames = {"idPedido", "idItemPedido"})})
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ItemPedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="idItemPedido")
    private Integer idItemPedido;
    private Integer qtItem;
    private BigDecimal vlItem;
    private BigDecimal vlTotalItemPedido;
    private String dsObservacaoItem;

    @ManyToOne
    @JoinColumn(name = "idProduto", nullable = false)
    private Produto produto;

    @ManyToOne
    @JoinColumn(name = "idPedido")
    private Pedido pedido;

    public void calcularTotalItemPedido() {
        if (vlItem != null && qtItem != null) {
            this.vlTotalItemPedido = vlItem.multiply(BigDecimal.valueOf(qtItem));
        }
    }
}
