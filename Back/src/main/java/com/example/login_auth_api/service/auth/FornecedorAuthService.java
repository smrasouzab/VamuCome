package com.example.login_auth_api.service.auth;

import com.example.login_auth_api.domain.fornecedor.Fornecedor;
import com.example.login_auth_api.dto.request.login.FornecedorRequestLoginDTO;
import com.example.login_auth_api.dto.request.register.FornecedorRequestRegisterDTO;
import com.example.login_auth_api.repositories.FornecedorRepository;
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
public class FornecedorAuthService implements UserDetailsService {

    private final FornecedorRepository fornecedorRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return fornecedorRepository.findByDsEmailFornecedor(email)
                .orElseThrow(() -> new UsernameNotFoundException("Fornecedor não encontrado"));
    }

    public String login(FornecedorRequestLoginDTO dto) {
        var authToken = new UsernamePasswordAuthenticationToken(dto.dsEmailFornecedor(), dto.dsSenhaFornecedor());
        authenticationManager.authenticate(authToken);

        Fornecedor fornecedor = fornecedorRepository.findByDsEmailFornecedor(dto.dsEmailFornecedor())
                .orElseThrow(() -> new RuntimeException("Fornecedor não encontrado"));

        return tokenService.generateToken(loadByEmail(dto.dsEmailFornecedor()));
    }

    public Fornecedor loadByEmail(String email) {
        return fornecedorRepository.findByDsEmailFornecedor(email)
                .orElseThrow(() -> new UsernameNotFoundException("Fornecedor não encontrado"));
    }

    public void register(FornecedorRequestRegisterDTO dto) {
        if (fornecedorRepository.findByDsEmailFornecedor(dto.dsEmailFornecedor()).isPresent()) {
            throw new RuntimeException("Email já cadastrado");
        }

        Fornecedor fornecedor = new Fornecedor();
        fornecedor.setNmUsuarioFornecedor(dto.nmUsuarioFornecedor());
        fornecedor.setDsEmailFornecedor(dto.dsEmailFornecedor());
        fornecedor.setDsSenhaFornecedor(passwordEncoder.encode(dto.dsSenhaFornecedor()));
        fornecedor.setDsRazaoSocial(dto.dsRazaoSocial());
        fornecedor.setNuCNPJ(dto.nuCNPJ());
        fornecedor.setDtHorarioAbertura(dto.dtHorarioAbertura());
        fornecedor.setDtHorarioFechamento(dto.dtHorarioFechamento());
        fornecedor.setVlMinimoCompra(dto.vlMinimoCompra());
        fornecedor.setEndereco(dto.endereco());

        fornecedorRepository.save(fornecedor);
    }
}