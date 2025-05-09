import React, { useEffect, useState } from 'react';
import api from '../services/api_reversa';

const Caixa = () => {
  const [relatorio, setRelatorio] = useState([]);

  useEffect(() => {
    api.get('caixa/') // Altere para a rota correta se for diferente
      .then(response => {
        setRelatorio(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar dados do caixa:', error);
      });
  }, []);

  return (
    <div>
      <h2>Relatório de Caixa</h2>
      <ul>
        {relatorio.map(item => (
          <li key={item.id}>
            Pedido #{item.pedido_id} — R$ {item.valor} — {item.data}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Caixa;