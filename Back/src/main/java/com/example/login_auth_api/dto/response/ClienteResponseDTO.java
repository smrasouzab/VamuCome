package com.example.login_auth_api.dto.response;

import com.example.login_auth_api.domain.cliente.Cliente;
import com.example.login_auth_api.domain.endereco.Endereco;

import java.time.LocalDateTime;
import java.util.List;

public record ClienteResponseDTO(
        Integer idCliente,
        LocalDateTime dataCadastroCliente,
        String nmUsuarioCliente,
        String dsEmailCliente,
        String nuCPF,
        String nuTelCliente,
        List<Endereco> endereco
) {
    public ClienteResponseDTO(Cliente cliente) {
        this(
                cliente.getIdCliente(),
                cliente.getDataCadastroCliente(),
                cliente.getNmUsuarioCliente(),
                cliente.getDsEmailCliente(),
                cliente.getNuCPF(),
                cliente.getNuTelCliente(),
                cliente.getEndereco()
        );
    }
}
