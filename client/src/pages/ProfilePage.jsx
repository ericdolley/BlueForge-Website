import React, { useMemo, useState } from 'react';
import API from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { user, login } = useAuth();
  const [resumeFile, setResumeFile] = useState(null);
  const [portfolioFile, setPortfolioFile] = useState(null);
  const [projectZip, setProjectZip] = useState(null);
  const [portfolioLinks, setPortfolioLinks] = useState(user?.portfolioLinks || []);
  const [linkInput, setLinkInput] = useState('');
  const [status, setStatus] = useState('');

  const aggregatedFiles = useMemo(() => {
    const resume = user?.resumeFiles || [];
    const portfolio = user?.portfolioFiles || [];
    const projects = user?.projectFiles || [];
    return [
      { label: 'Resumes', files: resume },
      { label: 'Portfolios', files: portfolio },
      { label: 'Projects', files: projects }
    ];
  }, [user]);

  const handleSubmit = async event => {
    event.preventDefault();
    if (!resumeFile && !portfolioFile && !projectZip && portfolioLinks.length === (user?.portfolioLinks?.length || 0)) {
      setStatus('Add a file or portfolio link to upload.');
      return;
    }
    const formData = new FormData();
    if (resumeFile) {
      formData.append('resumeFile', resumeFile);
    }
    if (portfolioFile) {
      formData.append('portfolioFile', portfolioFile);
    }
    if (projectZip) {
      formData.append('projectZip', projectZip);
    }
    if (portfolioLinks.length) {
      formData.append('portfolioLinks', JSON.stringify(portfolioLinks));
    }
    setStatus('Uploading...');
    try {
      const response = await API.post('/uploads/profile', formData);
      login(localStorage.getItem('startup_auth_token'), response.data.user);
      setResumeFile(null);
      setPortfolioFile(null);
      setProjectZip(null);
      setStatus('Upload complete! Your profile is updated.');
    } catch (error) {
      setStatus(error.response?.data?.message || 'Upload failed, try again.');
    }
  };

  const handleAddLink = () => {
    const trimmed = linkInput.trim();
    if (!trimmed) return;
    if (portfolioLinks.includes(trimmed)) {
      setLinkInput('');
      return;
    }
    setPortfolioLinks([...portfolioLinks, trimmed]);
    setLinkInput('');
  };

  const handleRemoveLink = index => {
    setPortfolioLinks(portfolioLinks.filter((_, idx) => idx !== index));
  };

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center text-sm text-slate-300">
        You must be logged in to access this page.
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 sm:px-6 lg:px-8">
      <section className="space-y-3 rounded-3xl border border-slate-800 bg-slate-950/60 p-8 shadow-xl shadow-slate-950/40">
        <p className="text-sm uppercase tracking-[0.4em] text-primary-300">Profile Upload</p>
        <h1 className="text-3xl font-bold text-white">Share your expertise</h1>
        <p className="text-sm text-slate-400">
          Upload resumes, project ZIPs, and share portfolio links for our team to review. Each upload is stored safely in
          MongoDB for recruiters.
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
              Resume / CV
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={event => setResumeFile(event.target.files?.[0] || null)}
                className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
              Portfolio File
              <input
                type="file"
                accept=".pdf,.doc,.docx,.zip"
                onChange={event => setPortfolioFile(event.target.files?.[0] || null)}
                className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none"
              />
            </label>
          </div>
          <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
            Project ZIP
            <input
              type="file"
              accept=".zip"
              onChange={event => setProjectZip(event.target.files?.[0] || null)}
              className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none"
            />
          </label>
          <div className="space-y-2">
            <div className="flex gap-3">
              <input
                type="url"
                placeholder="https://portfolio.link"
                value={linkInput}
                onChange={event => setLinkInput(event.target.value)}
                className="flex-1 rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-primary-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddLink}
                className="rounded-2xl bg-primary-500 px-5 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-slate-950 transition hover:bg-primary-400"
              >
                Add link
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {portfolioLinks.map((link, index) => (
                <span
                  key={link + index}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs text-slate-200"
                >
                  <span className="truncate max-w-[12rem]">{link}</span>
                  <button type="button" onClick={() => handleRemoveLink(index)} className="text-rose-300">
                    Remove
                  </button>
                </span>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-2xl bg-primary-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-slate-950 transition hover:bg-primary-400"
          >
            Upload profile
          </button>
        </form>
        {status && <p className="text-sm text-primary-200">{status}</p>}
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8 shadow-lg shadow-slate-950/40">
        <h2 className="text-2xl font-semibold text-white">Uploaded assets</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {aggregatedFiles.map(bucket => (
            <div key={bucket.label} className="space-y-3 rounded-2xl border border-slate-800 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{bucket.label}</p>
              {bucket.files.length === 0 ? (
                <p className="text-sm text-slate-500">No files uploaded yet.</p>
              ) : (
                <ul className="space-y-2 text-sm text-slate-200">
                  {bucket.files.map(file => (
                    <li key={file.filename} className="space-y-1">
                      <a href={file.url} target="_blank" rel="noreferrer" className="text-primary-300 underline">
                        {file.originalName}
                      </a>
                      <p className="text-xs text-slate-500">{new Date(file.uploadedAt).toLocaleString()}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
