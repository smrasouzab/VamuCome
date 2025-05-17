package com.example.login_auth_api.service;

import com.example.login_auth_api.domain.fornecedor.Fornecedor;
import com.example.login_auth_api.domain.user.User;
import com.example.login_auth_api.dto.FornecedorRequestDTO;
import com.example.login_auth_api.repositories.FornecedorRepository;
import com.example.login_auth_api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
public class FornecedorService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FornecedorRepository fornecedorRepository;

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    @Transactional
    public Fornecedor criarFornecedor(FornecedorRequestDTO dto) {
        User user = userRepository.findById(dto.idUsuario())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com o id: " + dto.idUsuario()));

        if (fornecedorRepository.findByUsuarioFornecedor_Id(user.getIdUsuario()).isPresent()) {
            throw new IllegalStateException("Usuário já está vinculado a um fornecedor.");
        }
        Fornecedor fornecedor = new Fornecedor();
        fornecedor.setUsuarioFornecedor(user);
        fornecedor.setDsRazaoSocial(dto.dsRazaoSocial());
        LocalDateTime horario = LocalDateTime.parse(dto.dtHorarioFunc(), FORMATTER);
        fornecedor.setDtHorarioFunc(horario);

        return fornecedorRepository.save(fornecedor);
    }
}
