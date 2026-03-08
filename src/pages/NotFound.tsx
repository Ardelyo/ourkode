import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Terminal } from 'lucide-react';
import { haptics } from '../utils/haptics';

export default function NotFound() {
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#1A1A1A] text-white overflow-hidden relative px-4">

            {/* Background grid */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)', backgroundSize: '6vw 6vw' }} />

            {/* Floating noise blobs */}
            <div className="absolute top-1/4 right-[10%] w-48 h-48 bg-emerald-600 rounded-full blur-[80px] opacity-30" />
            <div className="absolute bottom-1/4 left-[10%] w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20" />

            <div className="relative z-10 text-center flex flex-col items-center">
                {/* Eyebrow */}
                <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-emerald-400 mb-8">
                    <Terminal size={14} />
                    <span>ERROR 404 // HALAMAN TIDAK DITEMUKAN</span>
                </div>

                {/* Giant 404 */}
                <h1 className="font-black text-[30vw] md:text-[20vw] leading-none tracking-tighter text-transparent select-none"
                    style={{ WebkitTextStroke: '2px rgba(255,255,255,0.15)' }}>
                    404
                </h1>

                {/* Overlaid message */}
                <p className="font-black text-4xl md:text-7xl uppercase tracking-tighter -mt-8 md:-mt-16 drop-shadow-2xl">
                    NYASAR<br />
                    <span className="text-emerald-500">BRAY?</span>
                </p>

                <p className="font-mono text-sm md:text-base text-white/50 mt-8 max-w-sm leading-relaxed">
                    Halaman yang kamu cari udah pindah, dihapus, atau emang nggak pernah ada. Balik ke beranda aja.
                </p>

                <Link
                    to="/"
                    onClick={() => haptics.trigger('nudge')}
                    className="mt-12 group flex items-center gap-4 font-black uppercase tracking-widest border-2 border-white/20 px-8 py-4 text-base hover:bg-emerald-600 hover:border-emerald-600 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[8px_8px_0px_0px_rgba(5,150,105,0.5)] hover:-translate-y-1 hover:-translate-x-1"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    BALIK KE BERANDA
                </Link>
            </div>

            {/* Bottom watermark */}
            <div className="absolute bottom-8 font-mono text-[10px] uppercase tracking-widest opacity-30">
                © 2026 OURCREATIVITY — Y0UR CODE Y0UR RULES
            </div>
        </div>
    );
}
