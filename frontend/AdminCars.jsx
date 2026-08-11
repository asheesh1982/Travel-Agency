import { useEffect, useState } from 'react';
import { api } from '../../lib/api.js';

const empty = {
  name: '',
  make: '',
  model: '',
  year: 2024,
  category: 'economy',
  seats: 4,
  transmission: 'automatic',
  price_per_day: 40,
  image_url: '',
  description: '',
};

export default function AdminCars() {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);

  function load() {
    api.getCars().then(({ cars }) => setCars(cars));
  }
  useEffect(load, []);

  function updateField(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (editingId) await api.adminUpdateCar(editingId, form);
    else await api.adminCreateCar(form);
    setForm(empty);
    setEditingId(null);
    load();
  }

  function edit(car) {
    setForm(car);
    setEditingId(car.id);
  }

  async function remove(id) {
    await api.adminDeleteCar(id);
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl mb-6">Fleet</h1>
      <form onSubmit={handleSubmit} className="bg-surface rounded-2xl p-6 border border-black/10 grid grid-cols-2 gap-3 mb-8">
        <input placeholder="Name" value={form.name} onChange={(e) => updateField('name', e.target.value)} className="px-3 py-2 rounded-lg border border-black/10" required />
        <input placeholder="Make" value={form.make} onChange={(e) => updateField('make', e.target.value)} className="px-3 py-2 rounded-lg border border-black/10" required />
        <input placeholder="Model" value={form.model} onChange={(e) => updateField('model', e.target.value)} className="px-3 py-2 rounded-lg border border-black/10" required />
        <input type="number" placeholder="Year" value={form.year} onChange={(e) => updateField('year', Number(e.target.value))} className="px-3 py-2 rounded-lg border border-black/10" required />
        <select value={form.category} onChange={(e) => updateField('category', e.target.value)} className="px-3 py-2 rounded-lg border border-black/10">
          <option value="economy">Economy</option>
          <option value="suv">SUV</option>
          <option value="luxury">Luxury</option>
          <option value="van">Van</option>
        </select>
        <select value={form.transmission} onChange={(e) => updateField('transmission', e.target.value)} className="px-3 py-2 rounded-lg border border-black/10">
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
        </select>
        <input type="number" placeholder="Seats" value={form.seats} onChange={(e) => updateField('seats', Number(e.target.value))} className="px-3 py-2 rounded-lg border border-black/10" required />
        <input type="number" placeholder="Price / day" value={form.price_per_day} onChange={(e) => updateField('price_per_day', Number(e.target.value))} className="px-3 py-2 rounded-lg border border-black/10" required />
        <input placeholder="Image URL (optional)" value={form.image_url || ''} onChange={(e) => updateField('image_url', e.target.value)} className="px-3 py-2 rounded-lg border border-black/10 col-span-2" />
        <textarea placeholder="Description" value={form.description || ''} onChange={(e) => updateField('description', e.target.value)} className="px-3 py-2 rounded-lg border border-black/10 col-span-2" />
        <div className="col-span-2 flex gap-3">
          <button className="bg-coral text-white px-6 py-2 rounded-full font-semibold">
            {editingId ? 'Save changes' : 'Add car'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setForm(empty);
                setEditingId(null);
              }}
              className="px-6 py-2 rounded-full border border-black/10"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {cars.map((car) => (
          <div key={car.id} className="bg-surface rounded-2xl p-4 border border-black/10 flex items-center justify-between">
            <div>
              <p className="font-display">{car.name}</p>
              <p className="text-sm text-muted">
                {car.category} · {car.seats} seats · ${car.price_per_day}/day · {car.status}
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => edit(car)} className="text-gold/70 font-medium">
                Edit
              </button>
              <button onClick={() => remove(car.id)} className="text-red-400 font-medium">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
