import api from '../services/api';
import React, { useState, useEffect } from 'react';

// Importação de api (configurado com Interceptor JWT)

const ESTOQUE_URL = '/estoque'; 

// --- Componente de Cadastro (POST) ---
// Recebe a função de recarregamento do pai
const CadastroItemEstoque = ({ fetchEstoque }) => {
    // CORRIGIDO: Nomes de estado e inicialização para o DTO
    const [descProduto, setDescProduto] = useState('');
    const [quantProduto, setQuantProduto] = useState('');
    const [precoProduto, setPrecoProduto] = useState('');
  
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensagem('');
        setErro('');

        // 1. CONSTRUÇÃO DO PAYLOAD CORRETO
        const novoItem = {
            descProduto,
            // Garante que os números sejam enviados como tipo correto
            precoProduto: parseFloat(precoProduto), 
            quantProduto: parseInt(quantProduto), 
        };

        try {
            await api.post(ESTOQUE_URL, novoItem);
            setMensagem(`Produto "${descProduto}" cadastrado com sucesso!`);
            
            // Limpa o formulário e chama a função para recarregar a lista
            setDescProduto('');
            setQuantProduto('');
            setPrecoProduto('');
            fetchEstoque(); // ⬅️ CHAMA O RECARREGAMENTO DO COMPONENTE PAI

        } catch (error) {
            console.error('Erro ao cadastrar item:', error);
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                setErro('Acesso negado. Por favor, faça login.');
                localStorage.removeItem('jwtToken');
            } else {
                setErro('Erro ao cadastrar o item. Verifique os dados.');
            }
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg h-fit">
            <h2 className="text-xl font-bold mb-4 text-green-700">Cadastrar Item no Estoque</h2>
            {mensagem && <p className="text-green-600 mb-3">{mensagem}</p>}
            {erro && <p className="text-red-500 mb-3">{erro}</p>}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Campo descProduto */}
                <div className="flex flex-col">
                    <label htmlFor="descProduto" className="block text-sm font-medium text-gray-700">Descrição:</label>
                    <input
                        type="text"
                        id="descProduto"
                        value={descProduto}
                        onChange={(e) => setDescProduto(e.target.value)}
                        required
                        className="mt-1 border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                
                {/* Campo precoProduto */}
                <div className="flex flex-col">
                    <label htmlFor="precoProduto" className="block text-sm font-medium text-gray-700">Preço:</label>
                    <input
                        type="number"
                        id="precoProduto"
                        value={precoProduto}
                        onChange={(e) => setPrecoProduto(e.target.value)}
                        step="0.01"
                        required
                        className="mt-1 border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                
                {/* Campo quantProduto */}
                <div className="flex flex-col">
                    <label htmlFor="quantProduto" className="block text-sm font-medium text-gray-700">Quantidade:</label>
                    <input
                        type="number"
                        id="quantProduto"
                        value={quantProduto}
                        onChange={(e) => setQuantProduto(e.target.value)}
                        required
                        className="mt-1 border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                
                <button type="submit" className="w-full py-2 px-4 rounded-md shadow-md text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                    Cadastrar
                </button>
            </form>
        </div>
    );
};


// --- Componente de Listagem (GET) ---
const ListarItensEstoque = ({ estoque, loading, error }) => {
    
    // Mapeamento dos campos do DTO na exibição
    const EstoqueItem = ({ item }) => {
        const precoFormatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(item.precoProduto || 0);

        return (
            <li className="flex justify-between items-center bg-gray-50 p-3 rounded-md border border-gray-200">
                <div className="text-left">
                    <strong className="text-gray-900">{item.descProduto}</strong>
                    <span className="block text-sm text-gray-500">ID: {item.id}</span>
                </div>
                <div className="text-right">
                    <span className="block text-lg font-bold text-red-600">{precoFormatado}</span>
                    <span className="block text-sm text-green-700">Qtd: {item.quantProduto}</span>
                </div>
            </li>
        );
    };

    if (loading) return <p className="p-4 text-center text-gray-500 bg-white rounded-lg shadow-md">Carregando estoque...</p>;
    
    if (error) return <p className="p-4 text-center text-red-600 bg-red-100 rounded-lg shadow-md border border-red-300">Erro ao buscar: {error}</p>;

    return (
        <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4 text-gray-700">Itens em Estoque</h2>
            {estoque.length === 0 ? (
                <p className="p-4 text-center text-gray-500 bg-white rounded-lg shadow-md border border-dashed">Estoque vazio.</p>
            ) : (
                <ul className="space-y-3">
                    {estoque.map(item => (
                        <EstoqueItem key={item.id} item={item} />
                    ))}
                </ul>
            )}
        </div>
    );
};

// --- Componente Gestor (Main) ---
const EstoqueAdmin = () => {
    const [estoque, setEstoque] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Função que busca os dados da API
    const fetchEstoque = async () => {
        setLoading(true);
        try {
            const response = await api.get(ESTOQUE_URL);
            setEstoque(response.data);
            setError(null);
        } catch (error) {
            console.error('Erro ao buscar estoque:', error);
            setError('Não foi possível buscar o estoque.');
        } finally {
            setLoading(false);
        }
    };

    // Carrega a lista quando o componente é montado
    useEffect(() => {
        fetchEstoque();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
                    Controle de Estoque
                </h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 1. Componente de Cadastro (Chama fetchEstoque para recarregar) */}
                    <CadastroItemEstoque fetchEstoque={fetchEstoque} />
                    
                    {/* 2. Componente de Listagem (Recebe os dados do estado) */}
                    <ListarItensEstoque 
                        estoque={estoque} 
                        loading={loading} 
                        error={error} 
                    />
                </div>
            </div>
        </div>
    );
};

export default EstoqueAdmin;
  