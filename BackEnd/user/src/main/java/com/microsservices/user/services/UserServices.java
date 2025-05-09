package com.microsservices.user.services;

import com.microsservices.user.dtos.MesasDto;
import com.microsservices.user.dtos.PedidosDto;
import com.microsservices.user.models.DispMesaModels;
import com.microsservices.user.models.MesaModels;
import com.microsservices.user.models.PedidosModels;
import com.microsservices.user.repository.DispRepository;
import com.microsservices.user.repository.MesaRepository;

import com.microsservices.user.repository.PedidoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServices {


    @Autowired
    public MesaRepository mesaRepository;

    @Autowired
    public DispRepository dispRepository;


    @Autowired
    public PedidoRepository pedidoRepository;



    public MesaModels save(MesaModels mesaModels){
        mesaModels = mesaRepository.save(mesaModels);
        return mesaModels;
    }


    @Transactional(readOnly = true)
    public List<MesasDto> getAllMesasReservadas(){

        return findMesaByDisp(2);

    }

    public List<MesasDto> findMesaByDisp(Integer disp){
        var result = mesaRepository.findAll();
        List<MesasDto> resultado = new ArrayList<>();


        List<MesasDto> dto = result.stream().map(x -> {

            return new MesasDto(x);
        }).toList();

        for (MesasDto mesaModels:dto){
            System.out.println("Mesa Models:" + mesaModels);
            if (mesaModels.getDispMesa() == 2){
                System.out.println("Id disponibilidade mesa:" + mesaModels.getDispMesa() );
                resultado.add(mesaModels);

            }
        }

        return resultado;
    }

    @Transactional
    public List<PedidosDto> verTodososPedidos(){
        var result = pedidoRepository.findAll();
        List<PedidosDto> pedidosDto = result.stream().map(x -> {

            return new PedidosDto(x);
        }).toList();

        return  pedidosDto;

    }

    @Transactional
    public MesaModels atualizarDispMesa(Long id){
        MesaModels mesaModels = mesaRepository.findById(id).get();
        if (mesaModels.getDispMesa() == 2){
            mesaModels.setDispMesa(1);
            mesaModels = mesaRepository.save(mesaModels);
        }else{
            mesaModels.setDispMesa(2);
            mesaModels = mesaRepository.save(mesaModels);
        }

        return mesaModels;

    }


    @Transactional(readOnly = true)
    public List<MesasDto> getAllMesas(){

        var result = mesaRepository.findAll();

        List<MesasDto> dto = result.stream().map(x -> {

            return new MesasDto(x);
        }).toList();

        return dto;
    }

    @Transactional(readOnly = true)
    public DispMesaModels saveDisp(DispMesaModels dispMesaModels){
        dispMesaModels = dispRepository.save(dispMesaModels);
        return dispMesaModels;
    }
    @Transactional(readOnly = true)
    public MesaModels findById(Long id){
        MesaModels mesaModels = mesaRepository.findById(id).get();

        return  mesaModels;

    }
    @Transactional(readOnly = true)
    public DispMesaModels findByIdInt(Long id){
        DispMesaModels dispMesaModels = dispRepository.findById(id).get();
        return dispMesaModels;
    }

    @Transactional
    public MesaModels alterarDisponibilidade(Long id) {
        Optional<MesaModels> mesaOptional = mesaRepository.findById(id);

        if (mesaOptional.isPresent()) {
            MesaModels mesaModels = mesaOptional.get();
            mesaModels.setDispMesa(2);
            return mesaRepository.save(mesaModels);
        } else {
            return null;

        }

    }


    @Transactional
    public PedidosModels pedidosMesas(PedidosModels pedidosModels){
        LocalDateTime horaMarcada = pedidosModels.getHoradia_marcada();
        Integer horasOcupacao = pedidosModels.getHoras_ocupacao();
        



        if (horaMarcada != null && horasOcupacao != null) {
            LocalDateTime horaFimOcupacao = horaMarcada.plusHours(horasOcupacao);
            pedidosModels.setHora_fim_ocupacao(horaFimOcupacao);
        }
            pedidosModels = pedidoRepository.save(pedidosModels);
            return pedidosModels;

    }  





}
