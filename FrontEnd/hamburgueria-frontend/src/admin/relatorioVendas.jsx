import React, { useState, useEffect } from 'react';
import api from '../services/api';

const RelatorioVendas = () => {
  const [relatorioItens, setRelatorioItens] = useState([]);
  const [somaTotalQuantidade, setSomaTotalQuantidade] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchRelatorio = async () => {
      try {
        const response = await api.get('/relatorio');
        const dados = response.data;
        
        setRelatorioItens(dados);
        
        // --- AQUI É ONDE VOCÊ FAZ A SOMA ---
        const soma = dados.reduce((acumulador, item) => {
          return acumulador + item.quantidadeTotal;
        }, 0); // O '0' é o valor inicial do acumulador
        
        setSomaTotalQuantidade(soma);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar a quantidade total:', error);
        setErro('Não foi possível carregar o total vendido.');
        setIsLoading(false);
      }
    };

    fetchRelatorio();
  }, []);

  if (isLoading) {
    return <div>Carregando relatório...</div>;
  }

  if (erro) {
    return <div>Erro: {erro}</div>;
  }
  
  return (
    <div>
      <h2>Relatório de Vendas por Produto</h2>
      <p>Soma total de todos os produtos vendidos: <strong>{somaTotalQuantidade}</strong></p>
      <p>Detalhes por produto:</p>
      <ul>
        {relatorioItens.map(item => (
          <li key={item.idPedidosCardapio}>
            <p>---------------------------------------------------</p>
            Produto: {item.nomeProduto}<br />Quantidade Total: {item.quantidadeTotal}<br />Preço do produto por unidade: R$ {item.precoProduto.toFixed(2)}
            <p>---------------------------------------------------</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatorioVendas;