import { useEffect, useState } from 'react';
import { api } from '../services/api';
export function MenuPage() {
  const [items, setItems] = useState([]);
  useEffect(()=>{
    api.get('menu/').then(res => setItems(res.data));
  },[]);
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(i=>(
        <div key={i.id} className="border rounded p-4 shadow">
          <h3 className="text-xl">{i.name}</h3>
          <p>R$ {i.price}</p>
        </div>
      ))}
    </div>
  );
}
