package com.example.login_auth_api.controllers;

import com.example.login_auth_api.dto.request.CepRequestDTO;
import com.example.login_auth_api.dto.response.EnderecoPorCepResponseDTO;
import com.example.login_auth_api.service.CepService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/cliente/endereco")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EnderecoController {

    private final CepService cepService;

    @PostMapping("/buscar")
    public ResponseEntity<?> buscarEndereco(@RequestBody @Valid CepRequestDTO cepRequest) {
        try {
            EnderecoPorCepResponseDTO endereco = cepService.getEnderecoPorCep(cepRequest.nuCodigoPostal());

            if (endereco == null || endereco.cep() == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("CEP não encontrado");
            }

            return ResponseEntity.ok(endereco); // Retorna 200 com o endereço
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro interno ao buscar o CEP");
        }
    }
}
