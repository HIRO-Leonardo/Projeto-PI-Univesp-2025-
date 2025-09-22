package com.microsservices.user.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "pedidos")
@Getter
@Setter
public class PedidosModels {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_mesa", nullable = false)
    private MesaModels id_mesa;

    private LocalDateTime dataHoraPedido;

    private Integer horas_ocupacao;

    private LocalDateTime hora_fim_ocupacao;

    @Column(columnDefinition = "TEXT")
    private String nome_cliente;

    @Column(columnDefinition = "TEXT")
    private String telefone_cliente;

    @Column(columnDefinition = "TEXT")
    private String email_cliente;

    private LocalDateTime horadia_marcada;

    public PedidosModels() {
        this.dataHoraPedido = LocalDateTime.now(); // Define a hora do pedido no momento da criação
    }

}
