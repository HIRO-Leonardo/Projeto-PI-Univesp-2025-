package com.microsservices.user.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class RelatorioVendasDTO {
    private Long idProduto;

    private String nomeProduto;

    private Double precoProduto;

    private Double quantidadeTotal;

    public RelatorioVendasDTO(Long idProduto, Double quantidadeTotal, String nomeProduto, Double precoProduto) {
        this.idProduto = idProduto;
        this.precoProduto = precoProduto;
        this.nomeProduto = nomeProduto;
        this.quantidadeTotal = quantidadeTotal;
    }
}
