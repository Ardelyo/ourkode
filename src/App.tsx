import React, { Component, ErrorInfo, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PageTransition from './components/PageTransition';
import CustomCursor from './components/CustomCursor';
import ThemeToggle from './components/ThemeToggle';

// Pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Team from './pages/Team';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State;
  public props: Props;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
    this.props = props;
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#1A1A1A] text-white p-8 selection:bg-emerald-500 selection:text-black">
          <div className="max-w-md w-full border-2 border-black p-8 bg-white dark:bg-[#0A0A0A] text-black dark:text-white shadow-[8px_8px_0px_0px_rgba(16,185,129,1)]">
            <h1 className="font-mono text-emerald-500 font-bold tracking-widest uppercase text-sm mb-4">CRASH DETECTED // 500</h1>
            <h2 className="font-black text-3xl uppercase tracking-tighter mb-4">Aplikasi Terhenti</h2>
            <p className="font-medium text-black/75 dark:text-white/75 mb-6 leading-relaxed">
              Terjadi kesalahan tidak terduga di halaman ini. Jangan khawatir, kamu bisa kembali ke Beranda atau memuat ulang halaman.
            </p>
            <div className="flex flex-col gap-3 font-mono text-xs">
              <button 
                onClick={() => window.location.reload()} 
                className="w-full bg-black text-white dark:bg-white dark:text-black hover:bg-emerald-500 hover:text-black font-black uppercase py-3 border border-black/10 transition-colors duration-300"
              >
                MUAT ULANG HALAMAN
              </button>
              <a 
                href="/" 
                className="w-full bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 text-center font-black uppercase py-3 transition-colors duration-300"
              >
                KEMBALI KE BERANDA
              </a>
            </div>
            {this.state.error && (
              <pre className="mt-8 p-4 bg-black/5 dark:bg-white/5 border border-black/10 font-mono text-[10px] overflow-auto max-h-32 text-red-500">
                {this.state.error.toString()}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <Router>
      <ErrorBoundary>
        <CustomCursor />
        <ThemeToggle />
        <Layout>
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </Layout>
      </ErrorBoundary>
    </Router>
  );
}

