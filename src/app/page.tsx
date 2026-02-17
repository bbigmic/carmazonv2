'use client';

import Navbar from '@/components/Navbar';
import ScrollToTop from '@/components/ScrollToTop';
import Image from 'next/image';
import Link from 'next/link';
import CarsSection from '@/components/CarsSection';
import ContactButton from '@/components/ContactButton';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

function AnimatedSection({
  children,
  className = '',
  id,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      ref={ref}
      id={id}
      style={style}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

const trustItems = [
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    label: 'Wycena w 24h',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    label: 'Sprawdzone technicznie',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
    ),
    label: 'Formalności za Ciebie',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    ),
    label: 'Serwis i detailing',
  },
];

const whyUs = [
  {
    title: 'Wycena dostawczaka',
    desc: 'Rzetelna wycena vana lub busa – bez zobowiązań, często w tym samym dniu.',
    icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
  },
  {
    title: 'Obsługa formalności',
    desc: 'Pomoc w rejestracji, ubezpieczeniu i dokumentacji – oszczędzasz czas.',
    icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
  },
  {
    title: 'Kontrola techniczna',
    desc: 'Każdy dostawczak przechodzi kontrolę stanu – kupujesz z głową.',
    icon: 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section
        className="relative min-h-[100vh] flex flex-col px-4 sm:px-6 overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.95) 100%), url('https://images.pexels.com/photos/4620555/pexels-photo-4620555.jpeg?auto=compress&cs=tinysrgb&w=1920')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(239,68,68,0.15),transparent)] pointer-events-none" />
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center max-w-4xl mx-auto w-full text-center pt-24 pb-16">
          <motion.p
            className="text-red-500 font-semibold text-sm uppercase tracking-[0.2em] mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Vany · Busy · Dostawczaki
          </motion.p>
          <motion.h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1] [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Samochody dostawcze
            <br />
            <span className="text-red-500">dla Twojej firmy</span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 [text-shadow:0_1px_10px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            Sprawdzone, wycenione, gotowe do pracy. Kupno, sprzedaż i wycena – w jednym miejscu.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link
              href="#sprzedaz"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black transition-colors"
            >
              Zobacz ofertę
            </Link>
            <a
              href="#footer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
                const el = document.getElementById('phone-number');
                el?.classList.add('animate-pulse', 'text-red-500');
                setTimeout(() => el?.classList.remove('animate-pulse', 'text-red-500'), 3000);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white/60 text-white font-semibold hover:bg-white/10 hover:border-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black transition-colors"
            >
              Skontaktuj się
            </a>
          </motion.div>
          <motion.a
            href="#sprzedaz"
            className="mt-12 inline-flex flex-col items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <span>Zobacz ofertę</span>
            <motion.svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </motion.svg>
          </motion.a>
        </div>
      </section>

      {/* Trust strip */}
      <section className="relative z-20 -mt-12 mx-4 sm:mx-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto bg-zinc-900/95 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {trustItems.map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-600/20 flex items-center justify-center text-red-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {item.icon}
                  </svg>
                </div>
                <span className="font-semibold text-white">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Oferta + Dlaczego my + Cars */}
      <AnimatedSection id="sprzedaz" className="py-24 sm:py-28 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Sprzedaż samochodów dostawczych
            </h2>
            <p className="section-subtitle">
              Vany, busy i dostawczaki – od małych po duże. Kupno, sprzedaż i wycena w jednym miejscu.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-xl font-semibold text-white">Dlaczego warto kupić u nas</h3>
              {whyUs.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-red-600/20 flex items-center justify-center text-red-500">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-zinc-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-3">
              <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-white mb-6">Aktualna oferta dostawczaków</h3>
                <CarsSection />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Mechanika */}
      <AnimatedSection id="mechanika" className="py-24 sm:py-28 bg-zinc-950 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display section-title">Serwis i naprawy dostawczaków</h2>
            <p className="section-subtitle">
              Diagnostyka, naprawy i przeglądy vanów, busów i dostawczaków – Twój flot w dobrych rękach.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                img: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80',
                title: 'Diagnostyka vanów i busów',
                desc: 'Diagnostyka komputerowa i manualna – szybkie wykrycie usterek.',
                icon: 'M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25',
              },
              {
                img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
                title: 'Naprawy mechaniczne i elektryczne',
                desc: 'Silnik, zawieszenie, hamulce i instalacja elektryczna w dostawczakach.',
                icon: 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z',
              },
              {
                img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
                title: 'Przeglądy i serwis okresowy',
                desc: 'Przeglądy, wymiana oleju i płynów – także pakiety dla flot.',
                icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
              },
            ].map((card, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                <div className="absolute inset-0 bg-black/70 z-10" />
                <img
                  src={card.img}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-[11]" />
                <div className="relative z-20 p-6 sm:p-8 flex flex-col justify-end min-h-[280px]">
                  <div className="mb-4">
                    <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={card.icon} />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-zinc-300 text-sm">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Detailing */}
      <AnimatedSection id="detailing" className="py-24 sm:py-28 scroll-mt-20 relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=1920&q=80')",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display section-title">Detailing vanów i dostawczaków</h2>
            <p className="section-subtitle">
              Mycie, pielęgnacja i renowacja – kabina, ładownia i karoseria.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', title: 'Mycie vanów i busów', desc: 'Karoseria, kabina i ładownia – także mycie podwozia i silnika.' },
              { img: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80', title: 'Pielęgnacja lakieru i wnętrza', desc: 'Zabezpieczenie lakieru, pielęgnacja szyb i wnętrza – także ładowni.' },
              { img: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&q=80', title: 'Renowacja dostawczaków', desc: 'Odświeżenie lakieru, renowacja zarysowań i tapicerki.' },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden hover:border-red-500/50 transition-colors group"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image src={card.img} alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-zinc-400 text-sm">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Laweta */}
      <AnimatedSection
        id="laweta"
        className="py-24 sm:py-28 scroll-mt-20 relative"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.9)), url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display section-title">Laweta i pomoc drogowa</h2>
            <p className="section-subtitle">
              Holowanie vanów, busów i dostawczaków – całodobowo. Awaria w trasie? Zgłoś się do nas.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: 'Pomoc 24/7', desc: 'Całodobowa pomoc drogowa – także dla pojazdów dostawczych.', price: 'Od 200 zł' },
              { title: 'Holowanie dostawczaków', desc: 'Bezpieczne holowanie vanów i busów na lawetę.', price: 'Od 300 zł' },
              { title: 'Pomoc w trasie', desc: 'Szybki dojazd i pomoc przy awarii – docieramy tam, gdzie trzeba.', price: 'Od 150 zł' },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 sm:p-8 hover:border-zinc-700 transition-colors"
              >
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-zinc-400 text-sm mb-4">{item.desc}</p>
                <p className="text-red-500 font-bold text-xl">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA – Wycena */}
      <AnimatedSection className="py-24 sm:py-28 bg-zinc-950 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Sprzedajesz vana lub busa?
          </h2>
          <p className="text-zinc-400 text-lg mb-8">
            Wycena w 24h – bez zobowiązań. Napisz lub zadzwoń.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+48123456789"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black transition-colors"
            >
              +48 123 456 789
            </a>
            <ContactButton />
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer id="footer" className="bg-black border-t border-zinc-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10 md:gap-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">BP Logistic</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Specjalizujemy się w sprzedaży samochodów dostawczych – vany, busy i dostawczaki. Kupno, sprzedaż, wycena i serwis.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Kontakt</h3>
              <ul className="space-y-3 text-zinc-400 text-sm">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  ul. Logistyczna 1, 42-200 Częstochowa
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span id="phone-number">
                    <a href="tel:+48123456789" className="hover:text-red-500 transition-colors">+48 123 456 789</a>
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  biuro@bplogistic.pl
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Godziny otwarcia</h3>
              <ul className="space-y-2 text-zinc-400 text-sm">
                <li>Pon–Pt: 8:00–18:00</li>
                <li>Sob: 9:00–14:00</li>
                <li>Nd: Zamknięte</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Usługi</h3>
              <ul className="space-y-2 text-zinc-400 text-sm">
                <li>Serwis dostawczaków</li>
                <li>Detailing vanów</li>
                <li>Samochody dostawcze</li>
                <li>Laweta i pomoc drogowa</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-zinc-800 text-center text-zinc-500 text-sm">
            © {new Date().getFullYear()} BP Logistic. Wszelkie prawa zastrzeżone.
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  );
}
