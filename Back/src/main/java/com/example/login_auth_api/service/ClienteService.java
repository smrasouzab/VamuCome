package com.example.login_auth_api.service;

import com.example.login_auth_api.domain.cliente.Cliente;
import com.example.login_auth_api.dto.ClienteRegisterDTO;
import com.example.login_auth_api.dto.response.ClienteResponseDTO;
import com.example.login_auth_api.repositories.ClienteRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

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

    public ClienteResponseDTO registrarCliente(@RequestBody @Valid ClienteRegisterDTO dto) {
        if (this.clienteRepository.findByDsEmailCliente(dto.dsEmail()) != null) {
            throw new IllegalArgumentException("Email já cadastrado.");
        }
        String encryptedPassword = new BCryptPasswordEncoder().encode(dto.dsSenha());

        Cliente novoCliente = new Cliente();
        novoCliente.setNmUsuarioCliente(dto.nmUsuario());
        novoCliente.setDsEmailCliente(dto.dsEmail());
        novoCliente.setNuCPF(dto.nuCPF());
        novoCliente.setEndereco(dto.dsEndereco());
        novoCliente.setDsSenhaCliente(encryptedPassword);

        clienteRepository.save(novoCliente);
        return new ClienteResponseDTO(novoCliente);
    }
}
