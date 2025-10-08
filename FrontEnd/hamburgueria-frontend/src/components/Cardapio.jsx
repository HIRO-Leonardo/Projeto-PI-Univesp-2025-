import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Certifique-se de que o caminho de importação está correto!

function CardapioCompleto() {
    // 1. Estados para gerenciar a UI e os dados
    const [cardapio, setCardapio] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Hook useEffect para buscar dados na montagem do componente
    useEffect(() => {
        const fetchCardapio = async () => {
            try {
                // Requisição GET para o endpoint /cardapio
                const response = await api.get('/cardapio'); 
                
                // Sucesso: armazena os dados
                setCardapio(response.data); 
                setError(null);

            } catch (err) {
                console.error("Erro ao carregar cardápio:", err);
                // Trata o erro (404, 500, ou falha de rede)
                setError("Não foi possível carregar os itens do cardápio. Tente novamente.");
            } finally {
                // Define loading como falso, independentemente do sucesso ou falha
                setLoading(false);
            }
        };

        fetchCardapio();
    }, []); // O array vazio [] garante que a função só roda uma vez (na montagem)

    // 3. Lógica de Renderização Condicional

    // Exibe o estado de carregamento
    if (loading) {
        return (
            <div style={styles.card}>
                <h2 style={styles.header}>CARDÁPIO COMPLETO</h2>
                <p>Carregando cardápio...</p>
            </div>
        );
    }
    
    // Exibe mensagem de erro
    if (error) {
        return (
            <div style={styles.card}>
                <h2 style={styles.header}>CARDÁPIO COMPLETO</h2>
                <p style={{ color: 'red' }}>Erro: {error}</p>
            </div>
        );
    }

    // Exibe o cardápio completo
    return (
        <div style={styles.card}>
            <h2 style={styles.header}>CARDÁPIO COMPLETO</h2>
            
            {cardapio.length === 0 ? (
                <p>O cardápio está vazio.</p>
            ) : (
                <ul style={styles.list}>
                    {cardapio.map((item) => (
                        <li key={item.id} style={styles.listItem}>
                            <div style={styles.itemTitle}>{item.nomeCardapioDTO}</div>
                            <div style={styles.itemPrice}>R$ {item.precoCardapio.toFixed(2)}</div>
                            <div style={styles.itemDescription}>{item.descricaoDoCardapio}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

// 4. Estilos (Para replicar o visual da sua imagem)
const styles = {
    card: {
        padding: '20px',
        maxWidth: '600px',
        margin: '50px auto',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        textAlign: 'center',
    },
    header: {
        fontSize: '24px',
        paddingBottom: '10px',
        borderBottom: '1px solid #eee',
        marginBottom: '20px',
    },
    list: {
        listStyle: 'none',
        padding: 0,
    },
    listItem: {
        borderBottom: '1px dotted #ccc',
        padding: '10px 0',
        textAlign: 'left',
    },
    itemTitle: {
        fontWeight: 'bold',
        fontSize: '1.1em',
    },
    itemPrice: {
        float: 'right',
        fontWeight: 'bold',
        color: '#007bff',
    },
    itemDescription: {
        fontSize: '0.9em',
        color: '#666',
    },
};

export default CardapioCompleto;