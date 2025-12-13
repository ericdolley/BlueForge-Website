import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

const services = [
  {
    title: "Product Strategy",
    description:
      "We translate visions into milestone-driven roadmaps, focusing on measurable metrics and delightful UX.",
  },
  {
    title: "End-to-end Development",
    description:
      "MERN-based architecture, automated pipelines, and scalable deployments so your startup grows confidently.",
  },
  {
    title: "Performance Optimization",
    description:
      "Observability, monitoring, and regression-proof QA give your digital experiences a reliable foundation.",
  },
];

const techStack = [
  "MongoDB",
  "Express",
  "React",
  "Node.js",
  "Tailwind CSS",
  "Vite",
  "AWS",
  "Vercel",
  "CI/CD",
];

const showcasedWebsites = [
  {
    title: "Lunar Finance",
    category: "Fintech",
    image:
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Verdant Health",
    category: "Health Tech",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Aurora Realty",
    category: "PropTech",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
  },
];

const HomePage = () => {
  const [ads, setAds] = useState([]);
  const [loadingAds, setLoadingAds] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchAds = async () => {
      try {
        const response = await API.get("/ads");
        if (isMounted) {
          setAds(response.data || []);
        }
      } catch (error) {
        console.error("Failed to load ads", error);
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
      <div className="relative rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 overflow-hidden shadow-xl">
        <div className="relative h-[28rem] md:h-80 overflow-hidden">
          {/* Sliding Photos Container */}
          <div className="flex absolute inset-0">
            {[
              "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
              "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
              "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
              "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
            ].map((img, index) => (
              <div
                key={index}
                className="absolute inset-0 w-full h-full transition-transform duration-1000 ease-in-out"
                style={{
                  transform: `translateX(${100 * index}%)`,
                  animation: `slide 20s infinite ${index * 5}s`,
                }}
              >
                <img
                  src={img}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-full object-cover opacity-30"
                />
              </div>
            ))}
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-between p-6 md:p-8">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm">
                🎯 SPECIAL OFFER
              </span>
              <div>
                <p className="text-white font-bold text-xl md:text-2xl">
                  Start Your New Career Now!
                </p>
                <p className="text-blue-100">
                  This is where you can find your place to be a part of.
                </p>
              </div>
            </div>
            <Link
              to="/contact"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
            >
              Start For Free →
            </Link>
          </div>
        </div>
      </div>

      {/* Add CSS for sliding animation */}
      <style jsx>{`
        @keyframes slide {
          0%,
          20% {
            transform: translateX(0%);
          }
          25%,
          45% {
            transform: translateX(-100%);
          }
          50%,
          70% {
            transform: translateX(-200%);
          }
          75%,
          95% {
            transform: translateX(-300%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
      <section className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-900/70 p-8 shadow-2xl shadow-slate-900/70">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-primary-300">
            BlueForge
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
            We are building a beautiful world together.
          </h1>
          <p className="text-lg text-slate-300">
            BlueForge is a lean website-developing company focused on empowering
            builders. We design, engineer, and ship experiences that help
            founders grow and hire exceptional talent.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-950 transition hover:bg-slate-200"
            >
              Contact us
            </Link>
            <Link
              to="/login" // Changed from /profile to /login
              className="rounded-full border border-white/70 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-primary-400"
            >
              Login
            </Link>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
            <p className="font-semibold text-white">Who we hire</p>
            <p>
              Front-end developers, Back-end developers, Full-stack developers,
              growth engineers, UI/UX designers, AI engineers, QA, and community
              builders.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 shadow-xl shadow-slate-900/60">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white">Our Services</h2>
            <p className="text-slate-400 mt-2">
              We adapt to your product phase with tailored solutions
            </p>
          </div>
          <div className="hidden md:block">
            <span className="text-xs uppercase tracking-[0.3em] text-primary-300">
              Full-cycle development
            </span>
          </div>
        </div>
        <div className="mt-6 grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group flex flex-col h-[380px] rounded-3xl border border-slate-800 bg-slate-950/60 p-8 transition-all duration-300 hover:border-primary-400 hover:translate-y-[-8px] hover:shadow-2xl hover:shadow-primary-900/20"
            >
              {/* Service Icon/Number */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-500/10 border border-primary-500/20">
                  <span className="text-primary-300 font-bold text-lg">
                    {services.indexOf(service) + 1}
                  </span>
                </div>
              </div>

              {/* Service Content */}
              <div className="flex-1 flex flex-col">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-3">
                  Service
                </p>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-slate-300 text-base flex-1">
                  {service.description}
                </p>

                {/* Learn More Link */}
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <Link
                    to="/contact"
                    className="inline-flex items-center text-primary-300 hover:text-primary-200 text-sm font-medium group-hover:translate-x-2 transition-transform"
                  >
                    Learn more
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services Button */}
        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-3 rounded-full border border-slate-700 bg-slate-900/50 px-8 py-4 text-sm font-semibold text-slate-200 transition hover:border-primary-400 hover:bg-slate-800/50"
          >
            <span>View all services</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </section>

      <section className="space-y-8 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-950/80 to-slate-900/80 p-8 shadow-2xl shadow-slate-950/60">
        <div className="flex flex-col gap-2">
          <p className="text-sm uppercase tracking-[0.3em] text-primary-300">
            Why join BlueForge?
          </p>
          <h2 className="text-3xl font-bold text-white">Build With Purpose</h2>
          <p className="text-slate-300">
            At BlueForge, we don’t just build websites—we engineer clean,
            scalable, and seamless digital experiences using the MERN stack.
            Every line of code you write contributes to products that matter.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
            <h3 className="text-xl font-semibold text-white">
              Modern Tech, Real Impact
            </h3>
            <p className="text-slate-300 text-sm">
              Work hands-on with MongoDB, Express, React, and Node.js in
              real-world projects. No outdated stacks, no unnecessary
              complexity—just modern, efficient development.
            </p>
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
            <h3 className="text-xl font-semibold text-white">
              Clean Code Culture
            </h3>
            <p className="text-slate-300 text-sm">
              We value readability, performance, and maintainability. If you
              care about writing elegant code, following best practices, and
              building things the right way, you'll feel at home here.
            </p>
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
            <h3 className="text-xl font-semibold text-white">
              Grow as a Developer
            </h3>
            <p className="text-slate-300 text-sm">
              Whether you're sharpening your front-end skills or mastering
              full-stack architecture, BlueForge provides opportunities to
              learn, experiment, and grow with experienced developers.
            </p>
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
            <h3 className="text-xl font-semibold text-white">
              Collaboration Over Hierarchy
            </h3>
            <p className="text-slate-300 text-sm">
              Your ideas matter. We encourage open discussions, code reviews,
              and teamwork where every developer's voice is heard and respected.
            </p>
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
            <h3 className="text-xl font-semibold text-white">
              Build Your Future With Us
            </h3>
            <p className="text-slate-300 text-sm">
              Join a company that invests in talent, values innovation, and
              believes great developers build great companies.
            </p>
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-6 bg-gradient-to-br from-primary-900/20 to-primary-800/10">
            <h3 className="text-xl font-semibold text-white">
              Ready to Make an Impact?
            </h3>
            <p className="text-slate-300 text-sm">
              If you're passionate about web development and the MERN stack,
              BlueForge is where your skills turn into impact.
            </p>
            <Link
              to="/signup"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-primary-400 transition-colors"
            >
              Join Our Team
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/40 p-8 shadow-xl shadow-slate-900/30">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold text-white">Ads & capabilities</h2>
          <p className="text-sm text-slate-400">
            Current initiatives we are showcasing to candidates and partners.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {loadingAds ? (
            <p className="text-center text-slate-400">Loading ads…</p>
          ) : ads.length === 0 ? (
            <p className="text-center text-slate-400">
              No active ads at the moment.
            </p>
          ) : (
            ads.map((ad) => (
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
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                    {ad.tagline || "Now hiring"}
                  </p>
                  <h3 className="text-xl font-semibold text-white">
                    {ad.title}
                  </h3>
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

      <div class="p-4 bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-900 dark:border-neutral-800">
        <div class="flex justify-between items-center gap-x-5 sm:gap-x-10">
          <div class="grow">
            <h2 class="text-sm text-gray-600 dark:text-neutral-400">
              By continuing to use this site you consent to the use of cookies
              in accordance with our{" "}
              <a
                class="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500"
                href="#"
              >
                Cookies Policy.
              </a>
            </h2>
          </div>
          <button
            type="button"
            class="p-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white dark:focus:bg-white/20 dark:focus:text-white"
            data-hs-remove-element="#cookies-simple-with-dismiss-button"
          >
            <span class="sr-only">Dismiss</span>
            <svg
              class="shrink-0 size-5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
