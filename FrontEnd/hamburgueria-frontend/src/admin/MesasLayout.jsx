import React, { useEffect, useState } from 'react';
import api from '../services/api_reversa';
import styles from '../estilos/CadastroMesaForm.module.css'; 
import stylesMesa from '../estilos/MesaManagement.module.css'; 
import stylesGetMesas from '../estilos/ListarMesas.module.css'; 
import stylesLista from '../estilos/MesaListagem.css'; 
import '../estilos/FormsLayout.css';
const AlterarDisponibilidadeMesa = () => {
  const [idMesaAlterar, setIdMesaAlterar] = useState('');
  const [novaDisponibilidade, setNovaDisponibilidade] = useState('1');
  const [mensagemAlterar, setMensagemAlterar] = useState('');
  const [erroAlterar, setErroAlterar] = useState('');
  const [authError, setAuthError] = useState(false);

  const handleAlterarDisponibilidade = async (event) => {
    event.preventDefault();
    setMensagemAlterar('');
    setErroAlterar('');

    const dadosAtualizacao = {
      dispMesa: parseInt(novaDisponibilidade),
    };

    try {
      const response = await api.put(`/alterarDisponibilidade/${idMesaAlterar}`, dadosAtualizacao);
      setMensagemAlterar(`Disponibilidade da mesa ${idMesaAlterar} alterada com sucesso!`);
      setIdMesaAlterar('');
      setNovaDisponibilidade('1');
      console.log('Resposta do backend (alterar):', response.data);
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    setAuthError(true);
                    // Lógica de logout obrigatória aqui
                    localStorage.removeItem('jwtToken');
                } else {
                    console.error('Erro ao buscar pedidos:', error);
                }
      console.error(`Erro ao alterar disponibilidade da mesa ${idMesaAlterar}:`, error);
      setErroAlterar(`Erro ao alterar disponibilidade da mesa ${idMesaAlterar}. Por favor, tente novamente.`);
      if (error.response && error.response.data) {
        setErroAlterar(`${erroAlterar} Detalhes: ${JSON.stringify(error.response.data)}`);
      }
    }
  };

  return (
    <div className={stylesMesa.formContainer}>
      <h3>Alterar Disponibilidade da Mesa</h3>
      {mensagemAlterar && <p className={styles.successMessage}>{mensagemAlterar}</p>}
      {erroAlterar && <p className={styles.errorMessage}>{erroAlterar}</p>}
      <form onSubmit={handleAlterarDisponibilidade} className={styles.form}>
        <div className={stylesMesa.formGroup}>
          <label htmlFor="idMesaAlterar" className={styles.label}>ID da Mesa:</label>
          <input
            type="number"
            id="idMesaAlterar"
            value={idMesaAlterar}
            onChange={(e) => setIdMesaAlterar(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={stylesMesa.formGroup}>
          <label htmlFor="novaDisponibilidade" className={styles.label}>Nova Disponibilidade:</label>
          <select
            id="novaDisponibilidade"
            value={novaDisponibilidade}
            onChange={(e) => setNovaDisponibilidade(e.target.value)}
            className={stylesMesa.select}
          >
            <option value="1">Disponível</option>
            <option value="2">Indisponível</option>
          </select>
        </div>
        <button type="submit" className={stylesMesa.button}>Alterar Disponibilidade</button>
      </form>
    </div>
  );
};



const ListarMesas = () => {
  const [mesas, setMesas] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchMesas = async () => {
      try {
        const response = await api.get('/mesas'); // Rota para obter todas as mesas
        setMesas(response.data);
      } catch (error) {
        console.error('Erro ao buscar mesas:', error);
        setErro('Erro ao buscar a lista de mesas. Por favor, tente novamente.');
        if (error.response && error.response.data) {
          setErro(`${erro} Detalhes: ${JSON.stringify(error.response.data)}`);
        }
      }
    };

    fetchMesas();
  }, []);

  return (
    <div className={stylesGetMesas.container}>
      <h2>Lista de Mesas</h2>
      {erro && <p className={styles.errorMessage}>{erro}</p>}
      {mesas.length > 0 ? (
        <ul className={stylesGetMesas.listaMesas}>
          {mesas.map(mesa => (
            <li key={mesa.idMesa} className={stylesGetMesas.itemMesa}>
              <strong>ID:</strong> {mesa.idMesa},
              <strong>Descrição:</strong> {mesa.descMesa},
              <strong>Disponibilidade:</strong> {mesa.dispMesa === 1 ? 'Disponível' : 'Indisponível'}.
              
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma mesa cadastrada.</p>
      )}
    </div>
  );
};


const CadastroMesaForm = () => {
  const [descMesa, setDescMesa] = useState('');
  const [dispMesa, setDispMesa] = useState('1'); // Inicializado como disponível
  const [capacidade, setCapacidade] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMensagem('');
    setErro('');

    const novaMesa = {
      descMesa: descMesa,
      dispMesa: parseInt(dispMesa),
      capacidade: parseInt(capacidade),
    };

    try {
      const response = await api.post('/mesas', novaMesa); // Ajuste a rota conforme sua API
      setMensagem('Mesa cadastrada com sucesso!');
      setDescMesa('');
      setDispMesa('1');
      setCapacidade('');
      console.log('Resposta do backend:', response.data); // Opcional: log da resposta
    } catch (error) {
      console.error('Erro ao cadastrar mesa:', error);
      setErro('Erro ao cadastrar a mesa. Por favor, tente novamente.');
      if (error.response && error.response.data) {
        setErro(`${erro} Detalhes: ${JSON.stringify(error.response.data)}`);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cadastro de Nova Mesa</h2>
      {mensagem && <p className={styles.successMessage}>{mensagem}</p>}
      {erro && <p className={styles.errorMessage}>{erro}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="descMesa" className={styles.label}>Descrição da Mesa:</label>
          <input
            type="text"
            id="descMesa"
            value={descMesa}
            onChange={(e) => setDescMesa(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="dispMesa" className={styles.label}>Disponibilidade:</label>
          <select
            id="dispMesa"
            value={dispMesa}
            onChange={(e) => setDispMesa(e.target.value)}
            className={styles.select}
          >
            <option value="1">Disponível</option>
            <option value="2">Indisponível</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="capacidade" className={styles.label}>Capacidade:</label>
          <input
            type="number"
            id="capacidade"
            value={capacidade}
            onChange={(e) => setCapacidade(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>Cadastrar Mesa</button>
      </form>
    </div>
  );
};

const MesaManagement = () => {
  return (
    <div >
      <div className='forms-container'>
      
      <CadastroMesaForm />
      
      <AlterarDisponibilidadeMesa />
      
      </div>
      

      <div className={stylesLista.container}>
      <ListarMesas />
      </div>
      
    </div>
    
  );
};

export default MesaManagement;