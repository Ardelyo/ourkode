import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight, Github, Code2, Terminal } from 'lucide-react';
import { haptics } from '../utils/haptics';
import { getProjects } from '../services/projectService';
import { Project } from '../types/project';

gsap.registerPlugin(ScrollTrigger);


export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects().then(all => setFeaturedProjects(all.slice(0, 3)));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from('.hero-title-line', {
        y: 150,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        skewY: 5,
      })
        .from('.hero-badge', {
          scale: 0,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(1.5)',
        }, "-=0.8")
        .from('.hero-desc', {
          y: 30,
          opacity: 0,
          duration: 1,
        }, "-=0.6");

      // Marquee Animation
      gsap.to('.marquee-content', {
        xPercent: -50,
        ease: 'none',
        duration: 20,
        repeat: -1,
      });

      // Scroll Animations
      gsap.from('.about-text', {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });

      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: projectsRef.current,
          start: 'top 70%',
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out'
      });

      // Floating shapes
      gsap.to('.float-shape', {
        y: 'random(-20, 20)',
        x: 'random(-20, 20)',
        rotation: 'random(-10, 10)',
        duration: 'random(4, 8)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.5,
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full">

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative w-full min-h-screen flex flex-col justify-center px-4 md:px-16 pt-20 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-50 dark:opacity-20"
          style={{
            backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '4vw 4vw',
          }}>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 right-[10%] w-32 h-32 md:w-64 md:h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-[40px] md:blur-[80px] opacity-60 float-shape z-0"></div>
        <div className="absolute bottom-1/4 left-[10%] w-40 h-40 md:w-80 md:h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-[50px] md:blur-[100px] opacity-40 float-shape z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="flex flex-col items-start pt-12">

            <div className="overflow-hidden">
              <h1 className="hero-title-line font-black text-[15vw] md:text-[12vw] leading-[0.85] tracking-tighter uppercase text-[#1A1A1A] dark:text-[#F5F5F0]">
                BIKIN
              </h1>
            </div>
            <div className="overflow-hidden flex items-center gap-4 md:gap-8">
              <h1 className="hero-title-line font-black text-[15vw] md:text-[12vw] leading-[0.85] tracking-tighter uppercase text-emerald-600">
                SOFTWARE
              </h1>
              <div className="hero-title-line hidden md:flex w-32 h-32 border-4 border-black dark:border-white/20 rounded-full items-center justify-center bg-white dark:bg-[#1A1A1A] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] text-[#1A1A1A] dark:text-[#F5F5F0]">
                <Code2 size={48} strokeWidth={2} />
              </div>
            </div>
            <div className="overflow-hidden">
              <h1 className="hero-title-line font-black text-[15vw] md:text-[12vw] leading-[0.85] tracking-tighter uppercase text-[#1A1A1A] dark:text-[#F5F5F0]">
                KEREN.
              </h1>
            </div>

            <div className="hero-desc mt-12 md:mt-16 flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center max-w-4xl">
              <p className="text-lg md:text-2xl font-medium leading-relaxed border-l-4 border-emerald-500 pl-6 text-[#1A1A1A] dark:text-[#F5F5F0]/80">
                Tempat kita pamerin proyek open-source & closed-source. Kita bikin solusi nyata dengan kode yang rapi dan desain yang berani.
              </p>
              <Link
                to="/projects"
                onClick={() => haptics.trigger('nudge')}
                className="shrink-0 flex items-center gap-4 text-base md:text-lg font-black uppercase tracking-widest border-2 border-black dark:border-white/20 bg-white dark:bg-[#1A1A1A] text-[#1A1A1A] dark:text-[#F5F5F0] px-8 py-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[10px_10px_0px_0px_rgba(255,255,255,0.2)] hover:-translate-y-1 hover:-translate-x-1 hover:text-emerald-700 dark:hover:text-emerald-500 transition-all group"
              >
                LIHAT PROYEK
                <span className="bg-[#1A1A1A] dark:bg-[#F5F5F0] text-white dark:text-[#1A1A1A] p-1 group-hover:bg-emerald-700 dark:group-hover:bg-emerald-500 transition-colors">
                  <ArrowRight size={24} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE SECTION */}
      <section ref={marqueeRef} className="w-full py-8 md:py-12 bg-[#1A1A1A] dark:bg-emerald-900 text-white overflow-hidden border-y-4 border-black dark:border-white/10 relative z-20 transform -rotate-2 scale-105">
        <div className="flex whitespace-nowrap marquee-content">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 md:gap-16 px-4 md:px-8">
              <span className="font-black text-4xl md:text-7xl uppercase tracking-tighter">KODE TERUS</span>
              <span className="text-emerald-500 dark:text-emerald-300"><Terminal size={48} strokeWidth={3} /></span>
              <span className="font-black text-4xl md:text-7xl uppercase tracking-tighter text-transparent" style={{ WebkitTextStroke: '2px white' }}>OPEN SOURCE</span>
              <span className="text-emerald-500 dark:text-emerald-300"><Github size={48} strokeWidth={3} /></span>
              <span className="font-black text-4xl md:text-7xl uppercase tracking-tighter">INOVASI</span>
              <span className="text-emerald-500 dark:text-emerald-300"><Code2 size={48} strokeWidth={3} /></span>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section ref={aboutRef} className="w-full py-32 px-4 md:px-16 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          <div className="about-text">
            <h2 className="font-black text-5xl md:text-7xl tracking-tighter uppercase mb-8 text-[#1A1A1A] dark:text-[#F5F5F0]">
              KITA BUKAN<br />
              <span className="text-transparent dark:text-transparent" style={{ WebkitTextStroke: '2px currentColor' }}>CUMA</span><br />
              KODER.
            </h2>
            <div className="w-24 h-2 bg-emerald-500 mb-8"></div>
          </div>
          <div className="flex flex-col gap-8 justify-center">
            <p className="about-text text-xl md:text-3xl font-medium leading-tight text-[#1A1A1A] dark:text-[#F5F5F0]">
              OurCode itu divisi teknologinya OurCreativity. Kita percaya kalau kode yang bagus itu seni yang bisa mecahin masalah.
            </p>
            <p className="about-text text-base md:text-lg opacity-70 leading-relaxed font-mono text-[#1A1A1A] dark:text-[#F5F5F0]">
              Dari sistem desa sampai API yang ribet, kita bangun infrastruktur digital yang kuat dan open-source (kebanyakan sih gitu). Kita nggak pelit ilmu, kita bagi-bagi.
            </p>
            <div className="about-text mt-4">
              <Link
                to="/about"
                onClick={() => haptics.trigger(50)}
                className="inline-flex items-center gap-2 font-bold uppercase tracking-widest border-b-2 border-black dark:border-white/50 pb-1 text-[#1A1A1A] dark:text-[#F5F5F0] hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-600 dark:hover:border-emerald-400 transition-colors"
              >
                BACA CERITA KITA <ArrowRight size={16} strokeWidth={3} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS SECTION */}
      <section ref={projectsRef} className="w-full py-32 px-4 md:px-16 bg-white dark:bg-[#0A0A0A] border-t-4 border-black dark:border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
            <div>
              <h2 className="font-black text-5xl md:text-8xl tracking-tighter uppercase text-[#1A1A1A] dark:text-[#F5F5F0]">
                PROYEK<br />UNGGULAN.
              </h2>
            </div>
            <Link
              to="/projects"
              onClick={() => haptics.trigger(50)}
              className="shrink-0 flex items-center gap-3 text-sm md:text-base font-black uppercase tracking-widest border-2 border-black dark:border-white/20 px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] transition-all bg-[#E4E4E2] dark:bg-[#1A1A1A] text-[#1A1A1A] dark:text-[#F5F5F0]"
            >
              LIHAT SEMUA PROYEK
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {featuredProjects.map((project, index) => (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                onClick={() => haptics.trigger(50)}
                className="project-card group block relative"
              >
                {/* Card Background Shadow */}
                <div className="absolute inset-0 bg-black dark:bg-white/20 translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 z-0 transition-transform group-hover:translate-x-6 group-hover:translate-y-6"></div>

                {/* Card Content */}
                <div className="relative z-10 bg-[#E4E4E2] dark:bg-[#1A1A1A] border-4 border-black dark:border-white/20 h-full flex flex-col transition-transform group-hover:-translate-y-2 group-hover:-translate-x-2">
                  <div className="h-64 md:h-80 w-full border-b-4 border-black dark:border-white/20 overflow-hidden relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-white dark:bg-[#0A0A0A] border-2 border-black dark:border-white/20 px-3 py-1 font-mono text-xs font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] text-[#1A1A1A] dark:text-[#F5F5F0]">
                      {project.year}
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col flex-grow bg-white dark:bg-[#0A0A0A]">
                    <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-2 font-bold text-emerald-600 dark:text-emerald-400">
                      {project.category}
                    </div>
                    <h3 className="font-black text-3xl md:text-4xl tracking-tighter uppercase mb-6 text-[#1A1A1A] dark:text-[#F5F5F0] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className="mt-auto flex justify-between items-center text-[#1A1A1A] dark:text-[#F5F5F0]">
                      <span className="font-mono text-sm font-bold opacity-40">{project.id}</span>
                      <div className="w-12 h-12 border-2 border-black dark:border-white/20 flex items-center justify-center rounded-full group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:text-white transition-colors">
                        <ArrowUpRight size={24} strokeWidth={2} className="group-hover:rotate-45 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="w-full py-32 md:py-48 px-4 md:px-16 bg-emerald-600 dark:bg-emerald-800 text-white border-t-4 border-black dark:border-white/10 relative z-10 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="font-black text-6xl md:text-[8vw] leading-[0.85] tracking-tighter uppercase mb-12 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            YUK BIKIN<br />SESUATU BARENG.
          </h2>
          <Link
            to="/contact"
            onClick={() => haptics.trigger('nudge')}
            className="inline-flex items-center gap-4 text-xl md:text-3xl font-black uppercase tracking-widest border-4 border-black dark:border-white/20 bg-white dark:bg-[#1A1A1A] text-black dark:text-[#F5F5F0] px-8 md:px-12 py-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[16px_16px_0px_0px_rgba(255,255,255,0.2)] hover:-translate-y-2 hover:-translate-x-2 transition-all group"
          >
            KABARIN KITA
            <ArrowRight size={32} strokeWidth={4} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>

    </div>
  );
}
