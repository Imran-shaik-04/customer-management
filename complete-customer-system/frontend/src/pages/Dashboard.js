import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', pincode: '' });
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchCustomers = async () => {
    const res = await axios.get('http://localhost:5000/api/customers');
    setCustomers(res.data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const pinRegex = /^\d{6}$/;
    if (!form.name || !emailRegex.test(form.email) || !phoneRegex.test(form.phone) || !pinRegex.test(form.pincode)) {
      alert("Invalid input!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingId) {
      await axios.put('http://localhost:5000/api/customers/${editingId}', form);
      setEditingId(null);
    } else {
      await axios.post('http://localhost:5000/api/customers', form);
    }
    setForm({ name: '', email: '', phone: '', address: '', pincode: '' });
    fetchCustomers();
  };

  const handleEdit = (customer) => {
    setForm(customer);
    setEditingId(customer.id);
  };

  const handleDelete = async (id) => {
    await axios.delete('http://localhost:5000/api/customers/${id}');
    fetchCustomers();
  };

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>Customer Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
        <input placeholder="Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
        <input placeholder="Pincode" value={form.pincode} onChange={e => setForm({ ...form, pincode: e.target.value })} required />
        <button type="submit">{editingId ? 'Update' : 'Add'} Customer</button>
      </form>

      <input
        placeholder="Search by name or email"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginTop: '20px', width: '100%' }}
      />

      <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Pincode</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.address}</td>
              <td>{c.pincode}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Edit</button>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;