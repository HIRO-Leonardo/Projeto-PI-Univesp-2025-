package com.microsservices.user.dtos;

import com.microsservices.user.models.EstoqueModels;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EstoqueDTO {

    private Long id;

    private String descProduto;

    private Double precoProduto;

    private Long quantProduto;

    public EstoqueDTO(EstoqueModels entity) {
        this.id = entity.getId();
        this.descProduto = entity.getDescProduto();
        this.precoProduto = entity.getPrecoProduto();
        this.quantProduto = entity.getQuantProduto();
    }

    public EstoqueDTO() {}
}
