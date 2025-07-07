import { useState } from 'react';
import axios from 'axios';

export default function Match() {
  const [bio, setBio] = useState('');
  const [job, setJob] = useState('');
  const [score, setScore] = useState(null);

  const getMatchScore = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:3000/api/match',
        { bio, job },
        { headers: { 'x-auth-token': token } }
      );
      setScore(res.data.matchScore);
    } catch (err) {
      alert("Unauthorized or server error");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h2 className="text-2xl mb-4 font-bold">Job ↔ Applicant Match</h2>
      <form onSubmit={getMatchScore}>
        <textarea placeholder="Your Bio" value={bio}
          onChange={e => setBio(e.target.value)}
          className="w-full border p-3 mb-4 rounded h-24"
        />
        <textarea placeholder="Job Description" value={job}
          onChange={e => setJob(e.target.value)}
          className="w-full border p-3 mb-4 rounded h-24"
        />
        <button type="submit" className="bg-green-500 text-white py-2 px-6 rounded">
          Get Match Score
        </button>
      </form>
      {score !== null && (
        <div className="mt-6 text-lg">
          Match Score: <span className="font-bold">{(score * 100).toFixed(2)}%</span>
        </div>
      )}
    </div>
  );
}