import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';

const VerifyPage = () => {
  const { token } = useParams();
  const [status, setStatus] = useState('verifying');

  useEffect(() => {
    const verify = async () => {
      try {
        await API.get(`/auth/verify/${token}`);
        setStatus('success');
      } catch (error) {
        setStatus('error');
      }
    };
    verify();
  }, [token]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-20">
      <div className="max-w-xl rounded-3xl border border-slate-800 bg-slate-950/70 p-10 text-center shadow-2xl shadow-slate-900/60">
        {status === 'verifying' && <p className="text-sm text-slate-300">Verifying your account…</p>}
        {status === 'success' && (
          <>
            <h1 className="mt-4 text-3xl font-bold text-white">Verified!</h1>
            <p className="mt-2 text-sm text-slate-300">Thank you! You can now log in to upload your profile.</p>
            <Link
              to="/"
              className="mt-6 inline-flex rounded-full bg-primary-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-slate-950 transition hover:bg-primary-400"
            >
              Return home
            </Link>
          </>
        )}
        {status === 'error' && (
          <>
            <h1 className="mt-4 text-3xl font-bold text-white">Link invalid</h1>
            <p className="mt-2 text-sm text-slate-300">Got a broken link? Please request a new verification email.</p>
            <Link
              to="/"
              className="mt-6 inline-flex rounded-full border border-primary-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-white transition hover:bg-primary-500/20"
            >
              Back to home
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyPage;
