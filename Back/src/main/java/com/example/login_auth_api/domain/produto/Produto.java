package com.example.login_auth_api.domain.produto;

import com.example.login_auth_api.domain.fornecedor.Fornecedor;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "tbproduto")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="idProduto")
    private Integer idProduto;
    private String nmProduto;
    private BigDecimal vlProduto;
    private String dsProduto;
    private String urlFotoProduto;

    @ManyToOne
    @JoinColumn(name = "idFornecedor")
    @JsonIgnore
    private Fornecedor fornecedor;
}
