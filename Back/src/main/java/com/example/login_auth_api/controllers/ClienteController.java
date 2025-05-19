package com.example.login_auth_api.controllers;

import com.example.login_auth_api.domain.cliente.Cliente;
import com.example.login_auth_api.domain.user.User;
import com.example.login_auth_api.dto.ClienteRegisterDTO;
import com.example.login_auth_api.repositories.ClienteRepository;
import com.example.login_auth_api.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    ClienteRepository clienteRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<String> getCliente(){
        return ResponseEntity.ok("Cliente!!");
    }

    @PostMapping("/register")
    public ResponseEntity<Cliente> registrarCliente(@RequestBody @Valid ClienteRegisterDTO dto) {
        if(this.userRepository.findByDsEmail(dto.dsEmail()) != null) return ResponseEntity.badRequest().build();
        String encryptedPassword = new BCryptPasswordEncoder().encode(dto.dsSenha());

        Cliente novoCliente = new Cliente();
        novoCliente.setNmUsuario(dto.nmUsuario());
        novoCliente.setEnRole(dto.enRole());
        novoCliente.setDsEmail(dto.dsEmail());
        novoCliente.setNuCPF(dto.nuCPF());
        novoCliente.setEndereco(dto.dsEndereco());
        novoCliente.setDsSenha(encryptedPassword);

        this.clienteRepository.save(novoCliente);

        return ResponseEntity.ok().build();
    }
}
