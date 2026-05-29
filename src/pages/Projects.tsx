import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowUpRight, Search, Plus, X, ArrowRight } from 'lucide-react';
import { cn } from '../utils/cn';
import { haptics } from '../utils/haptics';

import { Project } from '../types/project';
import { getProjects, submitProject } from '../services/projectService';
import { isSupabaseConfigured } from '../lib/supabase';

const CONTACT_EMAIL = 'kontak@ourcreativity.id';

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const imageRevealRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    link: '',
    desc: '',
    category: '',
    techStack: '',
    author: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    link: '',
    desc: '',
    category: '',
    techStack: '',
    author: ''
  });

  useEffect(() => {
    document.title = "Daftar Proyek · OurCode";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Explore proyek-proyek inovatif buatan developer komunitas OurCreativity. Mulai dari sistem administrasi publik hingga API gateway.");
    }
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProjects();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.page-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      });

      gsap.from('.project-item', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const imageContainer = imageRevealRef.current;
    if (!imageContainer) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    const render = () => {
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;

      gsap.set(imageContainer, {
        x: currentX,
        y: currentY,
        xPercent: -50,
        yPercent: -50,
      });

      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const handleMouseEnter = (img: string) => {
    setHoveredImage(img);
    gsap.to(imageRevealRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: 'power3.out',
    });
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRevealRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      ease: 'power3.out',
    });
    gsap.to(imageRef.current, {
      scale: 1.2,
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    haptics.trigger('nudge');

    const newErrors = {
      name: '',
      link: '',
      desc: '',
      category: '',
      techStack: '',
      author: ''
    };
    let hasError = false;

    if (!formData.category) {
      newErrors.category = 'Kategori wajib dipilih.';
      hasError = true;
    }
    if (!formData.author.trim()) {
      newErrors.author = 'Nama pembuat wajib diisi.';
      hasError = true;
    } else if (formData.author.trim().length < 2) {
      newErrors.author = 'Nama pembuat minimal harus 2 karakter.';
      hasError = true;
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Nama proyek wajib diisi.';
      hasError = true;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nama proyek minimal harus 2 karakter.';
      hasError = true;
    }
    if (!formData.link.trim()) {
      newErrors.link = 'Link repository/sosmed wajib diisi.';
      hasError = true;
    } else if (!/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(formData.link.trim())) {
      newErrors.link = 'Link harus berupa URL valid (contoh: https://github.com/user).';
      hasError = true;
    }
    if (!formData.techStack.trim()) {
      newErrors.techStack = 'Tech stack wajib diisi.';
      hasError = true;
    } else if (formData.techStack.trim().length < 2) {
      newErrors.techStack = 'Tech stack minimal harus 2 karakter.';
      hasError = true;
    }
    if (!formData.desc.trim()) {
      newErrors.desc = 'Deskripsi singkat wajib diisi.';
      hasError = true;
    } else if (formData.desc.trim().length < 10) {
      newErrors.desc = 'Deskripsi minimal harus 10 karakter.';
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) {
      setFormState('error');
      return;
    }

    setFormState('loading');

    try {
      if (isSupabaseConfigured) {
        await submitProject({
          title: formData.name,
          category: formData.category,
          year: new Date().getFullYear().toString(),
          author: formData.author,
          repository: formData.link,
          summary: formData.desc,
          techStack: formData.techStack.split(',').map(s => s.trim()).filter(Boolean),
          image: ''
        });
      } else {
        const subject = encodeURIComponent(`[OurCode] Pengajuan Proyek Baru: ${formData.name}`);
        const body = encodeURIComponent(
          `Nama Pembuat: ${formData.author}\n` +
          `Nama Proyek: ${formData.name}\n` +
          `Kategori: ${formData.category}\n` +
          `Link: ${formData.link}\n` +
          `Tech Stack: ${formData.techStack}\n\n` +
          `Deskripsi:\n${formData.desc}`
        );
        window.open(`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`, '_blank');
      }
      
      setFormState('success');
      setFormData({ name: '', link: '', desc: '', category: '', techStack: '', author: '' });
      setTimeout(() => {
        setIsModalOpen(false);
        setFormState('idle');
      }, 2000);
    } catch (err) {
      console.error('Failed to submit project:', err);
      setFormState('error');
    }
  };

  return (
    <div ref={containerRef} className="w-full min-h-screen pt-32 pb-48 px-4 md:px-16 relative">
      <div className="max-w-7xl mx-auto">
        <div className="overflow-hidden mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="page-title font-black text-6xl md:text-9xl tracking-tighter uppercase">
              PROYEK<span className="text-emerald-600">.</span>
            </h1>
            <p className="page-title font-mono text-xs md:text-sm uppercase tracking-widest mt-4 opacity-60 max-w-md">
              Kumpulan karya open-source dan closed-source yang dibikin pake dedikasi dan kode yang rapi.
            </p>
          </div>
        </div>

        {/* Search & Submit Actions */}
        <div className="page-title flex flex-col md:flex-row gap-6 md:gap-12 mb-16 items-end border-b-4 border-black dark:border-white/20 pb-6">
          <div className="flex-1 w-full relative group flex items-center">
            <Search className="absolute left-0 text-black/40 dark:text-white/40 group-focus-within:text-emerald-600 dark:group-focus-within:text-emerald-400 transition-colors" size={32} strokeWidth={3} />
            <input
              type="text"
              placeholder="CARI PROYEK..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent pl-12 py-2 text-3xl md:text-5xl font-black uppercase tracking-tighter focus:outline-none placeholder-black/20 dark:placeholder-white/20 text-[#1A1A1A] dark:text-[#F5F5F0]"
            />
          </div>
          <button
            onClick={() => {
              haptics.trigger('nudge');
              setIsModalOpen(true);
            }}
            className="shrink-0 flex items-center gap-3 text-sm md:text-base font-black uppercase tracking-widest hover:text-emerald-700 dark:hover:text-emerald-400 transition-all group border-2 border-black dark:border-white/20 px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] bg-white dark:bg-[#1A1A1A] text-[#1A1A1A] dark:text-[#F5F5F0]"
          >
            SUBMIT PROYEK
            <span className="bg-[#1A1A1A] dark:bg-[#F5F5F0] text-white dark:text-[#1A1A1A] p-1 rounded-sm group-hover:bg-emerald-700 dark:group-hover:bg-emerald-500 transition-all">
              <Plus size={20} strokeWidth={3} />
            </span>
          </button>
        </div>

        <ul ref={listRef} className="w-full">
          {isLoading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <li key={i} className="border-b-2 border-black dark:border-white/20 py-8 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-pulse">
                  <div className="flex items-center gap-8 md:gap-16">
                    <div className="w-8 h-8 bg-black/10 dark:bg-white/10 rounded-sm"></div>
                    <div className="h-12 md:h-16 w-48 md:w-96 bg-black/10 dark:bg-white/10 rounded-sm"></div>
                  </div>
                  <div className="flex items-center gap-8 md:gap-16 ml-16 md:ml-0">
                    <div className="flex flex-col items-start md:items-end gap-2">
                      <div className="h-3 w-12 bg-black/5 dark:bg-white/5 rounded-sm"></div>
                      <div className="h-4 w-20 bg-black/10 dark:bg-white/10 rounded-sm"></div>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-2">
                      <div className="h-3 w-12 bg-black/5 dark:bg-white/5 rounded-sm"></div>
                      <div className="h-4 w-12 bg-black/10 dark:bg-white/10 rounded-sm"></div>
                    </div>
                    <div className="w-16 h-16 bg-black/5 dark:bg-white/5 border-2 border-black/10 dark:border-white/10 hidden md:block rounded-sm"></div>
                  </div>
                </li>
              ))}
            </>
          ) : filteredProjects.length > 0 ? filteredProjects.map((project) => (
            <li key={project.id} className="project-item border-b-2 border-black dark:border-white/20 group">
              <Link
                to={`/project/${project.id}`}
                onClick={() => haptics.trigger(50)}
                className="block py-8 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden"
                onMouseEnter={() => handleMouseEnter(project.image)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Background hover effect */}
                <div className="absolute inset-0 bg-[#1A1A1A] dark:bg-emerald-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] z-0"></div>

                <div className="flex items-center gap-8 md:gap-16 z-10">
                  <span className="font-mono text-lg md:text-2xl font-bold opacity-40 group-hover:text-emerald-500 dark:group-hover:text-emerald-300 transition-colors duration-300">
                    {project.id}
                  </span>
                  <h2 className="font-black text-5xl md:text-8xl tracking-tighter group-hover:text-white transition-colors duration-300 group-hover:translate-x-4 transform">
                    {project.title}
                  </h2>
                </div>

                <div className="flex items-center gap-8 md:gap-16 z-10 ml-16 md:ml-0">
                  <div className="flex flex-col items-start md:items-end">
                    <span className="font-mono text-xs uppercase tracking-widest opacity-60 group-hover:text-white/60 transition-colors duration-300">Kategori</span>
                    <span className="font-bold text-sm md:text-base group-hover:text-emerald-400 dark:group-hover:text-emerald-300 transition-colors duration-300">{project.category}</span>
                  </div>
                  <div className="flex flex-col items-start md:items-end">
                    <span className="font-mono text-xs uppercase tracking-widest opacity-60 group-hover:text-white/60 transition-colors duration-300">Tahun</span>
                    <span className="font-bold text-sm md:text-base group-hover:text-white transition-colors duration-300">{project.year}</span>
                  </div>
                  <div className="w-16 h-16 border-2 border-black dark:border-white/20 flex items-center justify-center group-hover:border-emerald-500 dark:group-hover:border-emerald-400 group-hover:bg-emerald-500 dark:group-hover:bg-emerald-400 group-hover:text-white transition-all duration-300 hidden md:flex shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] group-hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] bg-white dark:bg-[#1A1A1A]">
                    <ArrowUpRight size={28} strokeWidth={3} className="group-hover:rotate-45 transition-transform duration-300 text-black dark:text-[#F5F5F0] group-hover:text-white dark:group-hover:text-[#1A1A1A]" />
                  </div>
                </div>
              </Link>
            </li>
          )) : (
            <li className="py-12 text-center font-mono text-sm uppercase tracking-widest opacity-50">
              Nggak ada proyek yang cocok sama pencarian kamu.
            </li>
          )}
        </ul>
      </div>

      {/* Floating Image Reveal (Desktop Only) */}
      <div
        ref={imageRevealRef}
        className="fixed top-0 left-0 w-[400px] h-[300px] pointer-events-none z-50 overflow-hidden scale-80 opacity-0 hidden md:block shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] dark:shadow-[16px_16px_0px_0px_rgba(255,255,255,0.2)] border-4 border-black dark:border-white/20 bg-white dark:bg-[#1A1A1A]"
      >
        <img
          ref={imageRef}
          src={hoveredImage || (projects.length > 0 ? projects[0].image : '')}
          alt="Project Preview"
          className="w-full h-full object-cover scale-125 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-emerald-600/20 mix-blend-multiply"></div>
      </div>

      {/* Submit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            onClick={() => {
              setIsModalOpen(false);
              setErrors({ name: '', link: '', desc: '', category: '', techStack: '', author: '' });
              setFormState('idle');
            }}
          ></div>
          <div className="bg-[#E4E4E2] dark:bg-[#0A0A0A] w-full max-w-2xl p-8 md:p-12 relative z-10 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] dark:shadow-[16px_16px_0px_0px_rgba(255,255,255,0.2)] border-4 border-black dark:border-white/20 text-[#1A1A1A] dark:text-[#F5F5F0] overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => {
                haptics.trigger(50);
                setIsModalOpen(false);
                setErrors({ name: '', link: '', desc: '', category: '', techStack: '', author: '' });
                setFormState('idle');
              }}
              className="absolute top-6 right-6 opacity-50 hover:opacity-100 hover:rotate-90 transition-all bg-white dark:bg-[#1A1A1A] border-2 border-black dark:border-white/20 p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:bg-emerald-500 dark:hover:bg-emerald-500 hover:text-white z-20"
            >
              <X size={24} strokeWidth={3} />
            </button>

            <h2 className="font-black text-4xl md:text-5xl tracking-tighter uppercase mb-2">Submit Proyek</h2>
            <p className="font-mono text-xs uppercase tracking-widest opacity-60 mb-10 font-bold">
              Punya proyek keren? Kirim link repo atau sosmed kamu buat kita review dan tampilin.
            </p>

            <form className="flex flex-col gap-8" onSubmit={handleSubmit} noValidate>
              <div className="relative group">
                <select
                  id="projectCategory"
                  value={formData.category}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, category: e.target.value }));
                    if (errors.category) setErrors((p) => ({ ...p, category: '' }));
                  }}
                  disabled={formState === 'loading'}
                  className="w-full bg-transparent border-b-4 border-black dark:border-white/20 py-3 text-xl font-black focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-400 transition-colors appearance-none text-[#1A1A1A] dark:text-[#F5F5F0] rounded-none"
                >
                  <option value="" disabled className="text-black/50 dark:text-white/50 bg-[#E4E4E2] dark:bg-[#0A0A0A]">PILIH KATEGORI</option>
                  <option value="Web App" className="text-[#1A1A1A] dark:text-[#F5F5F0] bg-[#E4E4E2] dark:bg-[#0A0A0A]">WEB APP</option>
                  <option value="Mobile" className="text-[#1A1A1A] dark:text-[#F5F5F0] bg-[#E4E4E2] dark:bg-[#0A0A0A]">MOBILE</option>
                  <option value="Open Source" className="text-[#1A1A1A] dark:text-[#F5F5F0] bg-[#E4E4E2] dark:bg-[#0A0A0A]">OPEN SOURCE</option>
                  <option value="API" className="text-[#1A1A1A] dark:text-[#F5F5F0] bg-[#E4E4E2] dark:bg-[#0A0A0A]">API</option>
                  <option value="Game" className="text-[#1A1A1A] dark:text-[#F5F5F0] bg-[#E4E4E2] dark:bg-[#0A0A0A]">GAME</option>
                  <option value="Lainnya" className="text-[#1A1A1A] dark:text-[#F5F5F0] bg-[#E4E4E2] dark:bg-[#0A0A0A]">LAINNYA</option>
                </select>
                <label
                  htmlFor="projectCategory"
                  className="absolute left-0 -top-6 text-xs font-black text-emerald-600 dark:text-emerald-400 opacity-100 uppercase tracking-tighter transition-all duration-300 pointer-events-none"
                >
                  KATEGORI PROYEK
                </label>
                {errors.category && (
                  <p className="absolute left-0 -bottom-5 font-mono text-[10px] text-red-500 uppercase tracking-wider">{errors.category}</p>
                )}
              </div>

              <div className="relative group">
                <input
                  type="text"
                  id="projectAuthor"
                  placeholder=" "
                  value={formData.author}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, author: e.target.value }));
                    if (errors.author) setErrors((p) => ({ ...p, author: '' }));
                  }}
                  disabled={formState === 'loading'}
                  className="w-full bg-transparent border-b-4 border-black dark:border-white/20 py-3 text-xl font-black focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-400 transition-colors peer text-[#1A1A1A] dark:text-[#F5F5F0] rounded-none disabled:opacity-50"
                />
                <label
                  htmlFor="projectAuthor"
                  className="absolute left-0 top-3 text-sm font-black opacity-40 uppercase tracking-tighter peer-focus:-top-6 peer-focus:text-xs peer-focus:text-emerald-600 dark:peer-focus:text-emerald-400 peer-focus:opacity-100 peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:opacity-100 transition-all duration-300 pointer-events-none"
                >
                  NAMA PEMBUAT PROYEK
                </label>
                {errors.author && (
                  <p className="absolute left-0 -bottom-5 font-mono text-[10px] text-red-500 uppercase tracking-wider">{errors.author}</p>
                )}
              </div>

              <div className="relative group">
                <input
                  type="text"
                  id="projectName"
                  placeholder=" "
                  value={formData.name}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, name: e.target.value }));
                    if (errors.name) setErrors((p) => ({ ...p, name: '' }));
                  }}
                  disabled={formState === 'loading'}
                  className="w-full bg-transparent border-b-4 border-black dark:border-white/20 py-3 text-xl font-black focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-400 transition-colors peer text-[#1A1A1A] dark:text-[#F5F5F0] rounded-none disabled:opacity-50"
                />
                <label
                  htmlFor="projectName"
                  className="absolute left-0 top-3 text-sm font-black opacity-40 uppercase tracking-tighter peer-focus:-top-6 peer-focus:text-xs peer-focus:text-emerald-600 dark:peer-focus:text-emerald-400 peer-focus:opacity-100 peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:opacity-100 transition-all duration-300 pointer-events-none"
                >
                  NAMA PROYEK
                </label>
                {errors.name && (
                  <p className="absolute left-0 -bottom-5 font-mono text-[10px] text-red-500 uppercase tracking-wider">{errors.name}</p>
                )}
              </div>

              <div className="relative group">
                <input
                  type="url"
                  id="projectLink"
                  placeholder=" "
                  value={formData.link}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, link: e.target.value }));
                    if (errors.link) setErrors((p) => ({ ...p, link: '' }));
                  }}
                  disabled={formState === 'loading'}
                  className="w-full bg-transparent border-b-4 border-black dark:border-white/20 py-3 text-xl font-black focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-400 transition-colors peer text-[#1A1A1A] dark:text-[#F5F5F0] rounded-none disabled:opacity-50"
                />
                <label
                  htmlFor="projectLink"
                  className="absolute left-0 top-3 text-sm font-black opacity-40 uppercase tracking-tighter peer-focus:-top-6 peer-focus:text-xs peer-focus:text-emerald-600 dark:peer-focus:text-emerald-400 peer-focus:opacity-100 peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:opacity-100 transition-all duration-300 pointer-events-none"
                >
                  LINK REPOSITORY / SOSMED
                </label>
                {errors.link && (
                  <p className="absolute left-0 -bottom-5 font-mono text-[10px] text-red-500 uppercase tracking-wider">{errors.link}</p>
                )}
              </div>

              <div className="relative group">
                <input
                  type="text"
                  id="projectTech"
                  placeholder=" "
                  value={formData.techStack}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, techStack: e.target.value }));
                    if (errors.techStack) setErrors((p) => ({ ...p, techStack: '' }));
                  }}
                  disabled={formState === 'loading'}
                  className="w-full bg-transparent border-b-4 border-black dark:border-white/20 py-3 text-xl font-black focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-400 transition-colors peer text-[#1A1A1A] dark:text-[#F5F5F0] rounded-none disabled:opacity-50"
                />
                <label
                  htmlFor="projectTech"
                  className="absolute left-0 top-3 text-sm font-black opacity-40 uppercase tracking-tighter peer-focus:-top-6 peer-focus:text-xs peer-focus:text-emerald-600 dark:peer-focus:text-emerald-400 peer-focus:opacity-100 peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:opacity-100 transition-all duration-300 pointer-events-none"
                >
                  TECH STACK (PISAH DENGAN KOMA)
                </label>
                {errors.techStack && (
                  <p className="absolute left-0 -bottom-5 font-mono text-[10px] text-red-500 uppercase tracking-wider">{errors.techStack}</p>
                )}
              </div>

              <div className="relative group">
                <textarea
                  id="projectDesc"
                  rows={2}
                  placeholder=" "
                  value={formData.desc}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, desc: e.target.value }));
                    if (errors.desc) setErrors((p) => ({ ...p, desc: '' }));
                  }}
                  disabled={formState === 'loading'}
                  className="w-full bg-transparent border-b-4 border-black dark:border-white/20 py-3 text-xl font-black focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-400 transition-colors peer resize-none text-[#1A1A1A] dark:text-[#F5F5F0] rounded-none disabled:opacity-50"
                ></textarea>
                <label
                  htmlFor="projectDesc"
                  className="absolute left-0 top-3 text-sm font-black opacity-40 uppercase tracking-tighter peer-focus:-top-6 peer-focus:text-xs peer-focus:text-emerald-600 dark:peer-focus:text-emerald-400 peer-focus:opacity-100 peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:opacity-100 transition-all duration-300 pointer-events-none"
                >
                  DESKRIPSI SINGKAT
                </label>
                {errors.desc && (
                  <p className="absolute left-0 -bottom-5 font-mono text-[10px] text-red-500 uppercase tracking-wider">{errors.desc}</p>
                )}
              </div>

              {formState === 'error' && (
                <p className="font-mono text-sm text-red-500 uppercase tracking-widest -mt-6">Validasi gagal. Silakan periksa kembali!</p>
              )}

              {formState === 'success' && (
                <p className="font-mono text-sm text-emerald-500 uppercase tracking-widest -mt-6">Pengajuan terkirim! Silakan kirim email.</p>
              )}

              <button
                type="submit"
                disabled={formState === 'loading' || formState === 'success'}
                className="self-start flex items-center gap-3 text-base font-black uppercase tracking-widest border-2 border-black dark:border-white/20 bg-white dark:bg-[#1A1A1A] text-[#1A1A1A] dark:text-[#F5F5F0] px-8 py-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[10px_10px_0px_0px_rgba(255,255,255,0.2)] hover:-translate-y-1 hover:-translate-x-1 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all group mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formState === 'loading' ? (
                  'MENGIRIM...'
                ) : formState === 'success' ? (
                  'TERKIRIM!'
                ) : (
                  <>
                    KIRIM SUBMISSION
                    <span className="bg-[#1A1A1A] dark:bg-[#F5F5F0] text-white dark:text-[#1A1A1A] p-1 group-hover:bg-emerald-700 dark:group-hover:bg-emerald-500 transition-colors">
                      <ArrowRight size={20} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => {
            haptics.trigger(50);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="fixed bottom-8 right-8 z-40 p-4 rounded-sm border-2 border-black dark:border-white/20 bg-white dark:bg-[#1A1A1A] text-[#1A1A1A] dark:text-[#F5F5F0] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300 hover:text-emerald-600 dark:hover:text-emerald-400 group animate-fade-in"
          aria-label="Back to Top"
        >
          <ArrowRight size={24} className="-rotate-90 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
    </div>
  );
}
