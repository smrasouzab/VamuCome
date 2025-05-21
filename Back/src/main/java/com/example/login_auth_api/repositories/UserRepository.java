package com.example.login_auth_api.repositories;

import com.example.login_auth_api.domain.cliente.Cliente;
import com.example.login_auth_api.domain.user.User;
import com.example.login_auth_api.domain.user.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    UserDetails findByDsEmail(String dsEmail);

    List<User> findAllByEnRole(String role);
}
