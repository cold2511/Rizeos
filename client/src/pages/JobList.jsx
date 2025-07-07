import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ skill: '', location: '', tag: '' });
  const [topSkills, setTopSkills] = useState([]);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const query = `?skill=${filters.skill}&location=${filters.location}&tag=${filters.tag}`;
      const res = await axios.get(`http://localhost:3000/api/jobs${query}`);
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleResumeUpload = async () => {
    if (!file) return alert('Please select a file');
    const formData = new FormData();
    formData.append('resume', file);
    try {
      const res = await axios.post('http://localhost:3000/api/match/extract', formData);
      setTopSkills(res.data.topSkills || []);
    } catch (err) {
      alert('Failed to extract skills');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Available Jobs</h1>
        <button
          onClick={() => navigate('/post')}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          ➕ Post a Job
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <input name="skill" placeholder="Filter by skill" onChange={handleChange} className="border p-2 flex-1" />
        <input name="location" placeholder="Filter by location" onChange={handleChange} className="border p-2 flex-1" />
        <input name="tag" placeholder="Filter by tag" onChange={handleChange} className="border p-2 flex-1" />
        <button
          onClick={fetchJobs}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          🔍 Search
        </button>
      </div>

      <div className="my-6 border p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">🔎 Upload Resume to Extract Skills</h2>
        <input type="file" onChange={e => setFile(e.target.files[0])} className="mb-2" />
        <button
          onClick={handleResumeUpload}
          className="bg-purple-600 text-white px-4 py-1 rounded"
        >
          Extract Top Skills
        </button>

        {topSkills.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold">Top Skills:</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {topSkills.map((skill, i) => <li key={i}>{skill}</li>)}
            </ul>
          </div>
        )}
      </div>

      <div className="grid gap-4">
        {jobs.length === 0 && <p>No jobs found.</p>}
        {jobs.map(job => (
          <div
            key={job._id}
            className="border rounded p-4 cursor-pointer hover:shadow"
            onClick={() => navigate(`/job/${job._id}`)}
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-sm text-gray-600">{job.location}</p>
            <p className="mt-2 text-gray-800">{job.description.slice(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}