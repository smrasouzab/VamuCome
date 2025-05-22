package com.example.login_auth_api.dto.response;

import com.example.login_auth_api.domain.user.User;
import com.example.login_auth_api.domain.user.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO {
    private Integer idUsuario;
    private String dsEmail;
    private String nmUsuario;
    private UserRole enRole;

    public UserResponseDTO(User user) {
        this.idUsuario = user.getIdUsuario();
        this.dsEmail = user.getDsEmail();
        this.nmUsuario = user.getNmUsuario();
        this.enRole = user.getEnRole();
    }
}