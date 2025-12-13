import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [ads, setAds] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyForm, setReplyForm] = useState({ email: '', subject: '', message: '' });
  const [newAd, setNewAd] = useState({
    title: '',
    description: '',
    cta: 'Learn more',
    imageUrl: '',
    tagline: ''
  });
  const [feedback, setFeedback] = useState('');

  const reloadData = async () => {
    setLoading(true);
    try {
      const [messagesResp, adsResp, usersResp] = await Promise.all([
        API.get('/admin/messages'),
        API.get('/admin/ads'),
        API.get('/admin/users')
      ]);
      setMessages(messagesResp.data);
      setAds(adsResp.data);
      setUsers(usersResp.data);
    } catch (error) {
      console.error('Admin fetch failed', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reloadData();
  }, []);

  const handleReply = async event => {
    event.preventDefault();
    if (!replyForm.email || !replyForm.message) {
      setFeedback('Recipient email and message are required');
      return;
    }
    try {
      await API.post('/admin/reply', replyForm);
      setFeedback('Reply sent successfully');
      setReplyForm({ email: '', subject: '', message: '' });
    } catch (error) {
      setFeedback(error.response?.data?.message || 'Could not send reply');
    }
  };

  const handleAdCreate = async event => {
    event.preventDefault();
    if (!newAd.title || !newAd.description || !newAd.imageUrl) {
      setFeedback('Title, description, and image URL are required for ads');
      return;
    }
    try {
      await API.post('/admin/ads', newAd);
      setFeedback('Ad published');
      setNewAd({ title: '', description: '', cta: 'Learn more', imageUrl: '', tagline: '' });
      reloadData();
    } catch (error) {
      setFeedback(error.response?.data?.message || 'Could not publish ad');
    }
  };

  const updateAd = async (id, payload) => {
    try {
      await API.put(`/admin/ads/${id}`, payload);
      reloadData();
    } catch (error) {
      console.error('Ad update failed', error);
    }
  };

  const handleSelectMessage = message => {
    setReplyForm({
      email: message.email,
      subject: `Re: ${message.name}`,
      message: ''
    });
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.4em] text-primary-300">Admin dashboard</p>
        <h1 className="text-4xl font-bold">Manage campaigns & candidates</h1>
        <p className="text-sm text-slate-400">Signed in as: {user?.email}</p>
      </div>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
          <h2 className="text-2xl font-semibold text-white">Reply to messages</h2>
          <form onSubmit={handleReply} className="mt-4 space-y-4">
            <input
              type="email"
              value={replyForm.email}
              onChange={event => setReplyForm({ ...replyForm, email: event.target.value })}
              placeholder="Recipient email"
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none"
            />
            <input
              type="text"
              value={replyForm.subject}
              onChange={event => setReplyForm({ ...replyForm, subject: event.target.value })}
              placeholder="Subject"
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none"
            />
            <textarea
              value={replyForm.message}
              onChange={event => setReplyForm({ ...replyForm, message: event.target.value })}
              placeholder="Message"
              rows={4}
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full rounded-2xl bg-primary-500 px-4 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-slate-950 transition hover:bg-primary-400"
            >
              Send reply
            </button>
          </form>
          {feedback && <p className="mt-3 text-sm text-primary-200">{feedback}</p>}
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
          <h2 className="text-2xl font-semibold text-white">Publish ads</h2>
          <form onSubmit={handleAdCreate} className="mt-4 space-y-3">
            <input
              type="text"
              value={newAd.title}
              onChange={event => setNewAd({ ...newAd, title: event.target.value })}
              placeholder="Title"
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none"
            />
            <textarea
              rows={2}
              value={newAd.description}
              onChange={event => setNewAd({ ...newAd, description: event.target.value })}
              placeholder="Description"
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none"
            />
            <input
              type="text"
              value={newAd.cta}
              onChange={event => setNewAd({ ...newAd, cta: event.target.value })}
              placeholder="CTA text"
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none"
            />
            <input
              type="text"
              value={newAd.imageUrl}
              onChange={event => setNewAd({ ...newAd, imageUrl: event.target.value })}
              placeholder="Image URL"
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none"
            />
            <input
              type="text"
              value={newAd.tagline}
              onChange={event => setNewAd({ ...newAd, tagline: event.target.value })}
              placeholder="Tagline (optional)"
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full rounded-2xl bg-primary-500 px-4 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-slate-950 transition hover:bg-primary-400"
            >
              Publish ad
            </button>
          </form>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3 rounded-3xl border border-slate-800 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
          <h2 className="text-2xl font-semibold text-white">Latest contacts</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className="space-y-3 text-sm text-slate-300">
              {messages.map(message => (
                <li
                  key={message._id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 transition hover:border-primary-400"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{message.email}</p>
                      <p className="text-lg font-semibold text-white">{message.name}</p>
                    </div>
                    <button
                      onClick={() => handleSelectMessage(message)}
                      className="rounded-full border border-primary-500 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-primary-200 transition hover:bg-primary-500/10"
                    >
                      Reply
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{message.message}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="space-y-3 rounded-3xl border border-slate-800 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
          <h2 className="text-2xl font-semibold text-white">Active ads</h2>
          <div className="space-y-3">
            {ads.map(ad => (
              <div key={ad._id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{ad.tagline || 'Campaign'}</p>
                    <p className="text-lg font-semibold text-white">{ad.title}</p>
                  </div>
                  <button
                    onClick={() => updateAd(ad._id, { active: !ad.active })}
                    className="rounded-full border border-white/40 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-white transition hover:bg-white/10"
                  >
                    {ad.active ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
                <p className="mt-2 text-sm text-slate-400">{ad.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
        <h2 className="text-2xl font-semibold text-white">Team snapshot</h2>
        <p className="mt-3 text-sm text-slate-400">
          {users.length} users are registered. {users.filter(u => u.role === 'admin').length} admins are set up.
        </p>
        <div className="mt-4 grid gap-3 text-sm text-slate-300">
          {users.slice(0, 6).map(u => (
            <div
              key={u._id}
              className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/50 px-4 py-3"
            >
              <span>{u.email}</span>
              <span className="text-[0.6rem] uppercase tracking-[0.4em] text-slate-500">{u.role}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
