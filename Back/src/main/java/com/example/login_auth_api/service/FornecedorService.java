package com.example.login_auth_api.service;

import com.example.login_auth_api.domain.fornecedor.Fornecedor;
import com.example.login_auth_api.dto.request.register.FornecedorRequestRegisterDTO;
import com.example.login_auth_api.dto.response.FornecedorResponseDTO;
import com.example.login_auth_api.repositories.FornecedorRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FornecedorService {

    private final FornecedorRepository fornecedorRepository;

    public List<FornecedorResponseDTO> listarTodosFornecedores() {
        return fornecedorRepository.findAll()
                .stream()
                .map(FornecedorResponseDTO::new)
                .toList();
    }

    public FornecedorResponseDTO buscarFornecedorPorId(Integer id) {
        Fornecedor fornecedor = fornecedorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Fornecedor não encontrado"));
        return new FornecedorResponseDTO(fornecedor);
    }

    public FornecedorResponseDTO registrarFornecedor(@RequestBody @Valid FornecedorRequestRegisterDTO dto) {
        if (fornecedorRepository.findByDsEmailFornecedor(dto.dsEmailFornecedor()).isPresent()) {
            throw new IllegalArgumentException("Email já cadastrado.");
        }

        Fornecedor novo = new Fornecedor();
        novo.setNmUsuarioFornecedor(dto.nmUsuarioFornecedor());
        novo.setDsEmailFornecedor(dto.dsEmailFornecedor());
        novo.setDsSenhaFornecedor(new BCryptPasswordEncoder().encode(dto.dsSenhaFornecedor()));
        novo.setDsRazaoSocial(dto.dsRazaoSocial());
        novo.setNuCNPJ(dto.nuCNPJ());
        novo.setDtHorarioAbertura(dto.dtHorarioAbertura());
        novo.setDtHorarioFechamento(dto.dtHorarioFechamento());
        novo.setVlMinimoCompra(dto.vlMinimoCompra());
        novo.setEndereco(dto.endereco());

        fornecedorRepository.save(novo);
        return new FornecedorResponseDTO(novo);
    }
}