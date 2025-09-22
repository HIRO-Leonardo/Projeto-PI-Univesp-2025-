package com.microsservices.user.repository;

import com.microsservices.user.models.PedidosCardapioModels;
import com.microsservices.user.models.PedidosModels;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoCardapioRepository extends JpaRepository<PedidosCardapioModels, Long> {
}
