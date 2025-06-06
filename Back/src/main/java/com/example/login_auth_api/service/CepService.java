package com.example.login_auth_api.service;

import com.example.login_auth_api.dto.response.EnderecoPorCepResponseDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CepService {
    private final RestTemplate restTemplate = new RestTemplate();

    public EnderecoPorCepResponseDTO getEnderecoPorCep(String cep) {
        String url = "https://viacep.com.br/ws/" + cep + "/json/";
        return restTemplate.getForObject(url, EnderecoPorCepResponseDTO.class);
    }
}
