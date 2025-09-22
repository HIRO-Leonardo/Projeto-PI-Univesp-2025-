package com.microsservices.user.dtos;

import com.microsservices.user.Enum.MetodoPagamentoEnum;
import com.microsservices.user.models.PedidosCardapioModels;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
public class PedidosCardapioDTO {

    private Long idPedidosCardapio;

    private String pedidosCardapio;

    private LocalDateTime horaFeitaPedido;

    private Double precoProduto;

    private Double totalPedidos;

    private MetodoPagamentoEnum metodoPagamento;

    public PedidosCardapioDTO(PedidosCardapioModels entity){
        precoProduto = entity.getPrecoProduto();
        idPedidosCardapio = entity.getIdPedidosCardapio();
        pedidosCardapio = entity.getPedidosCardapio();
        horaFeitaPedido = entity.getHoraFeitaPedido();
        totalPedidos = entity.getTotalPedidos();
        metodoPagamento = entity.getMetodoPagamento();

    }
    public PedidosCardapioDTO(){

    }

}
