import React from 'react';
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

export default function App() {
  return (
    <Router>
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
          </Routes>
        </PageTransition>
      </Layout>
    </Router>
  );
}
