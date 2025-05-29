package com.example.login_auth_api.domain.pagamento;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

public enum TipoPagamento {
    PIX("Pix"),
    CARTAO_CREDITO("Cartão de Crédito"),
    CARTAO_DEBITO("Cartão de Débito"),
    DINHEIRO("Dinheiro"),
    TRANSFERENCIA("Transferência Bancária");

    @Getter
    private final String descricao;

    TipoPagamento(String descricao) {
        this.descricao = descricao;
    }

    @Override
    @JsonValue
    public String toString() {
        return descricao;
    }
}

