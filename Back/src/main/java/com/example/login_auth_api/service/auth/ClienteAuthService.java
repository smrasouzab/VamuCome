package com.example.login_auth_api.service.auth;

import com.example.login_auth_api.domain.cliente.Cliente;
import com.example.login_auth_api.dto.request.login.ClienteRequestLoginDTO;
import com.example.login_auth_api.dto.request.register.ClienteRequestRegisterDTO;
import com.example.login_auth_api.repositories.ClienteRepository;
import com.example.login_auth_api.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ClienteAuthService implements UserDetailsService {

    private final ClienteRepository clienteRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return clienteRepository.findByDsEmailCliente(email)
                .orElseThrow(() -> new UsernameNotFoundException("Cliente não encontrado"));
    }

    public String login(ClienteRequestLoginDTO dto) {
        var authToken = new UsernamePasswordAuthenticationToken(dto.dsEmailCliente(), dto.dsSenhaCliente());
        authenticationManager.authenticate(authToken);

        Cliente cliente = clienteRepository.findByDsEmailCliente(dto.dsEmailCliente())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        return tokenService.generateToken(loadByEmail(dto.dsEmailCliente()));
    }

    public Cliente loadByEmail(String email) {
        return clienteRepository.findByDsEmailCliente(email)
                .orElseThrow(() -> new UsernameNotFoundException("Cliente não encontrado"));
    }

    public void register(ClienteRequestRegisterDTO dto) {
        if (clienteRepository.findByDsEmailCliente(dto.dsEmailCliente()).isPresent()) {
            throw new RuntimeException("Email já cadastrado");
        }

        Cliente cliente = new Cliente();
        cliente.setNmUsuarioCliente(dto.nmUsuarioCliente());
        cliente.setDsEmailCliente(dto.dsEmailCliente());
        cliente.setDsSenhaCliente(passwordEncoder.encode(dto.dsSenhaCliente()));
        cliente.setNuCPF(dto.nuCPF());
        cliente.setEndereco(dto.endereco());

        clienteRepository.save(cliente);
    }
}