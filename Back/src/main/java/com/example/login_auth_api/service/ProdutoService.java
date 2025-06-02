package com.example.login_auth_api.service;

import com.example.login_auth_api.domain.admin.Admin;
import com.example.login_auth_api.domain.cliente.Cliente;
import com.example.login_auth_api.domain.endereco.Endereco;
import com.example.login_auth_api.domain.fornecedor.Fornecedor;
import com.example.login_auth_api.domain.produto.Produto;
import com.example.login_auth_api.dto.request.EnderecoRequestDTO;
import com.example.login_auth_api.dto.request.ProdutoRequestDTO;
import com.example.login_auth_api.dto.response.ProdutoResponseDTO;
import com.example.login_auth_api.repositories.AdminRepository;
import com.example.login_auth_api.repositories.FornecedorRepository;
import com.example.login_auth_api.repositories.ProdutoRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProdutoService {

    private final ProdutoRepository produtoRepository;
    private final FornecedorRepository fornecedorRepository;
    private final AdminRepository adminRepository;

    @Transactional
    public ProdutoResponseDTO criarProduto(ProdutoRequestDTO dto, String email) {
        Fornecedor fornecedor = fornecedorRepository.findByDsEmailFornecedor(email)
                .orElseThrow(() -> new RuntimeException("Fornecedor não encontrado"));

        Produto produto = new Produto();
        BeanUtils.copyProperties(dto, produto);
        produto.setFornecedor(fornecedor);

        return new ProdutoResponseDTO(produtoRepository.save(produto));
    }

    public List<ProdutoResponseDTO> listarTodosProdutos() {
        return produtoRepository.findAll().stream()
                .map(ProdutoResponseDTO::new)
                .toList();
    }

    public List<ProdutoResponseDTO> listarProdutosDoFornecedor(Integer idFornecedor) {
        Fornecedor fornecedor = fornecedorRepository.findById(idFornecedor)
                .orElseThrow(() -> new EntityNotFoundException("Fornecedor não encontrado"));

        return produtoRepository.findByFornecedor(fornecedor)
                .stream()
                .map(ProdutoResponseDTO::new)
                .toList();
    }

    @Transactional
    public ProdutoResponseDTO atualizarProduto(Integer idProduto, ProdutoRequestDTO dto, String email) {
        Fornecedor fornecedor = fornecedorRepository.findByDsEmailFornecedor(email)
                .orElseThrow(() -> new UsernameNotFoundException("Fornecedor não encontrado"));

        Produto produto = produtoRepository.findById(idProduto)
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado"));

        if (!fornecedor.getProduto().contains(produto)) {
            throw new AccessDeniedException("Você não tem permissão para alterar este produto");
        }

        produto.setNmProduto(dto.nmProduto());
        produto.setDsProduto(dto.dsProduto());
        produto.setVlProduto(dto.vlProduto());

        return new ProdutoResponseDTO(produtoRepository.save(produto));
    }

    @Transactional
    public ProdutoResponseDTO criarProdutoAdmin(ProdutoRequestDTO dto) {
        Fornecedor fornecedor = fornecedorRepository.findById(dto.idFornecedor())
                .orElseThrow(() -> new RuntimeException("Fornecedor não encontrado"));

        Produto produto = new Produto();
        BeanUtils.copyProperties(dto, produto);
        produto.setFornecedor(fornecedor);

        return new ProdutoResponseDTO(produtoRepository.save(produto));
    }
}
