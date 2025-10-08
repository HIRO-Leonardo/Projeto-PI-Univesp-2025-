import React, { useState } from 'react';

// Seu endpoint público de registro no Spring Boot
const REGISTER_URL = 'http://localhost:8080/auth/register'; 

function RegisterPage() {
    // Hooks de Estado para o formulário e mensagens
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    
    const handleRegister = async (e) => {
        e.preventDefault(); // Impede o recarregamento da página
        setMessage('');
        setError('');

        try {
            // Requisição com fetch para o endpoint do Spring
            const response = await fetch(REGISTER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({  email, password, name })
            });
            
            // 1. Processamento da Resposta do Servidor
            if (response.ok || response.status === 201) { // 201 Created é comum para registro
                
                // Sucesso
                setMessage('Cadastro realizado com sucesso! Você já pode fazer login.');
                
                // Limpa o formulário após o sucesso
                setName('');
                setEmail('');
                setPassword('');

            } else {
                // Falha (Ex: 409 Conflict se o usuário já existe)
                const errorData = await response.json();
                
                if (response.status === 409) {
                    setError(`Falha: ${errorData.message || 'Usuário ou e-mail já estão em uso.'}`);
                } else {
                     setError(`Erro ao registrar: ${errorData.message || response.statusText}`);
                }
            }

        } catch (err) {
            // Erro de rede ou conexão
            setError('Erro ao conectar com o servidor. Verifique se o backend está ativo.');
            console.error(err);
        }
    };

    // Estrutura JSX (HTML) do componente
    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Criar Nova Conta</h2>
            <form onSubmit={handleRegister} style={styles.form}>
                
                {/* Campo Usuário */}
                <div style={styles.inputGroup}>
                    <label htmlFor="username">Usuário</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                {/* Campo Email */}
                <div style={styles.inputGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                {/* Campo Senha */}
                <div style={styles.inputGroup}>
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                
                {/* Mensagens de Feedback */}
                {message && <p style={styles.successMessage}>{message}</p>}
                {error && <p style={styles.errorMessage}>{error}</p>}
                
                <button type="submit" style={styles.submitButton}>
                    Registrar
                </button>
            </form>
        </div>
    );
}

// Estilos básicos (CSS-in-JS)
const styles = {
    container: {
        padding: '30px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        maxWidth: '450px',
        margin: '50px auto',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    },
    header: {
        textAlign: 'center',
        marginBottom: '25px',
        color: '#333'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    inputGroup: {
        marginBottom: '15px',
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        marginTop: '5px',
    },
    submitButton: {
        padding: '12px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#28a745', /* Cor verde para registro */
        color: 'white',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '10px'
    },
    successMessage: {
        marginBottom: '15px',
        textAlign: 'center',
        color: 'green'
    },
    errorMessage: {
        marginBottom: '15px',
        textAlign: 'center',
        color: 'red'
    }
};

export default RegisterPage;