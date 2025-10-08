import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Estoque.css';

const Estoque = () => {
  const [estoque, setEstoque] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState('Todos');
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');
  const [authError, setAuthError] = useState(false);
  const buscarEstoque = async () => {
    try {
      const response = await api.get('/api/estoque/');
      console.log('Dados do estoque recebidos:', response.data);
      setEstoque(response.data);
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    setAuthError(true);
                    // Lógica de logout obrigatória aqui
                    localStorage.removeItem('jwtToken');
                } else {
                    console.error('Erro ao buscar pedidos:', error);
                }
      console.error('Erro ao buscar estoque:', error);
    }
  };

  useEffect(() => {
    buscarEstoque();
  }, []);

  const itensFiltrados = estoque.filter((item) => {
    const statusMatch = filtroStatus === 'Todos' || item.status === filtroStatus;
    const categoriaMatch = filtroCategoria === 'Todas' || item.categoria === filtroCategoria;
    return statusMatch && categoriaMatch;
  });

  return (
    <div className="estoque-container">
  <h1 className="estoque-titulo">ESTOQUE</h1>

  {/* Botão Atualizar */}
  <div className="atualizar-container">
    <button className="atualizar-btn" onClick={buscarEstoque}>
      Atualizar Estoque
    </button>
  </div>

  {/* Filtros */}
  <div className="filtro-container">
    <label htmlFor="filtro-status">Filtrar por Status:</label>
    <select
      id="filtro-status"
      value={filtroStatus}
      onChange={(e) => setFiltroStatus(e.target.value)}
    >
      <option value="Todos">Todos</option>
      <option value="OK">OK</option>
      <option value="ALTO">ALTO</option>
      <option value="BAIXO">BAIXO</option>
    </select>

    <label htmlFor="filtro-categoria">Filtrar por Categoria:</label>
    <select
      id="filtro-categoria"
      value={filtroCategoria}
      onChange={(e) => setFiltroCategoria(e.target.value)}
    >
      <option value="Todas">Todas</option>
      {estoque
        .map((item) => item.categoria)
        .filter((categoria, index, self) => self.indexOf(categoria) === index) // Remove duplicados
        .map((categoria) => (
          <option key={categoria} value={categoria}>
            {categoria}
          </option>
        ))}
    </select>
  </div>

  {/* Lista de Itens */}
  {itensFiltrados.length > 0 ? (
    <ul>
      {itensFiltrados.map((item) => (
        <li key={item.id} className={`estoque-item ${item.status.toLowerCase()}`}>
          <span className="item-nome">{item.nome}</span>
          <span className="item-quantidade">Quantidade: {item.quantidade}</span>
        </li>
      ))}
    </ul>
  ) : (
    <p>Carregando estoque...</p>
  )}
</div>
  );
};

export default Estoque;