import React, { useState } from 'react';
import API from '../services/api';

const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    setStatus('sending');
    try {
      await API.post('/contact', form);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setStatus(error.response?.data?.message || 'Submission failed. Please try again.');
    }
  };

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-16 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-950/60 p-10 shadow-2xl shadow-slate-950/40">
        <p className="text-sm uppercase tracking-[0.4em] text-primary-300">Contact</p>
        <h1 className="mt-4 text-4xl font-bold">Let&apos;s collaborate</h1>
        <p className="mt-2 text-slate-300">
          Share your project details, job openings, or developer scouting needs. We store every message in MongoDB
          and follow up with a personal reply.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              required
              placeholder="Name"
              className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none"
              value={form.name}
              onChange={event => setForm({ ...form, name: event.target.value })}
            />
            <input
              type="email"
              required
              placeholder="Email"
              className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none"
              value={form.email}
              onChange={event => setForm({ ...form, email: event.target.value })}
            />
          </div>
          <input
            type="tel"
            placeholder="Phone"
            className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none"
            value={form.phone}
            onChange={event => setForm({ ...form, phone: event.target.value })}
          />
          <textarea
            required
            rows="5"
            placeholder="Message"
            className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none"
            value={form.message}
            onChange={event => setForm({ ...form, message: event.target.value })}
          />
          <button
            type="submit"
            className="rounded-2xl bg-primary-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-slate-950 transition hover:bg-primary-400"
          >
            Send message
          </button>
        </form>
        {status && (
          <p className="mt-4 text-sm text-primary-200">
            {status === 'sending' ? 'Submitting message...' : status}
          </p>
        )}
      </section>
    </div>
  );
};

export default ContactPage;
