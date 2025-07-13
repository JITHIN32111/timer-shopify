import React,{useState} from 'react';

export default function AddTimer() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    try {
      const res = await fetch('/api/timers/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMsg('✅ Timer created successfully');
        setForm({ title: '', description: '', startTime: '', endTime: '' });
      } else {
        setMsg(`❌ Error: ${data?.error || 'Something went wrong'}`);
      }
    } catch (err) {
      setMsg('❌ Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">🕒 Add Countdown Timer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="datetime-local"
          name="startTime"
          value={form.startTime}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="datetime-local"
          name="endTime"
          value={form.endTime}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? 'Saving...' : 'Create Timer'}
        </button>
      </form>
      {msg && <p className="mt-4 text-sm">{msg}</p>}
    </div>
  );
}
