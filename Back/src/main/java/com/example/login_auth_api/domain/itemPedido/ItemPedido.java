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
@Table(name = "tbitempedido")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ItemPedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idItemPedido;
    private Integer qtItem;
    private BigDecimal vlItem;
    private BigDecimal vlTotalItemPedido;

    @ManyToOne
    @JoinColumn(name = "produto_id")
    private Produto produto;

    @ManyToOne
    @JoinColumn(name = "pedido_id")
    private Pedido pedido;

    public void calcularTotalItemPedido() {
        if (vlItem != null && qtItem != null) {
            this.vlTotalItemPedido = vlItem.multiply(BigDecimal.valueOf(qtItem));
        }
    }
}
