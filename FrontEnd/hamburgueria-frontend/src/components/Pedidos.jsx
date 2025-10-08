import React, { useEffect, useState } from 'react';
import api from '../services/api_reversa';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import '../estilos/pedidos.css'



const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
const [authError, setAuthError] = useState(false);
  useEffect(() => {
    api.get('/pedidos') // Altere para a rota real
      .then(response => {
        console.log(response.data);
        setPedidos(response.data);
      })
      .catch(error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    setAuthError(true);
                    // Lógica de logout obrigatória aqui
                    localStorage.removeItem('jwtToken');
                } else {
                    console.error('Erro ao buscar pedidos:', error);
                }
        console.error('Erro ao buscar pedidos:', error);
      });
  }, []);

  const formatarDataHora = (dataHoraString) => {
    if (!dataHoraString) {
      return '';
    }
    try {
      const dataHora = new Date(dataHoraString);
      return format(dataHora, 'dd/MM/yyyy HH:mm', { locale: ptBR });
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return dataHoraString; // Retorna a string original em caso de erro
    }
  };

  return (
    <div>
       
    
    <br></br>
      <h2 style={{ textAlign: 'center' }}>Pedidos Recebidos</h2><br></br>
      <ul>
        {pedidos.map(pedido => (
          <li key={pedido.id} className='Mesas' ><br></br>
            Numero da mesa: {pedido.id_mesa.idMesa}.<br></br>Horas de ocupação: {pedido.horas_ocupacao} horas.<br></br>Hora marcada: {formatarDataHora(pedido.horadia_marcada)}.
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pedidos;