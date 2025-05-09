import React, { useEffect, useState } from 'react';
import api from '../services/api_reversa';

const Estoque = () => {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    api.get('estoque/')
      .then(response => {
        setItens(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar estoque:', error);
      });
  }, []);

  return (
    <div>
      <h2>Controle de Estoque</h2>
      <ul>
        {itens.map(item => (
          <li key={item.id}>
            <strong>{item.nome}</strong> – {item.quantidade} {item.unidade} ({item.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Estoque;