import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Certifique-se de que a rota da API está correta
import styles from './Cardapio.module.css'; // Importe seu arquivo CSS

const Cardapio = () => {
  // Estados para a lista do cardápio
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState(null);

  // Estados para o formulário de cadastro de pedidos
  const [pedido, setPedido] = useState({
    nomeCliente: '',
    idProduto: '',
    quantidade: 1,
  });
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [erroCadastro, setErroCadastro] = useState('');

  // 1. Função para carregar o cardápio (GET)
  useEffect(() => {
    const fetchCardapio = async () => {
      try {
        const response = await api.get('/cardapio');
        setMenuItems(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar o cardápio:', error);
        setErro('Não foi possível carregar o cardápio. Por favor, tente novamente.');
        setIsLoading(false);
      }
    };

    fetchCardapio();
  }, []);

  // 2. Lida com a mudança nos campos do formulário
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPedido(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 3. Lida com o envio do formulário (POST)
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setMensagemSucesso('');
    setErroCadastro('');

    try {
      // AQUI: Requisição POST para cadastrar o pedido
      // Substitua '/sua-rota-de-pedidos' pela rota real da sua API
      await api.post('/pedidos', pedido);
      
      setMensagemSucesso('Pedido cadastrado com sucesso!');
      
      // Limpa o formulário após o sucesso
      setPedido({
        nomeCliente: '',
        idProduto: '',
        quantidade: 1,
      });

    } catch (error) {
      console.error('Erro ao cadastrar o pedido:', error);
      setErroCadastro('Ocorreu um erro ao cadastrar o pedido. Verifique os dados e tente novamente.');
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Carregando cardápio...</div>;
  }

  if (erro) {
    return <div className={styles.erro}>{erro}</div>;
  }

  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.coluna}>
        <h2>Cardápio</h2>
        {menuItems.length > 0 ? (
          <ul className={styles.lista}>
            {menuItems.map(item => (
              <li key={item.id} className={styles.item}>
                <div className={styles.itemHeader}>
                  <span className={styles.itemNome}>{item.nomeCardapioDTO}</span>
                  <span className={styles.itemPreco}>R$ {item.precoCardapio}</span>
                  <span className={styles.itemDescricao}>(Descrição: {item.descricaoDoCardapio})</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.semItens}>Nenhum item no cardápio foi encontrado.</p>
        )}
      </div>
      
      <div className={styles.coluna}>
        <h2>Fazer um Novo Pedido</h2>
        <form onSubmit={handleFormSubmit} className={styles.formPedido}>
          <div className={styles.formGroup}>
            <label htmlFor="nomeCliente">Nome do Cliente:</label>
            <input
              type="text"
              id="nomeCliente"
              name="nomeCliente"
              value={pedido.nomeCliente}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="idProduto">ID do Produto:</label>
            <input
              type="number"
              id="idProduto"
              name="idProduto"
              value={pedido.idProduto}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="quantidade">Quantidade:</label>
            <input
              type="number"
              id="quantidade"
              name="quantidade"
              value={pedido.quantidade}
              onChange={handleInputChange}
              min="1"
              required
            />
          </div>

          <button type="submit" className={styles.botao}>Cadastrar Pedido</button>
        </form>

        {mensagemSucesso && <p className={styles.sucesso}>{mensagemSucesso}</p>}
        {erroCadastro && <p className={styles.erro}>{erroCadastro}</p>}
      </div>
    </div>
  );
};

export default Cardapio;