package com.example.login_auth_api.service.auth;

import com.example.login_auth_api.domain.cliente.Cliente;
import com.example.login_auth_api.domain.historico.HistoricoAcesso;
import com.example.login_auth_api.domain.historico.PerfilUsuario;
import com.example.login_auth_api.dto.request.login.ClienteRequestLoginDTO;
import com.example.login_auth_api.dto.request.register.ClienteRequestRegisterDTO;
import com.example.login_auth_api.dto.response.ClienteResponseDTO;
import com.example.login_auth_api.repositories.ClienteRepository;
import com.example.login_auth_api.repositories.HistoricoAcessoRepository;
import com.example.login_auth_api.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class ClienteAuthService implements UserDetailsService {

    private final ClienteRepository clienteRepository;
    private final HistoricoAcessoRepository historicoAcessoRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("🔍 [AuthService] Buscando cliente por e-mail: " + email);

        Cliente cliente = clienteRepository.findByDsEmailCliente(email)
                .orElseThrow(() -> {
                    System.out.println("❌ [AuthService] Cliente não encontrado: " + email);
                    return new UsernameNotFoundException("Cliente não encontrado");
                });

        System.out.println("✅ [AuthService] Cliente encontrado: " + cliente.getDsEmailCliente());
        return cliente;
    }

    public String login(ClienteRequestLoginDTO dto) {
        System.out.println("➡️ [Login] Iniciando login para: " + dto.dsEmailCliente());

        Cliente cliente = clienteRepository.findByDsEmailCliente(dto.dsEmailCliente())
                .orElseThrow(() -> {
                    System.out.println("❌ [Login] Email não encontrado: " + dto.dsEmailCliente());
                    return new UsernameNotFoundException("Cliente não encontrado");
                });

        System.out.println("🔐 [Login] Verificando senha...");
        if (!passwordEncoder.matches(dto.dsSenhaCliente(), cliente.getPassword())) {
            System.out.println("❌ [Login] Senha incorreta para: " + dto.dsEmailCliente());
            throw new BadCredentialsException("Senha incorreta");
        }

        System.out.println("📔 [Login] Registrando acesso...");
        HistoricoAcesso historico = new HistoricoAcesso();
        historico.setIdUsuario(cliente.getIdCliente());
        historico.setNomeUsuario(cliente.getNmUsuarioCliente());
        historico.setRole(PerfilUsuario.CLIENTE);
        historico.setDataHoraAcesso(LocalDateTime.now());
        historicoAcessoRepository.save(historico);

        System.out.println("✅ [Login] Autenticação bem-sucedida para: " + dto.dsEmailCliente());
        return tokenService.generateToken(cliente);
    }

    public Cliente loadByEmail(String email) {
        System.out.println("🔍 [loadByEmail] Carregando cliente por e-mail: " + email);
        return clienteRepository.findByDsEmailCliente(email)
                .orElseThrow(() -> new UsernameNotFoundException("Cliente não encontrado"));
    }

    public ClienteResponseDTO register(ClienteRequestRegisterDTO dto) {
        System.out.println("➡️ [Register] Tentando registrar cliente: " + dto.dsEmailCliente());

        if (clienteRepository.findByDsEmailCliente(dto.dsEmailCliente()).isPresent()) {
            System.out.println("❌ [Register] Email já cadastrado: " + dto.dsEmailCliente());
            throw new RuntimeException("Email já cadastrado");
        }

        System.out.println("💾 [Register] Criando novo cliente...");
        Cliente cliente = new Cliente();
        cliente.setNmUsuarioCliente(dto.nmUsuarioCliente());
        cliente.setDsEmailCliente(dto.dsEmailCliente());
        cliente.setDsSenhaCliente(passwordEncoder.encode(dto.dsSenhaCliente()));
        cliente.setNuCPF(dto.nuCPF());
        cliente.setNuTelCliente(dto.nuTelCliente());
        cliente.setEndereco(dto.endereco());
        cliente.setDataCadastroCliente(LocalDateTime.now());

        clienteRepository.save(cliente);
        System.out.println("✅ [Register] Cliente salvo com sucesso: " + cliente.getDsEmailCliente());

        return new ClienteResponseDTO(cliente);
    }
}