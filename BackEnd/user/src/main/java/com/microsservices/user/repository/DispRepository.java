package com.microsservices.user.repository;

import com.microsservices.user.models.DispMesaModels;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DispRepository extends JpaRepository<DispMesaModels, Long> {
}
