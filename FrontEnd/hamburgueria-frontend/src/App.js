import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Pedidos from './components/Pedidos';
import NovoPedido from './components/NovoPedido';
import Reservas from './components/Reservas';
import Estoque from './components/Estoque';
import Cardapio from './components/Cardapio';
import Caixa from './components/Caixa';
import AdminDashboard from './admin/AdminDashboard';
import NovoPedidoCardapio from './components/NovoPedidoCardapio';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-red-100 to-orange-200 flex flex-col items-center p-8">
        <header className="text-center max-w-xl mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Lee Guzta – Sistema de Gestão
          </h1>
          <p className="text-lg sm:text-xl text-gray-700">
            Uma solução completa para o seu estabelecimento!
          </p>
        </header>

        <nav className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full max-w-6xl mb-12">
          <Link to="/pedidos" className="bg-white shadow-md rounded p-4 text-center hover:bg-red-100">
            <h2 className="font-bold text-red-600">Pedidos</h2>
          </Link>
          <Link to="/criar-pedido" className="bg-white shadow-md rounded p-4 text-center hover:bg-orange-100">
            <h2 className="font-bold text-orange-600">Novo Pedido</h2>
          </Link>
          <Link to="/pedidosCardapio" className="bg-white shadow-md rounded p-4 text-center hover:bg-gray-200">
            <h2 className="font-bold text-gray-700">pedidos para Cardapio</h2>
          </Link>
          <Link to="/reservas" className="bg-white shadow-md rounded p-4 text-center hover:bg-yellow-100">
            <h2 className="font-bold text-yellow-600">Reservas</h2>
          </Link>
          <Link to="/estoque" className="bg-white shadow-md rounded p-4 text-center hover:bg-green-100">
            <h2 className="font-bold text-green-600">Estoque</h2>
          </Link>
          <Link to="/cardapio" className="bg-white shadow-md rounded p-4 text-center hover:bg-blue-100">
            <h2 className="font-bold text-blue-600">Cardápio</h2>
          </Link>
          <Link to="/caixa" className="bg-white shadow-md rounded p-4 text-center hover:bg-purple-100">
            <h2 className="font-bold text-purple-600">Caixa</h2>
          </Link>
          <Link to="/admin" className="bg-white shadow-md rounded p-4 text-center hover:bg-gray-200">
            <h2 className="font-bold text-gray-700">Admin</h2>
          </Link>
        </nav>

        <main className="w-full">
          <Routes>
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/criar-pedido" element={<NovoPedido />} />
            <Route path="/pedidosCardapio" element={<NovoPedidoCardapio />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/estoque" element={<Estoque />} />
            <Route path="/cardapio" element={<Cardapio />} />
            <Route path="/caixa" element={<Caixa />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;