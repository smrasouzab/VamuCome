package com.example.login_auth_api.repositories;

import com.example.login_auth_api.domain.admin.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
    Optional<Admin> findByNmUsuarioAdmin(String nmUsuarioAdmin);
}