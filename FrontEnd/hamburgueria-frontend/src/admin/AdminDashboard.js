import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import MesasLayout from './MesasLayout';
import CardapioAdmin from './CardapioAdmin';
import EstoqueAdmin from './EstoqueAdmin';
import HorarioFunc from './HorarioFunc';
import Usuarios from './Usuarios';
import RelatorioVendas from './relatorioVendas';

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Painel Administrativo</h1>

      <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <Link to="/admin/mesas" className="bg-yellow-200 p-4 rounded shadow text-center">Layout de Mesas</Link>
        <Link to="/admin/cardapio" className="bg-blue-200 p-4 rounded shadow text-center">Cardápio</Link>
        <Link to="/admin/estoque" className="bg-green-200 p-4 rounded shadow text-center">Estoque</Link>
        <Link to="/admin/horario" className="bg-indigo-200 p-4 rounded shadow text-center">Horário</Link>
        <Link to="/admin/usuarios" className="bg-red-200 p-4 rounded shadow text-center">Usuários</Link>
         <Link to="/admin/RelatorioVendas" className="bg-red-200 p-4 rounded shadow text-center">Relatorio Vendas</Link>
      </nav>

      <Routes>
        <Route path="mesas" element={<MesasLayout />} />
        <Route path="cardapio" element={<CardapioAdmin />} />
        <Route path="estoque" element={<EstoqueAdmin />} />
        <Route path="horario" element={<HorarioFunc />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="relatorioVendas" element={<RelatorioVendas />} />
      </Routes>
    </div>
  );
}

export default AdminDashboard;