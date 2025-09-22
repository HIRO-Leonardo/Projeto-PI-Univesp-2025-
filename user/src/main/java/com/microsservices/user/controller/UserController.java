package com.microsservices.user.controller;

import com.microsservices.user.dtos.*;
import com.microsservices.user.models.DispMesaModels;
import com.microsservices.user.models.MesaModels;
import com.microsservices.user.models.PedidosCardapioModels;
import com.microsservices.user.models.PedidosModels;
import com.microsservices.user.services.UserServices;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:3000/", "http://192.168.1.132:3000/"})

public class UserController {
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private final UserServices userServices;

    public UserController(UserServices userServices) {
        this.userServices = userServices;
    }


    @PostMapping("/mesas")
    public ResponseEntity<MesaModels> cadastroMesa(@RequestBody @Valid  MesaModels mesaModels){
        MesaModels mesaModels1 = new MesaModels();

        mesaModels1.setDescMesa(mesaModels.getDescMesa());
        mesaModels1.setDispMesa(mesaModels.getDispMesa());
        mesaModels1.setCapacidade(mesaModels.getCapacidade());

        return ResponseEntity.status(HttpStatus.CREATED).body(userServices.save(mesaModels1));
    }

    @GetMapping("/mesas")
    public List<MesasDto> getAllMesas(){

        return userServices.getAllMesas();

    }

    @GetMapping("/reservadas")
    public List<MesasDto> verMesasReservadas(){
        return userServices.getAllMesasReservadas();

    }

    @GetMapping("/pedidos")
    public  List<PedidosDto> allPedidos(){
        return (List<PedidosDto>) userServices.verTodososPedidos();

    }

    @PostMapping("/disp")
    public ResponseEntity<DispMesaModels> cadastroDisponibilidade(@RequestBody @Valid DispMesaModels dispMesaModels){

        return ResponseEntity.status(HttpStatus.CREATED).body(userServices.saveDisp(dispMesaModels));
    }

    @PutMapping("/alterarDisponibilidade/{id}")
    public ResponseEntity<?> alterarDisponibilidade(@PathVariable Long id){
        userServices.atualizarDispMesa(id);

        return ResponseEntity.ok("Atualizado com sucesso a disponibidaade da mesa.");

    }



    @PostMapping("/reservar/{id}")
    public ResponseEntity<?> reservarMesas(@PathVariable Long id, @RequestBody PedidosModels pedidosModels){
       Optional<MesaModels> mesaModelsOptional = Optional.ofNullable(userServices.findById(id));

        if (mesaModelsOptional.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        MesaModels mesasDto = mesaModelsOptional.get();

        DispMesaModels dispMesaModels = userServices.findByIdInt(Long.valueOf(2));
        Integer disponibilidadeMesa = mesasDto.getDispMesa();
        Long idMesa = mesasDto.getIdMesa();

        if (disponibilidadeMesa == 2){
            return  ResponseEntity.ok("Mesa ja reservada. Por favor escolha outra mesa!");
        }

        String horaMarcadaStr = pedidosModels.getHoradia_marcada().format(DATE_TIME_FORMATTER); // Supondo que venha como LocalDateTime no DTO
        LocalDateTime horaMarcada = LocalDateTime.parse(horaMarcadaStr, DATE_TIME_FORMATTER);
        Integer horasOcupacao = pedidosModels.getHoras_ocupacao();

        LocalDateTime horaFimOcupacao = horaMarcada.plusHours(horasOcupacao);

        PedidosModels pedidosModels1 = new PedidosModels();

        pedidosModels1.setId_mesa(mesasDto);
        pedidosModels1.setDataHoraPedido(LocalDateTime.now());
        pedidosModels1.setHoras_ocupacao(pedidosModels.getHoras_ocupacao());
        pedidosModels1.setNome_cliente(pedidosModels.getNome_cliente());
        pedidosModels1.setEmail_cliente(pedidosModels.getEmail_cliente());
        pedidosModels1.setHoradia_marcada(pedidosModels.getHoradia_marcada());
        pedidosModels1.setTelefone_cliente(pedidosModels.getTelefone_cliente());
        pedidosModels.setHora_fim_ocupacao(horaFimOcupacao);

        userServices.alterarDisponibilidade(idMesa);
        return ResponseEntity.status(HttpStatus.CREATED).body(userServices.pedidosMesas(pedidosModels1)).ok("Mesa Reservada pelo " + pedidosModels1.getNome_cliente() + " " + "Por " + pedidosModels1.getHoras_ocupacao() + " horas.");
    }
    @PostMapping("/cardapio")
    public ResponseEntity<CardapioDTO> cadastrarCardapio(@RequestBody CardapioDTO cardapioDTO){

        return ResponseEntity.status(HttpStatus.CREATED).body(userServices.save(cardapioDTO));

    }
    @GetMapping("/cardapio")
    public List<CardapioDTO> getAllCardapio(){
        return (List<CardapioDTO>) userServices.getAllCardapio();
    }

    @DeleteMapping("/cardapio/{id}")
    public ResponseEntity<Void> deleteCardapio(@PathVariable Long id){
        userServices.deleteCardapio(id);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/pedido-cardapio")
    public ResponseEntity<PedidosCardapioDTO> savePediddosCardapio(@RequestBody PedidosCardapioDTO pedidosCardapioDTO){

        return ResponseEntity.status(HttpStatus.CREATED).body(userServices.savePedidosCardapio(pedidosCardapioDTO));
    }

    @GetMapping("/pedido-cardapio")
    public List<PedidosCardapioDTO> getAllPedidosCardapio(){
        return (List<PedidosCardapioDTO>) userServices.getAllCardapioPedidos();
    }

    @GetMapping("/relatorio")
    public List<RelatorioVendasDTO> getRelatorioQuantidade(){
        return (List<RelatorioVendasDTO>) userServices.getRelatorioQuantidade();
    }



}
