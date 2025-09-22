package com.microsservices.user.models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CardapioModels {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long idCardapio;

    private String nomeCardapio;

    private Integer quantidadeVendida;

    private String descricaoDoCardapio;

    private BigDecimal precoCardapio;



}
