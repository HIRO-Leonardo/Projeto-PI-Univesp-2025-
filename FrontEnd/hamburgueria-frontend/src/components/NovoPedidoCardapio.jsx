import React, { useEffect, useState } from 'react';
import styles from './FormularioPedidos.module.css';
import './FormularioPedidos.module.css';
import api from '../services/api_reversa';


const FormularioPedidos = () => {
  // <--- Declaração de todos os estados necessários ---
  const [pedidosCardapio, setPedidosCardapio] = useState('');
  const [totalPedidos, setTotalPedidos] = useState('');
  const [metodoPagamento, setMetodoPagamento] = useState('PIX');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMensagem('');
    setErro('');

    const dadosDoPedido = {
      pedidosCardapio: pedidosCardapio,
      totalPedidos: parseFloat(totalPedidos),
      metodoPagamento: metodoPagamento
    };

    try {
      const response = await api.post('/pedido-cardapio', dadosDoPedido);
      setMensagem('Pedido enviado com sucesso!');
      setPedidosCardapio('');
      setTotalPedidos('');
      setMetodoPagamento('PIX');
      console.log('Resposta do servidor:', response.data);
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
      setErro('Erro ao enviar pedido. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Formulário de Pedido</h2>
      {mensagem && <p className={styles.mensagemSucesso}>{mensagem}</p>}
      {erro && <p className={styles.mensagemErro}>{erro}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="pedidosCardapio" className={styles.label}>Pedido:</label>
          <input
            type="text"
            id="pedidosCardapio"
            value={pedidosCardapio}
            onChange={(e) => setPedidosCardapio(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="totalPedidos" className={styles.label}>Total do Pedido:</label>
          <input
            type="number"
            id="totalPedidos"
            value={totalPedidos}
            onChange={(e) => setTotalPedidos(e.target.value)}
            required
            step="0.01"
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="metodoPagamento" className={styles.label}>Método de Pagamento:</label>
          <select
            id="metodoPagamento"
            value={metodoPagamento}
            onChange={(e) => setMetodoPagamento(e.target.value)}
            required
            className={styles.select}
          >
            <option value="PIX">PIX</option>
            <option value="DINHEIRO">Dinheiro</option>
            <option value="CARTAO">Cartão</option>
          </select>
        </div>
        <button type="submit" className={styles.botao}>Enviar Pedido</button>
      </form>
    </div>
  );
};

export default FormularioPedidos;