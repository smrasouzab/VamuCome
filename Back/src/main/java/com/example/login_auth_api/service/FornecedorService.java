package com.example.login_auth_api.service;

import com.example.login_auth_api.domain.cliente.Cliente;
import com.example.login_auth_api.domain.endereco.Endereco;
import com.example.login_auth_api.domain.fornecedor.Fornecedor;
import com.example.login_auth_api.dto.request.EnderecoRequestDTO;
import com.example.login_auth_api.dto.response.FornecedorResponseDTO;
import com.example.login_auth_api.repositories.FornecedorRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

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

    public FornecedorResponseDTO listarFornecedorPorId(Integer id) {
        Fornecedor fornecedor = fornecedorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Fornecedor não encontrado"));
        return new FornecedorResponseDTO(fornecedor);
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
                .orElseThrow(() -> new UsernameNotFoundException("Cliente não encontrado"));

        return fornecedor.getEndereco();
    }
}