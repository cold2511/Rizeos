import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [bio, setBio] = useState('');
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchJob = async () => {
      const res = await axios.get(`http://localhost:3000/api/jobs/${id}`);
      setJob(res.data);
    };
    fetchJob();
  }, [id]);

  const apply = async () => {
    const token = localStorage.getItem('token');
    await axios.post(`http://localhost:3000/api/jobs/${id}/apply`, { bio }, {
      headers: { 'x-auth-token': token }
    });
    alert('Applied!');
  };

  const loadApplicants = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`http://localhost:3000/api/jobs/${id}/applicants`, {
      headers: { 'x-auth-token': token }
    });
    setApplicants(res.data);
  };

  if (!job) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p>{job.description}</p>

      <textarea placeholder="Your Bio" value={bio} onChange={e => setBio(e.target.value)} className="block w-full border p-2 my-4" />
      <button onClick={apply} className="bg-green-600 text-white px-4 py-2 mr-2">Apply</button>
      <button onClick={loadApplicants} className="bg-gray-600 text-white px-4 py-2">Load Applicants</button>

      <ul className="mt-4">
        {applicants.map((a) => (
          <li key={a._id} className="border p-2 my-2">
            <p><strong>{a.applicant}</strong></p>
            <p>{a.bio}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}