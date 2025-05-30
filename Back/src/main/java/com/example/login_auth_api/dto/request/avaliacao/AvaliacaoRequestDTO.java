package com.example.login_auth_api.dto.request.avaliacao;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AvaliacaoRequestDTO(
        @NotNull Integer idPedido,
        @Min(1) @Max(5) Integer qtNota,
        @NotBlank String dsComentario
) {}