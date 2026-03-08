import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Terminal, Code2, Cpu, Globe } from 'lucide-react';
import { haptics } from '../utils/haptics';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    id: '01',
    title: 'TERBUKA BANGET',
    desc: 'Kita bikin semuanya open. Open-source itu bukan cuma lisensi, tapi cara kita kerja dan kolaborasi.',
    icon: <Globe size={48} strokeWidth={2} />,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '02',
    title: 'EFISIEN PARAH',
    desc: 'Nggak ada kode yang mubazir. Nggak ada desain nipu. Kita fokus ke performa, gampang dipake, dan fungsi murni.',
    icon: <Terminal size={48} strokeWidth={2} />,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '03',
    title: 'INOVASI TERUS',
    desc: 'Kita nggak suka yang biasa aja. Tiap baris kode yang kita tulis itu buat nembus batas web modern.',
    icon: <Cpu size={48} strokeWidth={2} />,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '04',
    title: 'BARENG KOMUNITAS',
    desc: 'Teknologi tanpa orang itu omong kosong. Kita bikin alat yang ngebantu komunitas dan kreator lokal.',
    icon: <Code2 size={48} strokeWidth={2} />,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop'
  }
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeValue, setActiveValue] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Text Animation
      gsap.from('.hero-char', {
        y: 150,
        opacity: 0,
        rotationX: -90,
        stagger: 0.05,
        duration: 1.5,
        ease: 'power4.out',
        transformOrigin: '50% 50% -50px',
      });

      // Manifesto Scrub Animation
      const manifestoWords = gsap.utils.toArray('.manifesto-word');
      gsap.fromTo(manifestoWords, 
        { opacity: 0.2 },
        {
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: true,
          }
        }
      );

      // Sticky Section Animation
      ScrollTrigger.create({
        trigger: stickyRef.current,
        start: 'top 100px',
        end: 'bottom bottom',
        pin: '.sticky-content',
      });

      // Image Parallax
      gsap.to('.parallax-img', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.parallax-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleValueHover = (index: number) => {
    if (activeValue !== index) {
      haptics.trigger(50);
      setActiveValue(index);
    }
  };

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-16 px-4 md:px-8">
        <div className="absolute top-32 left-8 font-mono text-xs font-bold uppercase tracking-widest opacity-50 hidden md:block">
          SYS.INFO // ABOUT_US<br/>
          VERSION: 2.0.4
        </div>
        <div className="absolute bottom-16 right-8 font-mono text-xs font-bold uppercase tracking-widest opacity-50 text-right hidden md:block">
          GULIR UNTUK MEMULAI<br/>
          ↓
        </div>

        <h1 ref={heroTextRef} className="font-black text-[18vw] md:text-[15vw] leading-[0.8] tracking-tighter uppercase text-center flex flex-wrap justify-center" style={{ perspective: '1000px' }}>
          {'CERITA'.split('').map((char, i) => (
            <span key={i} className="hero-char inline-block">{char}</span>
          ))}
        </h1>
        
        <div className="mt-12 md:mt-24 max-w-2xl text-center">
          <p className="text-xl md:text-3xl font-medium leading-tight">
            Bukan cuma agensi. Bukan cuma komunitas. Kita ini <span className="font-black bg-black text-white px-2">OURCODE</span>.
          </p>
        </div>
      </section>

      {/* MANIFESTO SCRUB SECTION */}
      <section ref={manifestoRef} className="w-full py-32 md:py-48 px-4 md:px-16 bg-[#1A1A1A] dark:bg-emerald-950 text-white border-y-8 border-black dark:border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono text-emerald-500 dark:text-emerald-400 mb-8 font-bold tracking-widest uppercase text-sm md:text-base">
            [01] PRINSIP KITA
          </div>
          <h2 className="font-black text-4xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tighter uppercase">
            {`Kode jelek itu nyembunyiin maksudnya. Kode bagus itu ngejelasin. Tapi kode keren itu ngubah cara kita interaksi sama dunia. Kita nolak desain ngebosenin dan arsitektur rapuh. Kita bikin buat jangka panjang.`.split(' ').map((word, i) => (
              <span key={i} className="manifesto-word inline-block mr-3 md:mr-6 mb-2">{word}</span>
            ))}
          </h2>
        </div>
      </section>

      {/* STICKY INTERACTIVE SECTION */}
      <section ref={stickyRef} className="w-full relative px-4 md:px-16 py-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
          
          {/* Left: Sticky Content (Images) */}
          <div className="lg:col-span-5 hidden lg:block relative h-full">
            <div className="sticky-content w-full aspect-[3/4] border-8 border-black dark:border-white/20 bg-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] dark:shadow-[16px_16px_0px_0px_rgba(255,255,255,0.2)] overflow-hidden relative">
              {VALUES.map((val, idx) => (
                <div 
                  key={val.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeValue === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                  <img 
                    src={val.image} 
                    alt={val.title}
                    className="w-full h-full object-cover grayscale opacity-80 mix-blend-luminosity"
                  />
                  <div className="absolute inset-0 bg-emerald-900/30 mix-blend-multiply"></div>
                  <div className="absolute bottom-8 left-8 text-white">
                    {val.icon}
                  </div>
                </div>
              ))}
              
              {/* Overlay Grain */}
              <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
            </div>
          </div>

          {/* Right: Scrolling Content (Values) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="font-mono text-black dark:text-[#F5F5F0] mb-12 font-bold tracking-widest uppercase text-sm md:text-base border-b-4 border-black dark:border-white/20 pb-4 inline-block">
              [02] CARA KERJA KITA
            </div>
            
            <div className="flex flex-col gap-8 md:gap-12">
              {VALUES.map((val, idx) => (
                <div 
                  key={val.id}
                  onMouseEnter={() => handleValueHover(idx)}
                  className={`group cursor-pointer border-l-8 pl-6 md:pl-10 py-4 transition-all duration-300 ${activeValue === idx ? 'border-emerald-600 dark:border-emerald-500' : 'border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30'}`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`font-mono text-xl md:text-2xl font-black transition-colors ${activeValue === idx ? 'text-emerald-600 dark:text-emerald-500' : 'text-black/30 dark:text-white/30'}`}>
                      {val.id}
                    </span>
                    <h3 className={`font-black text-3xl md:text-5xl tracking-tighter uppercase transition-colors ${activeValue === idx ? 'text-black dark:text-[#F5F5F0]' : 'text-black/40 dark:text-white/40'}`}>
                      {val.title}
                    </h3>
                  </div>
                  <p className={`text-lg md:text-2xl font-medium leading-relaxed transition-all duration-500 overflow-hidden text-[#1A1A1A] dark:text-[#F5F5F0]/80 ${activeValue === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                    {val.desc}
                  </p>
                  
                  {/* Mobile Image Fallback */}
                  <div className={`lg:hidden mt-6 border-4 border-black dark:border-white/20 overflow-hidden transition-all duration-500 ${activeValue === idx ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 border-0'}`}>
                    <img src={val.image} alt={val.title} className="w-full h-48 object-cover grayscale" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* MASSIVE PARALLAX IMAGE SECTION */}
      <section className="w-full h-[60vh] md:h-[90vh] overflow-hidden relative border-y-8 border-black dark:border-white/10 parallax-container">
        <img 
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2000&auto=format&fit=crop" 
          alt="Our Workspace" 
          className="parallax-img absolute top-[-30%] left-0 w-full h-[160%] object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h2 className="font-black text-[12vw] text-white tracking-tighter uppercase mix-blend-overlay opacity-80">
            GAS TERUS
          </h2>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="w-full py-32 px-4 md:px-16 bg-white dark:bg-[#0A0A0A] text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-black text-5xl md:text-7xl tracking-tighter uppercase mb-8 text-[#1A1A1A] dark:text-[#F5F5F0]">
            SIAP BIKIN<br/>YANG KEREN?
          </h2>
          <p className="text-xl md:text-2xl font-medium mb-12 opacity-80 text-[#1A1A1A] dark:text-[#F5F5F0]">
            Yuk gabung di proyek open-source kita, atau mari kolaborasi buat proyek kamu selanjutnya.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              to="/projects"
              onClick={() => haptics.trigger('nudge')}
              className="w-full sm:w-auto flex items-center justify-center gap-3 text-lg font-black uppercase tracking-widest border-4 border-black dark:border-white/20 bg-emerald-500 text-black px-8 py-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[10px_10px_0px_0px_rgba(255,255,255,0.2)] hover:-translate-y-1 hover:-translate-x-1 transition-all"
            >
              LIHAT KARYA KITA
            </Link>
            <Link 
              to="/contact"
              onClick={() => haptics.trigger(50)}
              className="w-full sm:w-auto flex items-center justify-center gap-3 text-lg font-black uppercase tracking-widest border-4 border-black dark:border-white/20 bg-transparent text-black dark:text-[#F5F5F0] px-8 py-4 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors"
            >
              KABARIN KITA <ArrowRight size={24} strokeWidth={3} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
