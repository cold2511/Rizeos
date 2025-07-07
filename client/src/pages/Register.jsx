import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/auth/register', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/'); // Go to home after registration
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="block border p-2 mb-2 w-full" />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="block border p-2 mb-2 w-full" />
      <button onClick={handleRegister} className="bg-green-600 text-white px-4 py-2 w-full">Register</button>
    </div>
  );
}