package com.example.login_auth_api.service.auth;

import com.example.login_auth_api.domain.fornecedor.Fornecedor;
import com.example.login_auth_api.domain.historico.HistoricoAcesso;
import com.example.login_auth_api.domain.historico.PerfilUsuario;
import com.example.login_auth_api.dto.request.login.FornecedorRequestLoginDTO;
import com.example.login_auth_api.dto.request.register.FornecedorRequestRegisterDTO;
import com.example.login_auth_api.dto.response.FornecedorResponseDTO;
import com.example.login_auth_api.repositories.FornecedorRepository;
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
public class FornecedorAuthService implements UserDetailsService {

    private final FornecedorRepository fornecedorRepository;
    private final HistoricoAcessoRepository historicoAcessoRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("🔍 [AuthService] Buscando fornecedor por e-mail: " + email);

        Fornecedor fornecedor = fornecedorRepository.findByDsEmailFornecedor(email)
                .orElseThrow(() -> {
                    System.out.println("❌ [AuthService] Fornecedor não encontrado: " + email);
                    return new UsernameNotFoundException("Fornecedor não encontrado");
                });

        System.out.println("✅ [AuthService] Fornecedor encontrado: " + fornecedor.getDsEmailFornecedor());
        return fornecedor;
    }

    public String login(FornecedorRequestLoginDTO dto) {
        System.out.println("➡️ [Login] Iniciando login para: " + dto.dsEmailFornecedor());

        Fornecedor fornecedor = fornecedorRepository.findByDsEmailFornecedor(dto.dsEmailFornecedor())
                .orElseThrow(() -> {
                    System.out.println("❌ [Login] Email não encontrado: " + dto.dsEmailFornecedor());
                    return new UsernameNotFoundException("Fornecedor não encontrado");
                });

        System.out.println("🔐 [Login] Verificando senha...");
        if (!passwordEncoder.matches(dto.dsSenhaFornecedor(), fornecedor.getPassword())) {
            System.out.println("❌ [Login] Senha incorreta para: " + dto.dsEmailFornecedor());
            throw new BadCredentialsException("Senha incorreta");
        }

        System.out.println("📔 [Login] Registrando acesso...");
        HistoricoAcesso historico = new HistoricoAcesso();
        historico.setIdUsuario(fornecedor.getIdFornecedor());
        historico.setNmUsuario(fornecedor.getNmUsuarioFornecedor());
        historico.setRole(PerfilUsuario.FORNECEDOR);
        historico.setDtHoraAcesso(LocalDateTime.now());
        historicoAcessoRepository.save(historico);

        System.out.println("✅ [Login] Autenticação bem-sucedida para: " + dto.dsEmailFornecedor());
        return tokenService.generateToken(fornecedor);
    }

    public Fornecedor loadByEmail(String email) {
        System.out.println("🔍 [loadByEmail] Carregando fornecedor por e-mail: " + email);
        return fornecedorRepository.findByDsEmailFornecedor(email)
                .orElseThrow(() -> new UsernameNotFoundException("Fornecedor não encontrado"));
    }

    public FornecedorResponseDTO register(FornecedorRequestRegisterDTO dto) {
        System.out.println("➡️ [Register] Tentando registrar fornecedor: " + dto.dsEmailFornecedor());

        if (fornecedorRepository.findByDsEmailFornecedor(dto.dsEmailFornecedor()).isPresent()) {
            System.out.println("❌ [Register] Email já cadastrado: " + dto.dsEmailFornecedor());
            throw new RuntimeException("Email já cadastrado");
        }

        System.out.println("💾 [Register] Criando novo fornecedor...");
        Fornecedor fornecedor = new Fornecedor();
        fornecedor.setNmUsuarioFornecedor(dto.nmUsuarioFornecedor());
        fornecedor.setDsEmailFornecedor(dto.dsEmailFornecedor());
        fornecedor.setDsSenhaFornecedor(passwordEncoder.encode(dto.dsSenhaFornecedor()));
        fornecedor.setDsRazaoSocial(dto.dsRazaoSocial());
        fornecedor.setNuCNPJ(dto.nuCNPJ());
        fornecedor.setDtHorarioAbertura(dto.dtHorarioAbertura());
        fornecedor.setDtHorarioFechamento(dto.dtHorarioFechamento());
        fornecedor.setVlMinimoCompra(dto.vlMinimoCompra());
        fornecedor.setUrlFotoFornecedor(dto.urlFotoFornecedor());
        fornecedor.setEndereco(dto.endereco());
        fornecedor.setDataCadastroFornecedor(LocalDateTime.now());

        fornecedorRepository.save(fornecedor);
        System.out.println("✅ [Register] Fornecedor salvo com sucesso: " + fornecedor.getDsEmailFornecedor());

        return new FornecedorResponseDTO(fornecedor);
    }
}