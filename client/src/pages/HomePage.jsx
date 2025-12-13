import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthPanel from '../components/AuthPanel';
import API from '../services/api';

const services = [
  {
    title: 'Product Strategy',
    description: 'We translate visions into milestone-driven roadmaps, focusing on measurable metrics and delightful UX.'
  },
  {
    title: 'End-to-end Development',
    description: 'MERN-based architecture, automated pipelines, and scalable deployments so your startup grows confidently.'
  },
  {
    title: 'Performance Optimization',
    description: 'Observability, monitoring, and regression-proof QA give your digital experiences a reliable foundation.'
  }
];

const techStack = ['MongoDB', 'Express', 'React', 'Node.js', 'Tailwind CSS', 'Vite', 'AWS', 'Vercel', 'CI/CD'];

const whyJoin = [
  'Work across high-impact startup projects.',
  'Mentorship-focused pods with senior engineers.',
  'Remote-first culture with flexible collaboration.',
  'Competitive compensation and ownership.'
];

const showcasedWebsites = [
  {
    title: 'Lunar Finance',
    category: 'Fintech',
    image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Verdant Health',
    category: 'Health Tech',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Aurora Realty',
    category: 'PropTech',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80'
  }
];

const HomePage = () => {
  const [ads, setAds] = useState([]);
  const [loadingAds, setLoadingAds] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchAds = async () => {
      try {
        const response = await API.get('/ads');
        if (isMounted) {
          setAds(response.data || []);
        }
      } catch (error) {
        console.error('Failed to load ads', error);
      } finally {
        if (isMounted) setLoadingAds(false);
      }
    };
    fetchAds();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-20 px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-900/70 p-6 shadow-2xl shadow-slate-900/70 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-primary-300">BlueForge</p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
            We are building a beautiful world together.
          </h1>
          <p className="text-lg text-slate-300">
            BlueForge is a lean website-developing company focused on empowering builders. We design, engineer, and ship
            experiences that help founders grow and hire exceptional talent.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-950 transition hover:bg-slate-200"
            >
              Contact us
            </Link>
            <Link
              to="/profile"
              className="rounded-full border border-white/70 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-primary-400"
            >
              Upload portfolio
            </Link>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
            <p className="font-semibold text-white">Who we hire</p>
            <p>Front-end developers, Back-end developers, Full-stack developers, growth engineers, UI/UX designers, AI engineers, QA, and community builders.</p>
          </div>
        </div>
        <div>
          <AuthPanel />
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 shadow-xl shadow-slate-900/60">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Our Services</h2>
          <p className="text-sm text-slate-400">We adapt to your product phase.</p>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {services.map(service => (
            <div
              key={service.title}
              className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-5 transition hover:border-primary-400"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Service</p>
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-sm text-slate-300">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-950/80 to-slate-900/80 p-8 shadow-2xl shadow-slate-950/60">
        <div className="flex flex-col gap-2">
          <p className="text-sm uppercase tracking-[0.3em] text-primary-300">What we build with</p>
          <h2 className="text-3xl font-bold text-white">Tech stack & infrastructure</h2>
        </div>
        <div className="flex flex-wrap gap-4 pt-3">
          {techStack.map(tech => (
            <span
              key={tech}
              className="rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/50 p-8 shadow-xl shadow-slate-950/50">
          <h2 className="text-3xl font-bold text-white">Why join BlueForge?</h2>
          <ul className="space-y-3 text-sm text-slate-300">
            {whyJoin.map(item => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Remote-first · Mentorship · Ownership</p>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-white">Recent launches</h3>
          <div className="space-y-4">
            {showcasedWebsites.map(site => (
              <div
                key={site.title}
                className="group relative rounded-3xl border border-slate-800 transition hover:border-primary-400"
              >
                <img
                  src={site.image}
                  alt={site.title}
                  className="h-52 w-full rounded-3xl object-cover shadow-lg shadow-slate-900/60"
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-200">{site.category}</p>
                  <h4 className="mt-2 text-xl font-semibold text-white">{site.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/40 p-8 shadow-xl shadow-slate-900/30">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold text-white">Ads & capabilities</h2>
          <p className="text-sm text-slate-400">Current initiatives we are showcasing to candidates and partners.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {loadingAds ? (
            <p className="text-center text-slate-400">Loading ads…</p>
          ) : ads.length === 0 ? (
            <p className="text-center text-slate-400">No active ads at the moment.</p>
          ) : (
            ads.map(ad => (
              <article
                key={ad._id}
                className="flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-950/80 p-5 shadow-lg shadow-slate-950/40"
              >
                <img
                  src={ad.imageUrl}
                  alt={ad.title}
                  className="h-40 w-full rounded-2xl object-cover object-top shadow-inner shadow-slate-900/50"
                />
                <div className="mt-4 space-y-2">
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{ad.tagline || 'Now hiring'}</p>
                  <h3 className="text-xl font-semibold text-white">{ad.title}</h3>
                  <p className="text-sm text-slate-300">{ad.description}</p>
                </div>
                <button className="mt-4 rounded-full bg-primary-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-slate-950">
                  {ad.cta}
                </button>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
