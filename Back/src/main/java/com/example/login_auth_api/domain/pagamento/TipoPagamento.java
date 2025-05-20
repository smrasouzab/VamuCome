package com.example.login_auth_api.domain.pagamento;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tbtipopagamento")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TipoPagamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idTipoPagamento;
    private String dsTipoPagamento;
}
