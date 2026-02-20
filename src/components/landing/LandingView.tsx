'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FlowingLines } from './FlowingLines';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  hidden: {},
};

const features = [
  {
    title: 'Swing & vote share',
    description: "See where you're gaining and where to focus.",
    color: 'blue',
    icon: '📊',
  },
  {
    title: 'Risk & opportunity',
    description: 'Clear view of booths that need attention or can deliver more.',
    color: 'amber',
    icon: '🎯',
  },
  {
    title: 'AI recommendations',
    description: 'Plain-language next steps for your campaign.',
    color: 'green',
    icon: '✓',
  },
];

export function LandingView() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Nav - transparent over hero, solid white after scroll */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-gray-200/80 bg-white/95 shadow-sm backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className={`flex items-center gap-2 transition-colors ${
              scrolled ? 'text-gray-900' : 'text-white'
            }`}
          >
            <span className="text-xl font-semibold">PoliIntel</span>
            <span
              className={`rounded px-1.5 py-0.5 text-xs font-medium ${
                scrolled ? 'bg-blue-100 text-blue-700' : 'bg-white/20 text-white'
              }`}
            >
              AI
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className={`text-sm font-medium transition-colors ${
                scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/90 hover:text-white'
              }`}
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className={`rounded-[12px] px-4 py-2 text-sm font-medium transition-all ${
                scrolled
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'border border-white/80 bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Get started
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Hero - vibrant dark blue with flowing lines */}
      <section className="relative min-h-[90vh] bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f172a]">
        <FlowingLines />
        <div className="relative mx-auto max-w-6xl px-6 pt-36 pb-24 sm:pt-44 sm:pb-32">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid gap-12 lg:grid-cols-2 lg:items-center"
          >
            <div className="space-y-8">
              <motion.p
                variants={fadeUp}
                className="text-sm font-medium uppercase tracking-widest text-emerald-400/90"
              >
                Political Intelligence Platform
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                Creative.{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  Data-driven.
                </span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="max-w-xl text-lg text-slate-300"
              >
                Booth-level and constituency analytics, swing trends, and
                AI-powered recommendations—so you see the full picture without
                the jargon.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <Link
                  href="/signup"
                  className="inline-flex items-center rounded-[12px] border border-white/80 bg-white/10 px-6 py-3.5 text-base font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  Get started
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center rounded-[12px] bg-white px-6 py-3.5 text-base font-medium text-slate-900 transition hover:bg-slate-100"
                >
                  Sign in
                </Link>
              </motion.div>
            </div>
            <motion.div
              variants={fadeUp}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="animate-float rounded-[12px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-400">
                      Seat health
                    </span>
                    <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-sm font-medium text-emerald-400">
                      72% · Good shape
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-slate-700">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '72%' }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    {[
                      { label: 'Risk booths', value: '12', bg: 'bg-red-500/20', text: 'text-red-400' },
                      { label: 'Opportunity', value: '8', bg: 'bg-blue-500/20', text: 'text-blue-400' },
                      { label: 'Swing', value: '+3.2%', bg: 'bg-emerald-500/20', text: 'text-emerald-400' },
                    ].map((m, i) => (
                      <motion.div
                        key={m.label}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className={`rounded-[12px] border border-white/10 ${m.bg} p-4 text-center backdrop-blur-sm`}
                      >
                        <p className={`text-2xl font-semibold ${m.text}`}>
                          {m.value}
                        </p>
                        <p className="text-xs text-slate-400">{m.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        {/* Subtle gradient fade into white section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Features - clean white, matches app */}
      <section className="border-t border-gray-200 bg-gray-50/50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-2xl font-semibold text-gray-900"
          >
            Built for leaders and strategists
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mt-2 max-w-2xl text-center text-gray-600"
          >
            One platform for consultants and politicians—full analytics or simple, insight-first views.
          </motion.p>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 grid gap-6 sm:grid-cols-3"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="rounded-[12px] border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div
                  className={`inline-flex rounded-[12px] p-3 ${
                    f.color === 'blue'
                      ? 'bg-blue-50 text-blue-600'
                      : f.color === 'amber'
                      ? 'bg-amber-50 text-amber-600'
                      : 'bg-green-50 text-green-600'
                  }`}
                >
                  <span className="text-2xl">{f.icon}</span>
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{f.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl rounded-[12px] border border-gray-200 bg-white p-12 text-center shadow-[0_4px_6px_-1px_rgb(0_0_0/0.07),0_2px_4px_-2px_rgb(0_0_0/0.05)]"
        >
          <h2 className="text-2xl font-semibold text-gray-900">
            Ready to see your seat clearly?
          </h2>
          <p className="mt-2 text-gray-600">
            Sign up and get leadership-ready insights in minutes.
          </p>
          <Link
            href="/signup"
            className="mt-6 inline-block rounded-[12px] bg-blue-600 px-8 py-3.5 font-medium text-white shadow-sm transition hover:bg-blue-700"
          >
            Get started
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-6 py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span className="text-sm text-gray-500">PoliIntel AI</span>
          <div className="flex gap-6">
            <Link href="/login" className="text-sm text-gray-500 hover:text-gray-700">
              Sign in
            </Link>
            <Link href="/signup" className="text-sm text-gray-500 hover:text-gray-700">
              Sign up
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
