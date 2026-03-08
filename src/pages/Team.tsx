import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';
import { haptics } from '../utils/haptics';
import teamData from '../data/team.json';

interface TeamMember {
  name: string;
  role: string;
  id: string;
  bio: string;
  img: string;
  github: string;
  linkedin: string;
  twitter: string;
}

const TEAM: TeamMember[] = teamData;


export default function Team() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Text Reveal
      gsap.from('.hero-line-inner', {
        yPercent: 100,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.2
      });

      gsap.from('.hero-desc', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out'
      });

      // Team Cards Reveal on Scroll
      const cards = gsap.utils.toArray('.team-card-wrapper');

      cards.forEach((card: any, i) => {
        const img = card.querySelector('.team-img');
        const mask = card.querySelector('.team-mask');
        const content = card.querySelector('.team-content');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });

        // Mask slides up to reveal image
        tl.to(mask, {
          yPercent: -100,
          duration: 1.2,
          ease: 'expo.inOut'
        }, 0)
          // Image scales down slightly
          .fromTo(img,
            { scale: 1.4 },
            { scale: 1, duration: 1.2, ease: 'expo.inOut' },
            0
          )
          // Content fades and slides up
          .from(content, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
          }, 0.6);
      });

      // Parallax effect on images
      cards.forEach((card: any) => {
        const img = card.querySelector('.team-img');
        gsap.to(img, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full min-h-screen pt-32 pb-48 px-4 md:px-8 lg:px-16 overflow-hidden selection:bg-emerald-500 selection:text-black">

      {/* Background Noise */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none mix-blend-screen z-50 dark:opacity-[0.03] opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      <div className="max-w-7xl mx-auto">

        {/* HERO SECTION */}
        <div className="mb-32 md:mb-48 pt-12">
          <div className="font-mono text-emerald-500 mb-8 font-bold tracking-widest uppercase text-sm flex items-center gap-4">
            <span className="w-8 h-[2px] bg-emerald-500"></span>
            DIVISI INTI
          </div>

          <h1 className="font-black text-[12vw] md:text-[8vw] leading-[0.85] tracking-tighter uppercase mb-12">
            <div className="overflow-hidden py-2">
              <div className="hero-line-inner">SANG ARSITEK</div>
            </div>
            <div className="overflow-hidden py-2 text-emerald-600">
              <div className="hero-line-inner">DI BALIK KODE.</div>
            </div>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4 md:col-start-9">
              <p className="hero-desc text-lg md:text-xl font-medium leading-relaxed opacity-80 border-l-2 border-emerald-600 pl-6">
                Kita bukan cuma freelancer biasa. Kita ini kumpulan engineer, desainer, dan pemikir yang terobsesi buat nembus batas web modern.
              </p>
            </div>
          </div>
        </div>

        {/* TEAM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24 md:gap-y-32">
          {TEAM.map((member, i) => (
            <div
              key={i}
              className={`team-card-wrapper group relative cursor-pointer ${i % 2 !== 0 ? 'md:mt-32' : ''}`}
              onMouseEnter={() => haptics.trigger(50)}
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-white dark:bg-[#111] mb-8 border border-black/10 dark:border-white/10">
                {/* The Reveal Mask */}
                <div className="team-mask absolute inset-0 bg-[#E4E4E2] dark:bg-[#050505] z-10 origin-top"></div>

                <img
                  src={member.img}
                  alt={member.name}
                  className="team-img absolute inset-0 w-full h-[120%] -top-[10%] object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500 z-0"></div>

                {/* ID Badge */}
                <div className="absolute top-6 left-6 z-20 overflow-hidden">
                  <div className="font-mono text-sm md:text-base font-black text-black dark:text-white mix-blend-difference translate-y-0 group-hover:-translate-y-full transition-transform duration-300">
                    {member.id}
                  </div>
                  <div className="font-mono text-sm md:text-base font-black text-emerald-400 absolute top-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    {member.id}
                  </div>
                </div>

                {/* Social Links on Hover */}
                <div className="absolute bottom-6 right-6 z-20 flex gap-4 overflow-hidden">
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-black dark:text-white hover:text-emerald-400 translate-y-12 group-hover:translate-y-0 transition-transform duration-500 delay-100"><Github size={20} /></a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-black dark:text-white hover:text-emerald-400 translate-y-12 group-hover:translate-y-0 transition-transform duration-500 delay-150"><Linkedin size={20} /></a>
                  <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-black dark:text-white hover:text-emerald-400 translate-y-12 group-hover:translate-y-0 transition-transform duration-500 delay-200"><Twitter size={20} /></a>
                </div>
              </div>

              {/* Content */}
              <div className="team-content flex flex-col relative z-20">
                <div className="flex justify-between items-end mb-4 border-b border-black/20 dark:border-white/20 pb-4 group-hover:border-emerald-500/50 transition-colors duration-500">
                  <div>
                    <h3 className="font-black text-3xl md:text-4xl uppercase tracking-tighter mb-1 group-hover:text-emerald-400 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <span className="font-mono text-xs md:text-sm uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      {member.role}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:text-black transition-all duration-300 -rotate-45 group-hover:rotate-0">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
                <p className="text-lg opacity-70 font-medium leading-relaxed max-w-sm group-hover:opacity-100 transition-opacity duration-300">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* JOIN US CTA */}
        <div className="mt-48 border-t border-black/20 dark:border-white/20 pt-24 pb-12 flex flex-col items-center text-center">
          <h2 className="font-black text-4xl md:text-6xl tracking-tighter uppercase mb-6">
            MERASA COCOK SAMA KITA?
          </h2>
          <p className="text-xl opacity-70 mb-12 max-w-2xl">
            Kita selalu nyari talenta brutalist yang nggak takut buat nulis ulang aturan.
          </p>
          <a
            href="/contact"
            onClick={() => haptics.trigger('nudge')}
            className="group relative inline-flex items-center justify-center gap-4 bg-black text-white dark:bg-white dark:text-black px-8 py-4 font-black uppercase tracking-widest text-lg overflow-hidden"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">GABUNG SEKARANG</span>
            <ArrowUpRight className="relative z-10 group-hover:text-white transition-colors duration-300" size={24} />
            <div className="absolute inset-0 bg-emerald-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
          </a>
        </div>

      </div>
    </div>
  );
}
