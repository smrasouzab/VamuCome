package com.example.login_auth_api.service;

import com.example.login_auth_api.domain.cliente.Cliente;
import com.example.login_auth_api.dto.response.ClienteResponseDTO;
import com.example.login_auth_api.repositories.ClienteRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public List<ClienteResponseDTO> listarTodosClientes() {
        return clienteRepository.findAll()
                .stream()
                .map(ClienteResponseDTO::new)
                .toList();
    }

    public ClienteResponseDTO listarClientePorId(Integer id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado"));
        return new ClienteResponseDTO(cliente);
    }
}