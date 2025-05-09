import React, { useEffect, useState } from 'react';
import api from '../services/api_reversa';

const Cardapio = () => {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    api.get('menu/') // rota Django: /api/menu/
      .then(response => {
        setItens(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar cardápio:', error);
      });
  }, []);

  return (
    <div>
      <h2>Cardápio</h2>
      <ul>
        {itens.map((item) => (
          <li key={item.id}>
            <strong>{item.nome}</strong> - R$ {item.preco} <br />
            <img src={item.imagem} alt={item.nome} width="100" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cardapio;