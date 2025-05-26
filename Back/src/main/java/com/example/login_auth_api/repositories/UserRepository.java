package com.example.login_auth_api.repositories;

import com.example.login_auth_api.domain.user.User;
import com.example.login_auth_api.domain.user.UserRole;
import com.example.login_auth_api.dto.response.UserResponseDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    UserDetails findByDsEmail(String dsEmail);

    List<User> findAllByEnRole(Enum enRole);

    @Query("SELECT new com.example.login_auth_api.dto.response.UserResponseDTO(u.idUsuario, u.dsEmail, u.nmUsuario, u.enRole) " +
            "FROM User u WHERE u.idUsuario = :id AND u.enRole = :enrole")
    Optional<UserResponseDTO> findByIdAndEnRole(@Param("id") Integer id, @Param("enrole") UserRole enrole);
}