import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PostJob() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    skills: '',
    location: '',
    tags: '',
  });
  const [allowed, setAllowed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkPayment = async () => {
      const token = localStorage.getItem('token');
      const wallet = localStorage.getItem('wallet');
      if (!wallet) return navigate('/payment');
      const res = await axios.get(`http://localhost:3000/api/payment/verify/${wallet}`, {
        headers: { 'x-auth-token': token },
      });
      if (!res.data.paid) navigate('/payment');
      else setAllowed(true);
    };
    checkPayment();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitJob = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:3000/api/jobs',
        {
          ...form,
          skills: form.skills.split(',').map(s => s.trim()),
          tags: form.tags.split(',').map(t => t.trim()),
        },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      alert('✅ Job posted!');
      navigate('/');
    } catch (err) {
      alert('❌ Failed to post job');
      console.error(err);
    }
  };

  if (!allowed) return <p className="p-4">🔐 Verifying payment...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Post a Job</h1>
      <input name="title" placeholder="Job Title" onChange={handleChange} className="block border p-2 mb-4 w-full" />
      <textarea name="description" placeholder="Job Description" onChange={handleChange} className="block border p-2 mb-4 w-full" />
      <input name="skills" placeholder="Skills (comma-separated)" onChange={handleChange} className="block border p-2 mb-4 w-full" />
      <input name="location" placeholder="Location" onChange={handleChange} className="block border p-2 mb-4 w-full" />
      <input name="tags" placeholder="Tags (comma-separated)" onChange={handleChange} className="block border p-2 mb-4 w-full" />
      <button onClick={submitJob} className="bg-blue-600 text-white px-4 py-2 rounded w-full">Post Job</button>
    </div>
  );
}