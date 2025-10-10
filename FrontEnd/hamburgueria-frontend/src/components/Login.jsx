import React, { useState } from 'react';
import axios from 'axios'; 
// Certifique-se de que a instância 'api' ou 'axios' que você usa aqui é a correta.
// Usarei 'axios' para a requisição de login, pois ela não precisa do token.

const LOGIN_URL = 'http://localhost:8080/auth/login'; // Endpoint público do Spring

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // Removendo setAuthToken do useState por simplicidade, faremos isso no final da função
    // const [authToken, setAuthToken] = useState(localStorage.getItem('jwtToken') || ''); 

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            // 1. REQUISIÇÃO AXIOS
            const response = await axios.post(LOGIN_URL, { email, password });
            
            // 2. CORREÇÃO CRÍTICA: O Axios coloca o JSON diretamente em response.data
            const token = response.data.token; 
            
            // 3. Verifica se o token existe (o Spring garante o sucesso com 200 OK)
            if (token) {
                alert("Login bem-sucedido! Token armazenado.");
                
                // 4. ARMAZENAMENTO E ATUALIZAÇÃO DO ESTADO
                localStorage.setItem('jwtToken', token);
                
                // Em uma aplicação real, você faria um redirecionamento aqui.
                // Exemplo: window.location.href = '/dashboard'; 
                window.location.href = '/'; // Redireciona para a página inicial ou dashboard
            } else {
                 // Este bloco só deve ser atingido se o backend retornar 200, mas sem o token
                 setError("Resposta de sucesso, mas o servidor não enviou o token.");
            }

        } catch (err) {
            // O Axios já lida com o status !2xx, lançando o erro no bloco catch
            if (err.response && err.response.status === 401) {
                setError('Credenciais inválidas. Tente novamente.');
            } else if (err.response) {
                 // Trata outros erros do backend, como 400 ou 500
                setError(`Erro do servidor: ${err.response.status}`);
            } else {
                setError('Erro de conexão. Verifique se o backend está ativo.');
            }
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', maxWidth: '400px', margin: '50px auto' }}>
            <h2>Login:</h2>
            <form onSubmit={handleLogin}>
                 {/* ... Seus inputs e JSX ... */}
                 <div style={{ marginBottom: '15px' }}>
                    <label>E-mail:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
                    Entrar
                </button>
            </form>
        </div>
    );
}

export default LoginPage;