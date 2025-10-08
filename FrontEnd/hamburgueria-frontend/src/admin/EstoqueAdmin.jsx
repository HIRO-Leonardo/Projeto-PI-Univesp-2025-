import React, { useState, useEffect } from 'react';
import api from '../services/api_reversa';
import styles from '../estilos/EstoqueForm.module.css';
import '../estilos/FormsLayout.css';

const CadastroItemEstoque = () => {
  const [nomeItem, setNomeItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [authError, setAuthError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro('');

    const novoItem = {
      nome: nomeItem,
      quantidade: parseInt(quantidade),
    };

    try {
      await api.post('/estoque', novoItem);
      setMensagem('Item cadastrado com sucesso!');
      setNomeItem('');
      setQuantidade('');
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    setAuthError(true);
                    // Lógica de logout obrigatória aqui
                    localStorage.removeItem('jwtToken');
                } else {
                    console.error('Erro ao buscar pedidos:', error);
                }
      console.error('Erro ao cadastrar item:', error);
      setErro('Erro ao cadastrar o item. Tente novamente.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Cadastrar Item no Estoque</h2>
      {mensagem && <p className={styles.successMessage}>{mensagem}</p>}
      {erro && <p className={styles.errorMessage}>{erro}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="nomeItem">Nome do Item:</label>
          <input
            type="text"
            id="nomeItem"
            value={nomeItem}
            onChange={(e) => setNomeItem(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="quantidade">Quantidade:</label>
          <input
            type="number"
            id="quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>Cadastrar</button>
      </form>
    </div>
  );
};

const ListarItensEstoque = () => {
  const [itens, setItens] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchItens = async () => {
      try {
        const response = await api.get('/estoque');
        setItens(response.data);
      } catch (error) {
        console.error('Erro ao buscar estoque:', error);
        setErro('Erro ao buscar os itens do estoque.');
      }
    };
    fetchItens();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Itens em Estoque</h2>
      {erro && <p className={styles.errorMessage}>{erro}</p>}
      <ul className={styles.lista}>
        {itens.map(item => (
          <li key={item.id}>
            <strong>{item.nome}</strong> - Quantidade: {item.quantidade}
          </li>
        ))}
      </ul>
    </div>
  );
};

const EstoqueManagement = () => {
  return (
    <div className="forms-container">
      <CadastroItemEstoque />
      <ListarItensEstoque />
    </div>
  );
};

export default EstoqueManagement;
  