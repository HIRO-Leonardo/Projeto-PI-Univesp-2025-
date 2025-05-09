package com.microsservices.user.dtos;

import com.microsservices.user.models.MesaModels;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MesasDto {
    private Long idMesa;

    private String descMesa;
    private int dispMesa;



    public MesasDto(){

    }
    public MesasDto(MesaModels entity){
        idMesa = entity.getIdMesa();
        descMesa = entity.getDescMesa();
        dispMesa = entity.getDispMesa();

    }

}
