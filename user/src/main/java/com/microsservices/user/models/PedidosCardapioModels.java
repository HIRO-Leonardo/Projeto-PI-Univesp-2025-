package com.microsservices.user.models;

import com.microsservices.user.Enum.MetodoPagamentoEnum;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PedidosCardapioModels {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long idPedidosCardapio;

    private String pedidosCardapio;

    private Double precoProduto;

    private LocalDateTime horaFeitaPedido;

    private Double totalPedidos;

    private MetodoPagamentoEnum metodoPagamento;


}
