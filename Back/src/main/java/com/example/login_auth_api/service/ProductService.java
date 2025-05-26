package com.example.login_auth_api.service;

import com.example.login_auth_api.domain.fornecedor.Fornecedor;
import com.example.login_auth_api.domain.produto.Produto;
import com.example.login_auth_api.dto.request.ProductRequestDTO;
import com.example.login_auth_api.repositories.FornecedorRepository;
import com.example.login_auth_api.repositories.ProdutoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private FornecedorRepository fornecedorRepository;

    @Transactional
    public Produto criarProduto(ProductRequestDTO dto) {
        Fornecedor fornecedor = fornecedorRepository.findById(dto.idFornecedor())
                .orElseThrow(() -> new RuntimeException("Fornecedor não encontrado com o ID: " + dto.idFornecedor()));

        Produto produto = new Produto();
        produto.setNmProduto(dto.nmProduto());
        produto.setVlProduto(dto.vlProduto());
        produto.setDsProduto(dto.dsProduto());
        produto.setFornecedor(fornecedor);

        return produtoRepository.save(produto);
    }
}
