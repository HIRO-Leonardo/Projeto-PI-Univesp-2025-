package com.microsservices.user.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;

import java.io.Serializable;

@Entity
@Table(name = "mesas")
@Getter
@Setter
public class MesaModels implements Serializable {
    private static final long serialVersionUID = 1L;


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idMesa;

    private String descMesa;
    private Integer dispMesa;
    private Integer capacidade;


    public MesaModels(){

    }



}
