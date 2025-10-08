import React, { useEffect, useState } from 'react';
import api from '../services/api_reversa';
import '../estilos/pedidos.css'
import styles from '../estilos/CadastroPedidoMesa.module.css'; 


const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  
  const [idMesa, setIdMesa] = useState('');
  const [horasOcupacao, setHorasOcupacao] = useState('');
  const [horadiaMarcada, setHoradiaMarcada] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [telefoneCliente, setTelefoneCliente] = useState('');
  const [emailCliente, setEmailCliente] = useState('');
  const [authError, setAuthError] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMensagem('');
    setErro('');

    const pedido = {
      idMesa: parseInt(idMesa), // Certifique-se de que seja um número
      horas_ocupacao: parseInt(horasOcupacao), // Certifique-se de que seja um número
      horadia_marcada: horadiaMarcada, // Formato ISO 8601: YYYY-MM-DDTHH:MM:SS
      nome_cliente: nomeCliente,
      telefone_cliente: telefoneCliente,
      email_cliente: emailCliente,
      
    };

    const mesaIdParaReservar = parseInt(idMesa); // Obtenha o id da mesa do estado

    try {
      const response = await api.post(`/reservar/${mesaIdParaReservar}`, pedido);
      setMensagem('Reserva cadastrada com sucesso!');
      setIdMesa('');
      setHorasOcupacao('');
      setHoradiaMarcada('');
      setNomeCliente('');
      setTelefoneCliente('');
      setEmailCliente('');
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    setAuthError(true);
                    // Lógica de logout obrigatória aqui
                    localStorage.removeItem('jwtToken');
                } else {
                    console.error('Erro ao buscar pedidos:', error);
                }
      console.error('Erro ao cadastrar reserva:', error);
      setErro('Erro ao cadastrar a reserva. Por favor, tente novamente.');
      if (error.response && error.response.data) {
        setErro(`${erro} Detalhes: ${JSON.stringify(error.response.data)}`);
      }
    }
  };
  useEffect(() => {
    api.get('/reservadas')
      .then(response => {
        
        setReservas(response.data);
      })
      .catch(error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    setAuthError(true);
                    // Lógica de logout obrigatória aqui
                    localStorage.removeItem('jwtToken');
                } else {
                    console.error('Erro ao buscar pedidos:', error);
                }
        console.error('Erro ao buscar reservas:', error);
      });

  }, []);

  
  
    return (
      <div>
        <br></br>
      <h2 className='Title'>Reservas Confirmadas</h2>
      <ul className='Mesas'>
        {reservas.map(reserva => (
          <li key={reserva.idMesa}><br></br>
            Numero da mesa: {reserva.idMesa}.<br></br>
            Descrição da mesa: {reserva.descMesa}.<br></br>

          </li>
        ))}
      </ul>
      <br></br>
      <br></br>
         <div className={styles.container}>
        <h2 className={styles.title}>Cadastro de Reserva de Mesa</h2>
        {mensagem && <p className={styles.successMessage}>{mensagem}</p>}
        {erro && <p className={styles.errorMessage}>{erro}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="idMesa" className={styles.label}>Número da Mesa:</label>
            <input
              type="number"
              id="idMesa"
              value={idMesa}
              onChange={(e) => setIdMesa(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="horasOcupacao" className={styles.label}>Horas de Ocupação:</label>
            <input
              type="number"
              id="horasOcupacao"
              value={horasOcupacao}
              onChange={(e) => setHorasOcupacao(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="horadiaMarcada" className={styles.label}>Hora Marcada:</label>
            <input
              type="datetime-local"
              id="horadiaMarcada"
              value={horadiaMarcada}
              onChange={(e) => setHoradiaMarcada(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="nomeCliente" className={styles.label}>Nome do Cliente:</label>
            <input
              type="text"
              id="nomeCliente"
              value={nomeCliente}
              onChange={(e) => setNomeCliente(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="telefoneCliente" className={styles.label}>Telefone:</label>
            <input
              type="tel"
              id="telefoneCliente"
              value={telefoneCliente}
              onChange={(e) => setTelefoneCliente(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="emailCliente" className={styles.label}>Email:</label>
            <input
              type="email"
              id="emailCliente"
              value={emailCliente}
              onChange={(e) => setEmailCliente(e.target.value)}
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>Cadastrar Reserva</button><br></br>
        </form>
        
      </div>
      
      </div>
    );

  
};

export default Reservas;