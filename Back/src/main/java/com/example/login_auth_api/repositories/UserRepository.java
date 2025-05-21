package com.example.login_auth_api.repositories;

import com.example.login_auth_api.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    UserDetails findByDsEmail(String dsEmail);

    List<User> findAllByEnRole(Enum enRole);

    @Query(value = "SELECT id_usuario, ds_email, ds_senha, en_role, nm_usuario FROM tbusuario WHERE id_usuario = :id AND en_role = :enrole", nativeQuery = true)
    Optional<User> findByIdAndEnRole(@Param("id") Integer id, @Param("enrole") String enRole);
}
