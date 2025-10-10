package com.microsservices.user.repository;

import com.microsservices.user.models.EstoqueModels;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EstoqueRepository extends JpaRepository<EstoqueModels, Long> {
}
