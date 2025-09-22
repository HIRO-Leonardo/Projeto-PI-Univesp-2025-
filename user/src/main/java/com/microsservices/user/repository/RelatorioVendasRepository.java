package com.microsservices.user.repository;

import com.microsservices.user.dtos.RelatorioVendasDTO;
import com.microsservices.user.models.PedidosCardapioModels;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RelatorioVendasRepository extends JpaRepository<PedidosCardapioModels, Long> {
    @Query("SELECT new com.microsservices.user.dtos.RelatorioVendasDTO(p.idPedidosCardapio, SUM(p.totalPedidos), p.pedidosCardapio, p.precoProduto) "
            + "FROM PedidosCardapioModels p "
            + "GROUP BY p.idPedidosCardapio, p.pedidosCardapio, p.precoProduto "
            + "ORDER BY SUM(p.totalPedidos) DESC")
    List<RelatorioVendasDTO> findQuantidadeTotalVendidaPorProduto();

}
