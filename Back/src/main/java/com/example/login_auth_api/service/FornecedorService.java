package com.example.login_auth_api.service;

import com.example.login_auth_api.domain.fornecedor.Fornecedor;
import com.example.login_auth_api.repositories.FornecedorRepository;
import com.example.login_auth_api.dto.FornecedorRegisterDTO;
import com.example.login_auth_api.repositories.UserRepository;
import com.example.login_auth_api.domain.user.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FornecedorService {

}