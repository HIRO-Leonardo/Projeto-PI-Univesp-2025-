package com.microsservices.user.dtos;


import com.microsservices.user.models.CardapioModels;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class CardapioDTO {

    private Long idCardapioDTO;

    private String nomeCardapioDTO;

    private String descricaoDoCardapio;

    private BigDecimal precoCardapio;
    public CardapioDTO(CardapioModels entity){
        idCardapioDTO = entity.getIdCardapio();
        nomeCardapioDTO = entity.getNomeCardapio();
        descricaoDoCardapio = entity.getDescricaoDoCardapio();
        precoCardapio = entity.getPrecoCardapio();
    }



}
