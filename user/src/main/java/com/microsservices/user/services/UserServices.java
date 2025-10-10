package com.microsservices.user.services;
import com.microsservices.user.ExceptionsEvents.EventNotFoundException;
import com.microsservices.user.dtos.*;
import com.microsservices.user.models.*;
import com.microsservices.user.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServices {

    private final MesaRepository mesaRepository;

    private final  DispRepository dispRepository;

    private final PedidoRepository pedidoRepository;

    private final CardapioRepository cardapioRepository;

    private final EstoqueRepository estoqueRepository;

    private final PedidoCardapioRepository pedidoCardapioRepository;

    private final RelatorioVendasRepository relatorioVendasRepository;

    public UserServices(MesaRepository mesaRepository, DispRepository dispRepository, PedidoRepository pedidoRepository, CardapioRepository cardapioRepository, EstoqueRepository estoqueRepository, PedidoCardapioRepository pedidoCardapioRepository, RelatorioVendasRepository relatorioVendasRepository) {
        this.mesaRepository = mesaRepository;
        this.dispRepository = dispRepository;
        this.pedidoRepository = pedidoRepository;
        this.cardapioRepository = cardapioRepository;
        this.estoqueRepository = estoqueRepository;
        this.pedidoCardapioRepository = pedidoCardapioRepository;
        this.relatorioVendasRepository = relatorioVendasRepository;
    }

    //MesaModels/MesasDTO/DispMesaModels
    public MesaModels save(MesaModels mesaModels){
        mesaModels = mesaRepository.save(mesaModels);
        return mesaModels;
    }

    @Transactional(readOnly = true)
    public List<MesasDto> getAllMesasReservadas(){return findMesaByDisp(2);
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

        List<MesasDto> dto = result.stream().map(x -> {return new MesasDto(x);}).toList();

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
    //-------------------------------------------------------------------------
    //PedidosModels
    @Transactional
    public List<PedidosDto> verTodososPedidos(){
        var result = pedidoRepository.findAll();
        List<PedidosDto> pedidosDto = result.stream().map(x -> {return new PedidosDto(x);}).toList();

        return  pedidosDto;
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

    public Optional<PedidosModels> getPedidoById(Long id){
       Optional<PedidosModels> pedidosModels = Optional.ofNullable(pedidoRepository.findById(id).orElseThrow(() -> new EventNotFoundException()));
        return pedidosModels;
    }

    //----------------------------------------------------------------
    //CardapioModels/CardapiosDtos
    @Transactional
    public CardapioDTO save(CardapioDTO cardapioDTO){
        var cardapioModels = new CardapioModels();
        cardapioModels.setNomeCardapio(cardapioDTO.getNomeCardapioDTO());
        cardapioModels.setDescricaoDoCardapio(cardapioDTO.getDescricaoDoCardapio());
        cardapioModels.setPrecoCardapio(cardapioDTO.getPrecoCardapio());

        var cardapioModels1 = cardapioRepository.save(cardapioModels);
        return new CardapioDTO(cardapioModels1);
    }

    public List<CardapioDTO> getAllCardapio(){
        var result = cardapioRepository.findAll();

        List<CardapioDTO> dto = result.stream().map(x -> {return new CardapioDTO(x);}).toList();

        return dto;
    }

    public void deleteCardapio(Long id){
        var cardapioExistente = cardapioRepository.findById(id);

        if (cardapioExistente.isEmpty()){
            System.out.println("Nao existe esse cardápio no banco de dados");
        }else {
            var cardapio = cardapioExistente.get();
            cardapioRepository.delete(cardapio);

        }

    }
    //------------------------------------------------------------
    //PedidosCardapiosModels
    @Transactional
    public PedidosCardapioDTO savePedidosCardapio(PedidosCardapioDTO pedidosCardapioDTO){
        var pedidosModels = new PedidosCardapioModels();
        pedidosModels.setPedidosCardapio(pedidosCardapioDTO.getPedidosCardapio());
        pedidosModels.setHoraFeitaPedido(LocalDateTime.now());
        pedidosModels.setTotalPedidos(pedidosCardapioDTO.getTotalPedidos());
        pedidosModels.setMetodoPagamento(pedidosCardapioDTO.getMetodoPagamento());
        pedidosModels.setPrecoProduto(pedidosCardapioDTO.getPrecoProduto());
        var pedidosCardapioModels = pedidoCardapioRepository.save(pedidosModels);

        return new PedidosCardapioDTO(pedidosCardapioModels);
    }

    public List<PedidosCardapioDTO> getAllCardapioPedidos(){
        var result = pedidoCardapioRepository.findAll();

        List<PedidosCardapioDTO> dto = result.stream().map(x -> {return new PedidosCardapioDTO(x);}).toList();

        return dto;
    }

    public List<RelatorioVendasDTO> getRelatorioQuantidade(){
        List<RelatorioVendasDTO> quantidadeTotalVendidaPorProduto = relatorioVendasRepository.findQuantidadeTotalVendidaPorProduto();
        return quantidadeTotalVendidaPorProduto;
    }
    //---------------------------------------------------------------
    // EstoqueModels/EstoqueDTO

    public EstoqueDTO saveEstoque(EstoqueDTO estoqueDTO){
        var estoqueModels = new EstoqueModels();
        estoqueModels.setDescProduto(estoqueDTO.getDescProduto());
        estoqueModels.setPrecoProduto(estoqueDTO.getPrecoProduto());
        estoqueModels.setQuantProduto(estoqueDTO.getQuantProduto());

        var estoqueSalvo = estoqueRepository.save(estoqueModels);

        return new EstoqueDTO(estoqueSalvo);
    }

    public List<EstoqueDTO> getAllEstoque(){
        var result = estoqueRepository.findAll();

        List<EstoqueDTO> dto = result.stream().map(x -> {return new EstoqueDTO(x);}).toList();

        return dto;
    }

}
