import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, MessageCircle, Instagram, ArrowUpRight } from 'lucide-react';
import { haptics } from '../utils/haptics';

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.from('.contact-title-line', {
        yPercent: 100,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.1,
        delay: 0.2
      });

      gsap.from('.contact-desc', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out'
      });

      // Form Elements Animation
      gsap.from('.form-element', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.5,
      });

      // Social Cards Animation
      gsap.from('.social-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.8,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full min-h-screen pt-32 pb-48 px-4 md:px-8 lg:px-16 overflow-hidden selection:bg-emerald-500 selection:text-black">
      
      {/* Background Noise */}
      <div className="fixed inset-0 opacity-10 dark:opacity-[0.03] pointer-events-none mix-blend-screen z-50" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
        
        {/* Left Side: Massive Typography & Socials */}
        <div className="lg:col-span-5 flex flex-col justify-center pt-12">
          <div className="font-mono text-emerald-500 mb-8 font-bold tracking-widest uppercase text-sm flex items-center gap-4">
            <span className="w-8 h-[2px] bg-emerald-500"></span>
            KONEKSI
          </div>

          <div className="mb-12">
            <h1 className="font-black text-[15vw] md:text-[8vw] lg:text-[6vw] tracking-tighter uppercase leading-[0.85] mb-8">
              <div className="overflow-hidden py-2">
                <div className="contact-title-line">SAPA</div>
              </div>
              <div className="overflow-hidden py-2 text-emerald-600">
                <div className="contact-title-line">KITA.</div>
              </div>
            </h1>
            <p className="contact-desc text-lg md:text-xl font-medium leading-relaxed opacity-80 border-l-2 border-emerald-600 pl-6 max-w-md">
              Punya ide gila? Pengen kolaborasi? Atau cuma pengen ngobrol bareng komunitas kita? Pintu kita selalu terbuka.
            </p>
          </div>

          {/* Social Links / Community */}
          <div className="flex flex-col gap-4 mt-8">
            <a 
              href="#" 
              onClick={() => haptics.trigger(50)}
              className="social-card group relative flex items-center justify-between p-6 border border-black/10 dark:border-white/10 bg-white dark:bg-[#111] hover:bg-emerald-100 dark:hover:bg-emerald-900/20 hover:border-emerald-500/50 transition-colors duration-500 overflow-hidden"
            >
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-colors duration-500">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 className="font-black text-xl uppercase tracking-tighter group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">Grup WhatsApp</h3>
                  <p className="font-mono text-xs opacity-60 uppercase tracking-widest mt-1">Join Komunitas Kita</p>
                </div>
              </div>
              <ArrowUpRight size={28} className="relative z-10 opacity-40 group-hover:opacity-100 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-all duration-500 group-hover:rotate-45" />
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-600/0 via-emerald-600/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
            </a>

            <a 
              href="https://instagram.com/ourcreativity.ofc" 
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => haptics.trigger(50)}
              className="social-card group relative flex items-center justify-between p-6 border border-black/10 dark:border-white/10 bg-white dark:bg-[#111] hover:bg-emerald-100 dark:hover:bg-emerald-900/20 hover:border-emerald-500/50 transition-colors duration-500 overflow-hidden"
            >
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-colors duration-500">
                  <Instagram size={24} />
                </div>
                <div>
                  <h3 className="font-black text-xl uppercase tracking-tighter group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">@ourcreativity.ofc</h3>
                  <p className="font-mono text-xs opacity-60 uppercase tracking-widest mt-1">Instagram Resmi</p>
                </div>
              </div>
              <ArrowUpRight size={28} className="relative z-10 opacity-40 group-hover:opacity-100 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-all duration-500 group-hover:rotate-45" />
            </a>

            <a 
              href="https://instagram.com/oc.koding" 
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => haptics.trigger(50)}
              className="social-card group relative flex items-center justify-between p-6 border border-black/10 dark:border-white/10 bg-white dark:bg-[#111] hover:bg-emerald-100 dark:hover:bg-emerald-900/20 hover:border-emerald-500/50 transition-colors duration-500 overflow-hidden"
            >
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-colors duration-500">
                  <Instagram size={24} />
                </div>
                <div>
                  <h3 className="font-black text-xl uppercase tracking-tighter group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">@oc.koding</h3>
                  <p className="font-mono text-xs opacity-60 uppercase tracking-widest mt-1">OurCreativity Edisi Koding</p>
                </div>
              </div>
              <ArrowUpRight size={28} className="relative z-10 opacity-40 group-hover:opacity-100 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-all duration-500 group-hover:rotate-45" />
            </a>
          </div>
        </div>

        {/* Right Side: Brutalist Dark Form */}
        <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-center mt-16 lg:mt-0">
          <div className="bg-white dark:bg-[#0A0A0A] p-8 md:p-12 lg:p-16 border border-black/10 dark:border-white/10 relative group shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none">
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-500/50"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-500/50"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-500/50"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-500/50"></div>

            <form className="w-full flex flex-col gap-12" onSubmit={(e) => { e.preventDefault(); haptics.trigger('nudge'); }}>
              <div className="form-element relative">
                <input 
                  type="text" 
                  id="name" 
                  placeholder=" "
                  className="w-full bg-transparent border-b-2 border-black/20 dark:border-white/20 py-4 text-2xl md:text-3xl font-black text-black dark:text-white focus:outline-none focus:border-emerald-500 transition-colors peer rounded-none"
                />
                <label 
                  htmlFor="name" 
                  className="absolute left-0 top-4 text-xl md:text-2xl font-black text-black/40 dark:text-white/40 uppercase tracking-tighter peer-focus:-top-6 peer-focus:text-xs peer-focus:text-emerald-500 peer-focus:opacity-100 peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:opacity-100 transition-all duration-300 pointer-events-none"
                >
                  NAMA KAMU
                </label>
              </div>

              <div className="form-element relative">
                <input 
                  type="email" 
                  id="email" 
                  placeholder=" "
                  className="w-full bg-transparent border-b-2 border-black/20 dark:border-white/20 py-4 text-2xl md:text-3xl font-black text-black dark:text-white focus:outline-none focus:border-emerald-500 transition-colors peer rounded-none"
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-0 top-4 text-xl md:text-2xl font-black text-black/40 dark:text-white/40 uppercase tracking-tighter peer-focus:-top-6 peer-focus:text-xs peer-focus:text-emerald-500 peer-focus:opacity-100 peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:opacity-100 transition-all duration-300 pointer-events-none"
                >
                  EMAIL KAMU
                </label>
              </div>

              <div className="form-element relative">
                <textarea 
                  id="message" 
                  rows={4}
                  placeholder=" "
                  className="w-full bg-transparent border-b-2 border-black/20 dark:border-white/20 py-4 text-2xl md:text-3xl font-black text-black dark:text-white focus:outline-none focus:border-emerald-500 transition-colors peer resize-none rounded-none"
                ></textarea>
                <label 
                  htmlFor="message" 
                  className="absolute left-0 top-4 text-xl md:text-2xl font-black text-black/40 dark:text-white/40 uppercase tracking-tighter peer-focus:-top-6 peer-focus:text-xs peer-focus:text-emerald-500 peer-focus:opacity-100 peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:opacity-100 transition-all duration-300 pointer-events-none"
                >
                  PESAN / IDE PROYEK
                </label>
              </div>

              <button 
                type="submit"
                onClick={() => haptics.trigger(50)}
                className="form-element self-start flex items-center gap-4 text-lg font-black uppercase tracking-widest bg-black text-white dark:bg-white dark:text-black px-8 py-4 hover:bg-emerald-500 hover:text-black transition-colors duration-300 group mt-8 relative overflow-hidden"
              >
                <span className="relative z-10">KIRIM PESAN</span>
                <ArrowRight size={24} strokeWidth={3} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
