import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../utils/cn';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { haptics } from '../utils/haptics';

gsap.registerPlugin(ScrollTrigger);

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  const navItems = [
    { path: '/', label: 'BERANDA' },
    { path: '/projects', label: 'PROYEK' },
    { path: '/about', label: 'TENTANG' },
    { path: '/team', label: 'TIM' },
    { path: '/contact', label: 'KONTAK' },
  ];

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(
        menuItemsRef.current?.children || [],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hide logo on scroll down, show on scroll up
      ScrollTrigger.create({
        start: 'top -50',
        onUpdate: (self) => {
          if (self.direction === 1) {
            // Scrolling down
            gsap.to(logoRef.current, {
              y: -100,
              opacity: 0,
              duration: 0.4,
              ease: 'power2.inOut',
              pointerEvents: 'none'
            });
          } else {
            // Scrolling up
            gsap.to(logoRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: 'power2.out',
              pointerEvents: 'auto'
            });
          }
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const handleNavClick = () => {
    haptics.trigger(50);
    setIsMobileMenuOpen(false);
  };

  const toggleMenu = () => {
    haptics.trigger('nudge');
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen w-full relative font-sans overflow-hidden selection:bg-emerald-500 selection:text-white">
      {/* Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-50 dark:opacity-10"
        style={{
          backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px)',
          backgroundSize: '8vw 100%',
          backgroundPosition: 'center'
        }}>
      </div>

      {/* Crosshairs */}
      <div className="fixed top-[30%] left-[20%] w-4 h-4 pointer-events-none opacity-30 dark:opacity-20 z-[-1] hidden md:block">
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-current -translate-y-1/2"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-current -translate-x-1/2"></div>
      </div>
      <div className="fixed bottom-[40%] right-[25%] w-6 h-6 pointer-events-none opacity-30 dark:opacity-20 z-[-1] hidden md:block">
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-current -translate-y-1/2"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-current -translate-x-1/2"></div>
      </div>

      {/* Main Content */}
      <main className="relative w-full min-h-screen">
        {children}
      </main>

      {/* Brand Logo - Top Left */}
      <Link
        ref={logoRef}
        to="/"
        onClick={() => haptics.trigger('nudge')}
        className="fixed top-6 left-6 z-[60] flex items-center gap-3 bg-white dark:bg-[#1A1A1A] border-2 border-black dark:border-white/20 p-2 md:px-3 md:py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] hover:-translate-y-1 transition-all group"
      >
        <img src="/logo.webp" alt="OurCreativity" className="w-8 h-8 md:w-10 md:h-10 object-contain group-hover:scale-110 transition-transform duration-300" />
        <div className="hidden md:flex flex-col text-[#1A1A1A] dark:text-[#F5F5F0]">
          <span className="font-black text-sm tracking-tighter leading-none uppercase">OurCreativity</span>
          <span className="font-mono text-[9px] tracking-widest opacity-70 uppercase mt-1">Edisi Koding</span>
        </div>
      </Link>

      {/* Mobile Menu Toggle Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden fixed top-6 right-6 z-[60] bg-white dark:bg-[#1A1A1A] text-[#1A1A1A] dark:text-[#F5F5F0] border-2 border-black dark:border-white/20 p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] hover:-translate-y-1 transition-all"
      >
        {isMobileMenuOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
      </button>

      {/* Mobile Fullscreen Menu */}
      <div
        ref={menuRef}
        className={cn(
          "fixed inset-0 bg-[#E4E4E2] dark:bg-[#050505] z-[55] flex flex-col justify-center items-center md:hidden transition-transform duration-500 ease-in-out",
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="absolute inset-0 pointer-events-none z-0 opacity-50 dark:opacity-10"
          style={{
            backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px)',
            backgroundSize: '16vw 100%',
            backgroundPosition: 'center'
          }}>
        </div>
        <div ref={menuItemsRef} className="flex flex-col gap-8 text-center relative z-10 w-full px-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                className={cn(
                  "text-4xl sm:text-5xl font-black uppercase tracking-tighter border-b-4 pb-2 transition-colors",
                  isActive ? "border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-500" : "border-black dark:border-white/20 text-black dark:text-[#F5F5F0] hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-600 dark:hover:border-emerald-400"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Center Navigation Pill (Desktop Only) */}
      <div className="hidden md:block fixed bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <div className="flex bg-[#1A1A1A] dark:bg-[#F5F5F0] text-white dark:text-[#1A1A1A] text-[9px] md:text-[10px] font-mono uppercase tracking-widest rounded-[2px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] overflow-hidden border-2 border-black dark:border-white/20 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                className={cn(
                  "px-4 md:px-6 py-3 md:py-3.5 transition-all duration-300 relative overflow-hidden group border-r-2 border-black dark:border-white/20 last:border-r-0",
                  isActive ? "bg-emerald-600 dark:bg-emerald-500 text-white dark:text-[#1A1A1A] font-bold" : "hover:bg-white/10 dark:hover:bg-black/10 text-white/70 dark:text-black/70 hover:text-white dark:hover:text-black"
                )}
              >
                <span className="relative z-10">
                  {isActive && item.path !== '/' ? `[ ${item.label} ]` : item.label}
                </span>
                {!isActive && (
                  <span className="absolute inset-0 bg-emerald-600/20 dark:bg-emerald-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Micro Typography Edges */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 font-mono text-[8px] uppercase tracking-widest opacity-40 z-0 hidden md:block" style={{ writingMode: 'vertical-rl' }}>
        0194 Y 0194 H — 430
      </div>
      <div className="fixed bottom-8 left-8 font-mono text-[8px] uppercase tracking-widest opacity-40 z-0 hidden md:block">
        0194 X 0194 W
      </div>
      <div className="fixed bottom-8 right-8 font-mono text-[8px] uppercase tracking-widest opacity-40 z-0 hidden md:block">
        © 2026 OURCREATIVITY
      </div>
    </div>
  );
}
