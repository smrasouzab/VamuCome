package com.example.login_auth_api.controllers;

import com.example.login_auth_api.domain.fornecedor.Fornecedor;
import com.example.login_auth_api.domain.produto.Produto;
import com.example.login_auth_api.domain.user.UserRole;
import com.example.login_auth_api.dto.FornecedorRegisterDTO;
import com.example.login_auth_api.dto.ProductRequestDTO;
import com.example.login_auth_api.repositories.FornecedorRepository;
import com.example.login_auth_api.repositories.UserRepository;
import com.example.login_auth_api.service.FornecedorService;
import com.example.login_auth_api.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/fornecedor")
public class FornecedorController {

    @Autowired
    private ProductService produtoService;

    @Autowired
    private FornecedorRepository fornecedorRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/criar-produtos")
    public ResponseEntity<Produto> criarProduto(@RequestBody @Valid ProductRequestDTO dto) {
        Produto novoProduto = produtoService.criarProduto(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoProduto);
    }

    @PostMapping("/register")
    public ResponseEntity<Fornecedor> registerFornecedor(@RequestBody @Valid FornecedorRegisterDTO dto) {
        if (this.userRepository.findByDsEmail(dto.dsEmail()) != null) return ResponseEntity.badRequest().build();
        String encryptedPassword = new BCryptPasswordEncoder().encode(dto.dsSenha());

        Fornecedor novoFornecedor = new Fornecedor();
        novoFornecedor.setNmUsuario(dto.nmUsuario());
        novoFornecedor.setDsEmail(dto.dsEmail());
        novoFornecedor.setDsSenha(encryptedPassword);
        novoFornecedor.setEndereco(dto.dsEndereco());
        novoFornecedor.setEnRole(UserRole.FORNECEDOR);

        // Adicionar os dados específicos do fornecedor
        novoFornecedor.setDsRazaoSocial(dto.dsRazaoSocial());
        novoFornecedor.setDtHorarioAbertura(dto.dtHorarioAbertura());
        novoFornecedor.setDtHorarioFechamento(dto.dtHorarioFechamento());
        novoFornecedor.setVlMinimoCompra(dto.vlMinimoCompra());
        novoFornecedor.setNuCNPJ(dto.nuCNPJ());

        fornecedorRepository.save(novoFornecedor);

        return ResponseEntity.ok().build();
    }
}
