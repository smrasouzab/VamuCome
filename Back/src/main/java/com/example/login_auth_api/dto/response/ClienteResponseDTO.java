package com.example.login_auth_api.dto.response;

import com.example.login_auth_api.domain.cliente.Cliente;
import com.example.login_auth_api.domain.endereco.Endereco;
import java.util.List;

public record ClienteResponseDTO(
        Integer idCliente,
        String nmUsuarioCliente,
        String dsEmailCliente,
        String nuCPF,
        List<Endereco> endereco
) {
    public ClienteResponseDTO(Cliente cliente) {
        this(
                cliente.getIdCliente(),
                cliente.getNmUsuarioCliente(),
                cliente.getDsEmailCliente(),
                cliente.getNuCPF(),
                cliente.getEndereco()
        );
    }
}
