package com.example.login_auth_api.service;

import com.example.login_auth_api.domain.endereco.Endereco;
import com.example.login_auth_api.domain.fornecedor.Fornecedor;
import com.example.login_auth_api.dto.request.EnderecoRequestDTO;
import com.example.login_auth_api.dto.request.FornecedorUpdateRequestDTO;
import com.example.login_auth_api.dto.request.RecSenhaFornecedorRequestDTO;
import com.example.login_auth_api.dto.response.FornecedorResponseDTO;
import com.example.login_auth_api.repositories.EnderecoRepository;
import com.example.login_auth_api.repositories.FornecedorRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FornecedorService {

    private final FornecedorRepository fornecedorRepository;
    private final EnderecoRepository enderecoRepository;
    private final PasswordEncoder passwordEncoder;

    public List<FornecedorResponseDTO> listarTodosFornecedores() {
        return fornecedorRepository.findAll()
                .stream()
                .map(FornecedorResponseDTO::new)
                .toList();
    }

    public FornecedorResponseDTO listarFornecedorPorId(Integer id) {
        Fornecedor fornecedor = fornecedorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Fornecedor não encontrado"));
        return new FornecedorResponseDTO(fornecedor);
    }

    public FornecedorResponseDTO buscarPorCnpj(String cnpj) {
        Fornecedor fornecedor = fornecedorRepository.findByNuCNPJ(cnpj)
                .orElseThrow(() -> new EntityNotFoundException("Fornecedor não encontrado"));
        return new FornecedorResponseDTO(fornecedor);
    }

    public FornecedorResponseDTO buscarPorRazaoSocial(String razao) {
        Fornecedor fornecedor = fornecedorRepository.findByDsRazaoSocial(razao)
                .orElseThrow(() -> new EntityNotFoundException("Fornecedor não encontrado"));
        return new FornecedorResponseDTO(fornecedor);
    }

    public FornecedorResponseDTO atualizarFornecedor(Integer id, FornecedorUpdateRequestDTO dto) {
        Fornecedor fornecedor = fornecedorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Fornecedor não encontrado"));

        fornecedor.setNmUsuarioFornecedor(dto.nmUsuarioFornecedor());
        fornecedor.setDtHorarioAbertura(dto.dtHorarioAbertura());
        fornecedor.setDtHorarioFechamento(dto.dtHorarioFechamento());
        fornecedor.setVlMinimoCompra(dto.vlMinimoCompra());

        fornecedorRepository.save(fornecedor);
        return new FornecedorResponseDTO(fornecedor);
    }

    public void alterarSenhaFornecedor(Integer id, RecSenhaFornecedorRequestDTO dto) {
        Fornecedor fornecedor = fornecedorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Fornecedor não encontrado"));

        if (!passwordEncoder.matches(dto.dsSenhaFornecedor(), fornecedor.getPassword())) {
            throw new IllegalArgumentException("Senha atual incorreta");
        }

        fornecedor.setDsSenhaFornecedor(passwordEncoder.encode(dto.novaSenha()));

        fornecedorRepository.save(fornecedor);
    }

    @Transactional
    public void cadastrarEndereco(String email, EnderecoRequestDTO dto) {
        Fornecedor fornecedor = fornecedorRepository.findByDsEmailFornecedor(email)
                .orElseThrow(() -> new UsernameNotFoundException("Fornecedor não encontrado"));

        if (fornecedor.getEndereco() != null) {
            throw new IllegalStateException("Fornecedor já possui um endereço.");
        }

        Endereco endereco = new Endereco();
        BeanUtils.copyProperties(dto, endereco);

        fornecedor.setEndereco(endereco);
        fornecedorRepository.save(fornecedor);
    }

    public Endereco mostrarEnderecoFornecedor() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        Fornecedor fornecedor = fornecedorRepository.findByDsEmailFornecedor(email)
                .orElseThrow(() -> new UsernameNotFoundException("Fornecedor não encontrado"));

        return fornecedor.getEndereco();
    }

    @Transactional
    public void atualizarEnderecoDoFornecedor(Integer idEndereco, EnderecoRequestDTO dto, String email) {
        Fornecedor fornecedor = fornecedorRepository.findByDsEmailFornecedor(email)
                .orElseThrow(() -> new UsernameNotFoundException("Fornecedor não encontrado"));

        Endereco endereco = enderecoRepository.findById(idEndereco)
                .orElseThrow(() -> new EntityNotFoundException("Endereço não encontrado"));

        if (!fornecedor.getEndereco().equals(endereco)) {
            throw new AccessDeniedException("Você não tem permissão para alterar este endereço");
        }

        endereco.setDsLogradouro(dto.dsLogradouro());
        endereco.setDsComplemento(dto.dsComplemento());
        endereco.setNmNumero(dto.nmNumero());
        endereco.setEndFavorito(dto.endFavorito());

        enderecoRepository.save(endereco);
    }
}