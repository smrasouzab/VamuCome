package com.example.login_auth_api.service.auth;

import com.example.login_auth_api.domain.cliente.Cliente;
import com.example.login_auth_api.infra.details.ClienteUserDetails;
import com.example.login_auth_api.repositories.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClienteUserDetailsService implements UserDetailsService {
    private final ClienteRepository clienteRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Cliente cliente = clienteRepository.findByDsEmailCliente(email)
                .orElseThrow(() -> new UsernameNotFoundException("Cliente não encontrado"));
        return new ClienteUserDetails(cliente);
    }
}
