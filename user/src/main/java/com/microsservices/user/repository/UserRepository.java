package com.microsservices.user.repository;

import com.microsservices.user.models.UserModels;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserModels, Long> {

    Optional<UserDetails> findUserByEmail(String email);

}
