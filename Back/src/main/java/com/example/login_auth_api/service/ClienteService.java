package com.example.login_auth_api.service;

import com.example.login_auth_api.domain.cliente.Cliente;
import com.example.login_auth_api.domain.user.User;
import com.example.login_auth_api.domain.user.UserRole;
import com.example.login_auth_api.dto.ClienteRegisterDTO;
import com.example.login_auth_api.repositories.ClienteRepository;
import com.example.login_auth_api.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private UserRepository userRepository;

    public List<User> listarTodosClientes() {
        return userRepository.findAllByEnRole(UserRole.CLIENTE);
    }

    public User listarClientePorId(Integer id) {
        return userRepository.findByIdAndEnRole(id, UserRole.CLIENTE.name())
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado com id: " + id));
    }

    public Cliente registrarCliente(@RequestBody @Valid ClienteRegisterDTO dto) {
        if (this.userRepository.findByDsEmail(dto.dsEmail()) != null) {
            throw new IllegalArgumentException("Email já cadastrado.");
        }
        String encryptedPassword = new BCryptPasswordEncoder().encode(dto.dsSenha());

        Cliente novoCliente = new Cliente();
        novoCliente.setNmUsuario(dto.nmUsuario());
        novoCliente.setEnRole(dto.enRole());
        novoCliente.setDsEmail(dto.dsEmail());
        novoCliente.setNuCPF(dto.nuCPF());
        novoCliente.setEndereco(dto.dsEndereco());
        novoCliente.setDsSenha(encryptedPassword);

        return clienteRepository.save(novoCliente);
    }
}
