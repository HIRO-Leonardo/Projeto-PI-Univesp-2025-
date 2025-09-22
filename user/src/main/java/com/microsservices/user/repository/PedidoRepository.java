package com.microsservices.user.repository;

import com.microsservices.user.models.PedidosModels;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<PedidosModels, Long> {
}
