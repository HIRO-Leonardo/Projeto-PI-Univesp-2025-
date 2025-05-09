package com.microsservices.user.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;


@Entity
@Table(name = "DispMesas")
@Getter
@Setter
public class DispMesaModels  {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer idDispMesa;
    private Integer numMesaDisp;
    private String descricao;

}
