package com.microsservices.user.dtos;

import com.microsservices.user.models.MesaModels;
import com.microsservices.user.models.PedidosModels;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PedidosDto {
    private Long id;

    private MesaModels id_mesa;

    private LocalDateTime dataHoraPedido;

    private Integer horas_ocupacao;

    private LocalDateTime hora_fim_ocupacao;

    private String nome_cliente;

    private String telefone_cliente;

    private String email_cliente;

    private LocalDateTime horadia_marcada;

    public PedidosDto(){

    }

    public PedidosDto(PedidosModels entity){
        id = entity.getId();
        id_mesa = entity.getId_mesa();
        dataHoraPedido = entity.getDataHoraPedido();
        horas_ocupacao = entity.getHoras_ocupacao();
        hora_fim_ocupacao = entity.getHora_fim_ocupacao();
        nome_cliente = entity.getNome_cliente();
        telefone_cliente = entity.getTelefone_cliente();
        email_cliente = entity.getEmail_cliente();
        horadia_marcada = entity.getHoradia_marcada();
    }
}

