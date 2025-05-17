package com.example.login_auth_api.service;

import com.example.login_auth_api.domain.fornecedor.Fornecedor;
import com.example.login_auth_api.dto.FornecedorResponseDTO;
import com.example.login_auth_api.repositories.FornecedorRepository;
import com.example.login_auth_api.dto.FornecedorRegisterDTO;
import com.example.login_auth_api.domain.user.User;
import com.example.login_auth_api.repositories.UserRepository;
import com.example.login_auth_api.domain.user.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

@Service
public class FornecedorService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FornecedorRepository fornecedorRepository;

    /**
     * Registra um fornecedor a partir de um usuário existente.
     *
     * @param dto DTO contendo as informações do fornecedor
     * @return Fornecedor criado
     */
    @Transactional
    public FornecedorResponseDTO registerFornecedor(FornecedorRegisterDTO dto) {
        // Buscar o usuário existente pelo ID
        User existingUser = userRepository.findById(dto.idUsuario())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Usuário não encontrado"));

        /* Verificar se o usuário já é um fornecedor
        if (existingUser.getEnRole() == UserRole.FORNECEDOR) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Usuário já é um fornecedor");
        }*/

        // Criar um novo fornecedor baseado no usuário existente
        Fornecedor fornecedor = new Fornecedor();

        // Copiar os dados do usuário para o fornecedor
        fornecedor.setIdUsuario(existingUser.getIdUsuario());
        fornecedor.setNmUsuario(existingUser.getNmUsuario());
        fornecedor.setDsEmail(existingUser.getDsEmail());
        fornecedor.setDsSenha(existingUser.getDsSenha());
        fornecedor.setNuCnpjCpf(existingUser.getNuCnpjCpf());
        fornecedor.setEndereco(existingUser.getEndereco());

        // Atualizar o papel do usuário para FORNECEDOR
        fornecedor.setEnRole(UserRole.FORNECEDOR);

        // Adicionar os dados específicos do fornecedor
        fornecedor.setDsRazaoSocial(dto.dsRazaoSocial());
        fornecedor.setDtHorarioFunc(LocalDateTime.now());

        // Salvar o fornecedor e excluir o usuário original
        userRepository.delete(existingUser);
        return FornecedorResponseDTO.fromEntity(fornecedorRepository.save(fornecedor));
    }
}