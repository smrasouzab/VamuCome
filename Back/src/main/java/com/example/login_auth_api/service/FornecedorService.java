package com.example.login_auth_api.service;

import com.example.login_auth_api.domain.fornecedor.Fornecedor;
import com.example.login_auth_api.dto.response.FornecedorResponseDTO;
import com.example.login_auth_api.repositories.FornecedorRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
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
}