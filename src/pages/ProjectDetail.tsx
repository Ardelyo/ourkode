import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowLeft, ExternalLink, Github, Calendar, User, Tag,
  FileText, Code2, GitBranch, ArrowDown, Activity, Users,
  Star, Eye, ArrowRight, Share2, Twitter, Linkedin, Link as LinkIcon, Check, Terminal
} from 'lucide-react';
import { cn } from '../utils/cn';
import { haptics } from '../utils/haptics';

gsap.registerPlugin(ScrollTrigger);

import { Project } from '../types/project';
import { getProjectById } from '../services/projectService';

export default function ProjectDetail() {
  const { id } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      try {
        const data = await getProjectById(id || '01');
        setProject(data);
      } catch (error) {
        console.error("Failed to load project:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProject();
  }, [id]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from('.hero-elem', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.1,
        skewY: 2,
      });

      // Split text animation for main title
      if (heroTextRef.current) {
        const chars = heroTextRef.current.innerText.split('');
        heroTextRef.current.innerText = '';
        chars.forEach(char => {
          const span = document.createElement('span');
          span.innerText = char;
          span.className = 'inline-block';
          heroTextRef.current?.appendChild(span);
        });

        gsap.from(heroTextRef.current.children, {
          y: 100,
          opacity: 0,
          rotateX: -90,
          stagger: 0.05,
          duration: 1,
          ease: 'back.out(1.7)',
          delay: 0.5
        });
      }

      // Parallax effect for hero image
      gsap.to('.hero-img', {
        yPercent: 30,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-img-container',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Fade out hero text on scroll
      gsap.to('.hero-content', {
        y: -100,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-img-container',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Content Reveal with staggered lines
      const contentBlocks = gsap.utils.toArray('.content-block');
      contentBlocks.forEach((block: any) => {
        gsap.from(block, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 85%',
          },
        });
      });

      // Sidebar Pin
      ScrollTrigger.create({
        trigger: '.article-container',
        start: 'top top+=120',
        end: 'bottom bottom',
        pin: '.sidebar-info',
        pinSpacing: false,
      });

      // Horizontal Scroll Gallery
      if (galleryRef.current) {
        const sections = gsap.utils.toArray('.gallery-item');
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: galleryRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => "+=" + galleryRef.current?.offsetWidth
          }
        });
      }

      // Stats counter animation
      const stats = gsap.utils.toArray('.stat-num');
      stats.forEach((stat: any) => {
        gsap.from(stat, {
          textContent: 0,
          duration: 2,
          ease: "power1.inOut",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: stat,
            start: "top 80%",
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, [project]);

  const handleCopyLink = () => {
    haptics.trigger('nudge');
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading || !project) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#1A1A1A] text-white">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-mono text-sm uppercase tracking-widest opacity-50">Memuat Detail Proyek...</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full min-h-screen pb-32">

      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
        <Link to="/projects" onClick={() => haptics.trigger(50)} className="pointer-events-auto flex items-center gap-2 font-mono text-xs uppercase tracking-widest hover:opacity-70 transition-opacity">
          <ArrowLeft size={16} /> KEMBALI KE PROYEK
        </Link>
        <div className="font-mono text-xs uppercase tracking-widest opacity-50">
          ARTIKEL WIKI // {id || '01'}
        </div>
      </div>

      {/* Hero Section */}
      <div className="w-full h-screen relative hero-img-container overflow-hidden bg-[#1A1A1A]">
        {/* Image with dark overlay to ensure text contrast */}
        <div className="absolute inset-0 z-0">
          <img
            src={project.image}
            alt={project.title}
            className="hero-img w-full h-[120%] object-cover opacity-60 grayscale"
          />
          {/* Gradient overlay specifically for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/50 to-transparent"></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="hero-content absolute bottom-0 left-0 w-full px-4 md:px-16 pb-32 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="hero-elem font-mono text-sm uppercase tracking-widest mb-6 flex items-center gap-4 text-white">
              <span className="bg-emerald-600 text-white px-4 py-1.5 font-bold">{project.category}</span>
              <span className="opacity-60">{project.year}</span>
              <span className="opacity-60 hidden md:inline-block">• {project.author}</span>
            </div>

            {/* Title with guaranteed contrast */}
            <h1
              ref={heroTextRef}
              className="font-black text-6xl md:text-8xl lg:text-[10rem] tracking-tighter uppercase leading-[0.85] mb-8 text-white drop-shadow-2xl"
            >
              {project.title}
            </h1>

            <p className="hero-elem text-xl md:text-3xl font-medium max-w-4xl leading-relaxed text-white/90 drop-shadow-lg">
              {project.summary}
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50 animate-bounce">
          <span className="font-mono text-[10px] uppercase tracking-widest">GULIR</span>
          <ArrowDown size={16} />
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="w-full bg-[#1A1A1A] text-white border-y border-white/10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-16 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
            <div className="flex flex-col items-center justify-center text-center px-4">
              <Star className="text-emerald-500 mb-2" size={24} />
              <span className="font-black text-4xl stat-num">{project.stats?.stars || '0'}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest opacity-50 mt-1">GitHub Stars</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <GitBranch className="text-emerald-500 mb-2" size={24} />
              <span className="font-black text-4xl stat-num">{project.stats?.forks || '0'}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest opacity-50 mt-1">Forks</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <Users className="text-emerald-500 mb-2" size={24} />
              <span className="font-black text-4xl stat-num">{project.stats?.contributors || '0'}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest opacity-50 mt-1">Contributors</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <Activity className="text-emerald-500 mb-2" size={24} />
              <span className="font-black text-4xl">{project.stats?.issues || '0'}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest opacity-50 mt-1">Issues</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area (Wikipedia Style Layout) */}
      <div className="max-w-7xl mx-auto px-4 md:px-16 pt-24 article-container relative">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Left Column: Main Article */}
          <div className="w-full lg:w-2/3 lg:pr-12">

            {/* Table of Contents (Wikipedia Style) */}
            <div className="content-block bg-white border border-black/20 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8 mb-20 inline-block w-full">
              <h3 className="font-black text-xl uppercase tracking-tighter mb-6 pb-4 border-b-2 border-black/10 flex items-center gap-3">
                <FileText size={24} className="text-emerald-600" /> Daftar Isi
              </h3>
              <ul className="space-y-4">
                {project.toc?.map((item, i) => (
                  <li key={i}>
                    <a
                      href={`#${item.id}`}
                      className="font-semibold text-lg text-emerald-700 hover:text-black hover:underline underline-offset-4 transition-colors flex items-center gap-3"
                      onClick={(e) => {
                        e.preventDefault();
                        haptics.trigger(50);
                        const el = document.getElementById(item.id);
                        if (el) {
                          window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
                        }
                      }}
                    >
                      <span className="text-black/30 font-mono text-sm">0{i + 1}</span>
                      {item.label.replace(/^\d+\.\s*/, '')}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="prose prose-xl prose-stone max-w-none">
              {project.content?.map((block, index) => {
                switch (block.type) {
                  case 'heading':
                    return (
                      <h2
                        key={index}
                        id={block.id}
                        className="content-block font-black text-4xl md:text-6xl uppercase tracking-tighter mt-24 mb-10 pb-6 border-b-4 border-black flex items-center gap-6 scroll-mt-32 leading-none"
                      >
                        <span className="text-emerald-600 font-mono text-3xl opacity-50 -mt-2">0{(project.toc?.findIndex(t => t.id === block.id) ?? -1) + 1}</span>
                        {block.text}
                      </h2>
                    );
                  case 'paragraph':
                    return (
                      <p key={index} className="content-block text-xl md:text-2xl leading-[1.8] text-black/80 mb-10 font-medium">
                        {block.text}
                      </p>
                    );
                  case 'image':
                    return (
                      <figure key={index} className="content-block my-20 group cursor-pointer relative overflow-hidden">
                        <div className="border-2 border-black p-3 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-10 transition-transform duration-500 group-hover:-translate-y-2 group-hover:-translate-x-2">
                          <img src={block.url} alt={block.caption} className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700" />
                          <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/10 transition-colors duration-500 mix-blend-multiply z-20 pointer-events-none"></div>
                        </div>
                        <figcaption className="font-mono text-sm uppercase tracking-widest opacity-60 mt-8 text-center flex items-center justify-center gap-3">
                          <Eye size={16} /> {block.caption}
                        </figcaption>
                      </figure>
                    );
                  case 'quote':
                    return (
                      <blockquote key={index} className="content-block my-20 pl-10 md:pl-16 border-l-[12px] border-emerald-600 bg-white p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative border-2 border-black">
                        <div className="absolute -top-8 -left-6 text-8xl md:text-[120px] font-serif text-black/10 leading-none select-none">"</div>
                        <p className="italic text-2xl md:text-4xl font-medium text-black/90 relative z-10 leading-[1.6]">
                          {block.text}
                        </p>
                      </blockquote>
                    );
                  case 'list':
                    return (
                      <ul key={index} className="content-block space-y-6 mb-16 list-none pl-0">
                        {block.items?.map((item, i) => (
                          <li key={i} className="flex items-start gap-6 text-xl md:text-2xl text-black/80 font-medium border-b-2 border-black/10 pb-6 group hover:pl-6 transition-all duration-300">
                            <span className="text-emerald-600 mt-1.5 font-mono text-lg font-bold">[{i + 1}]</span>
                            <span className="leading-[1.6]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  case 'code':
                    return (
                      <div key={index} className="content-block my-16 rounded-xl overflow-hidden border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-[#1A1A1A]">
                        <div className="bg-black/60 px-6 py-4 flex items-center justify-between border-b border-white/10">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full bg-[#FF5F56] border border-black/20"></div>
                            <div className="w-4 h-4 rounded-full bg-[#FFBD2E] border border-black/20"></div>
                            <div className="w-4 h-4 rounded-full bg-[#27C93F] border border-black/20"></div>
                          </div>
                          <div className="flex items-center gap-2 text-white/50 font-mono text-sm uppercase tracking-widest">
                            <Terminal size={16} /> {block.language}
                          </div>
                        </div>
                        <pre className="p-8 overflow-x-auto">
                          <code className="font-mono text-base md:text-lg leading-relaxed text-emerald-400">
                            {block.code}
                          </code>
                        </pre>
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </div>

          {/* Right Column: Infobox (Wikipedia style) */}
          <div className="w-full lg:w-1/3 relative">
            <div className="sidebar-info flex flex-col gap-10 pb-12 h-[calc(100vh-8rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-2 w-full">

              {/* Main Info Card (Brutalist Wikipedia Style) */}
              <div className="bg-white border border-black/20 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 relative overflow-hidden group">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-600 translate-x-8 -translate-y-8 rotate-45 group-hover:scale-150 transition-transform duration-500"></div>

                <h3 className="font-black text-3xl uppercase tracking-tighter mb-8 pb-4 border-b-2 border-black flex items-center gap-3">
                  <FileText className="text-emerald-600" /> Spesifikasi
                </h3>

                <table className="w-full text-base">
                  <tbody>
                    <tr className="border-b border-black/10 group/row hover:bg-black/5 transition-colors">
                      <th className="py-4 px-2 text-left font-mono uppercase tracking-widest opacity-50 w-2/5 flex items-center gap-2"><User size={16} /> Kreator</th>
                      <td className="py-4 px-2 font-bold text-right">{project.author}</td>
                    </tr>
                    <tr className="border-b border-black/10 group/row hover:bg-black/5 transition-colors">
                      <th className="py-4 px-2 text-left font-mono uppercase tracking-widest opacity-50 flex items-center gap-2"><Calendar size={16} /> Rilis</th>
                      <td className="py-4 px-2 font-bold text-right">{project.year}</td>
                    </tr>
                    <tr className="border-b border-black/10 group/row hover:bg-black/5 transition-colors">
                      <th className="py-4 px-2 text-left font-mono uppercase tracking-widest opacity-50 flex items-center gap-2"><GitBranch size={16} /> Versi</th>
                      <td className="py-4 px-2 font-bold text-right">{project.version}</td>
                    </tr>
                    <tr className="border-b border-black/10 group/row hover:bg-black/5 transition-colors">
                      <th className="py-4 px-2 text-left font-mono uppercase tracking-widest opacity-50 flex items-center gap-2"><FileText size={16} /> Lisensi</th>
                      <td className="py-4 px-2 font-bold text-right">{project.license}</td>
                    </tr>
                    <tr className="group/row hover:bg-black/5 transition-colors">
                      <th className="py-4 px-2 text-left font-mono uppercase tracking-widest opacity-50 flex items-center gap-2"><Github size={16} /> Repo</th>
                      <td className="py-4 px-2 font-bold text-right text-emerald-600 hover:underline cursor-pointer truncate max-w-[150px]" title={project.repository}>
                        {project.repository?.split('/')[1] || project.repository}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Categories / Tags */}
              <div className="bg-transparent border-2 border-black/20 border-dashed p-6">
                <h4 className="font-mono text-xs uppercase tracking-widest opacity-50 mb-4 flex items-center gap-2">
                  <Tag size={14} /> Kategori Proyek
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.categories?.map((cat, i) => (
                    <span key={i} className="px-3 py-1 bg-black/5 font-bold text-sm hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tech Stack Box */}
              <div className="bg-[#1A1A1A] text-white p-8 shadow-[8px_8px_0px_0px_rgba(5,150,105,1)] relative overflow-hidden border border-black">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>

                <h3 className="font-black text-2xl uppercase tracking-tighter mb-6 flex items-center gap-3 relative z-10">
                  <Code2 size={24} className="text-emerald-500" /> Tech Stack
                </h3>
                <div className="flex flex-wrap gap-3 relative z-10">
                  {project.techStack?.map((tech, i) => (
                    <span key={i} className="px-4 py-2 border border-white/20 font-mono text-xs uppercase tracking-widest hover:bg-emerald-600 hover:border-emerald-600 hover:text-white transition-all cursor-default transform hover:-translate-y-1 bg-black/50">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share & Actions */}
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex gap-2">
                  <button onClick={() => haptics.trigger(50)} className="flex-1 border-2 border-black/20 py-3 flex justify-center items-center hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-colors group">
                    <Twitter size={20} className="group-hover:scale-110 transition-transform" />
                  </button>
                  <button onClick={() => haptics.trigger(50)} className="flex-1 border-2 border-black/20 py-3 flex justify-center items-center hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-colors group">
                    <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className={cn(
                      "flex-1 border-2 py-3 flex justify-center items-center transition-colors group",
                      copied ? "bg-emerald-600 text-white border-emerald-600" : "border-black/20 hover:bg-black hover:text-white hover:border-black"
                    )}
                  >
                    {copied ? <Check size={20} /> : <LinkIcon size={20} className="group-hover:scale-110 transition-transform" />}
                  </button>
                </div>

                <a href="#" onClick={() => haptics.trigger(50)} className="w-full bg-emerald-600 text-white py-5 px-8 font-bold text-lg uppercase tracking-widest flex items-center justify-between hover:bg-emerald-700 transition-colors group relative overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <span className="relative z-10">Kunjungi Website</span>
                  <ExternalLink size={20} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  <div className="absolute inset-0 bg-black/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Horizontal Scroll Gallery Section */}
      <div className="w-full mt-32 bg-[#1A1A1A] text-white py-32 overflow-hidden border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-16 mb-16">
          <h2 className="font-black text-5xl md:text-7xl uppercase tracking-tighter flex items-center gap-4">
            <span className="text-emerald-600">/</span> Galeri Proyek
          </h2>
        </div>

        <div ref={galleryRef} className="flex w-[300vw] h-[60vh] md:h-[80vh]">
          {project.gallery?.map((img, i) => (
            <div key={i} className="gallery-item w-screen h-full px-4 md:px-16 flex items-center justify-center shrink-0">
              <div className="w-full h-full relative group overflow-hidden border border-white/10 shadow-2xl">
                <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/20 transition-colors duration-500 mix-blend-multiply"></div>

                {/* Overlay info */}
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <span className="font-mono text-sm uppercase tracking-widest text-emerald-500">Tangkapan Layar 0{i + 1}</span>
                  <h3 className="font-bold text-2xl mt-2">Antarmuka Sistem Desa</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Project Teaser */}
      <div className="w-full py-32 flex justify-center items-center mt-16">
        <Link to="/projects" onClick={() => haptics.trigger(50)} className="group flex flex-col items-center text-center">
          <span className="font-mono text-sm uppercase tracking-widest opacity-50 mb-4">Proyek Selanjutnya</span>
          <h2 className="font-black text-5xl md:text-8xl tracking-tighter uppercase group-hover:text-emerald-600 transition-colors duration-300 flex items-center gap-4">
            NEXUS API <ArrowRight size={48} className="group-hover:translate-x-4 transition-transform duration-300" />
          </h2>
        </Link>
      </div>

    </div>
  );
}
