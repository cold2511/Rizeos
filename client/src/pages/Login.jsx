import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      navigate('/'); // redirect to homepage (JobList)
    } catch (err) {
      alert(err?.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block border border-gray-300 rounded p-2 mb-4 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block border border-gray-300 rounded p-2 mb-4 w-full"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 w-full rounded"
      >
        Login
      </button>

      <p className="mt-4 text-center text-sm">
        Don’t have an account?{' '}
        <a href="/register" className="text-blue-600 underline">
          Register here
        </a>
      </p>
    </div>
  );
}