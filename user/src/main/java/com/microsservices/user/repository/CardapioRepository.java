package com.microsservices.user.repository;

import com.microsservices.user.models.CardapioModels;
import com.microsservices.user.models.DispMesaModels;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardapioRepository extends JpaRepository<CardapioModels, Long> {
}
