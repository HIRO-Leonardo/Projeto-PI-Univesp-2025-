package com.microsservices.user.repository;

import com.microsservices.user.models.MesaModels;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MesaRepository extends JpaRepository<MesaModels, Long> {
}
