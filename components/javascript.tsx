// App.tsx
import { useState, useEffect } from 'react';
import { Hero } from './BlockchainTheme/Hero';
import { Navigation } from './BlockchainTheme/Navigation';
import { Web3Manifesto } from './BlockchainTheme/Web3Manifesto';
import { AIToolsSection } from './BlockchainTheme/AIToolsSection';
import { AIBeginnersGuide } from './AIBeginnersGuide';
import { DeveloperAPIs } from './DeveloperAPIs';
import { OpenSourceModels } from './OpenSourceModels';
import { JoinCommunity } from './JoinCommunity';
import { Footer } from './Footer';
import { aiTools, categories } from '../data/aiToolsWithWeb3';

function App() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const { history } = window;
    const previousScrollRestoration = history.scrollRestoration;
    history.scrollRestoration = 'manual';

    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    resetScroll();
    const rafId = window.requestAnimationFrame(resetScroll);
    window.addEventListener('pageshow', resetScroll);

    return () => {
      window.removeEventListener('pageshow', resetScroll);
      window.cancelAnimationFrame(rafId);
      history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const targets = Array.from(document.querySelectorAll('[data-reveal]')) as HTMLElement[];
    if (targets.length === 0) return;
    document.body.classList.add('reveal-ready');

    if (typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    targets.forEach((el) => observer.observe(el));
    const fallbackId = window.setTimeout(() => {
      targets.forEach((el) => el.classList.add('is-revealed'));
    }, 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallbackId);
      document.body.classList.remove('reveal-ready');
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    document.body.classList.add('custom-cursor');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId = 0;

    const onMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;
      dot.style.setProperty('--cursor-x', `${mouseX}px`);
      dot.style.setProperty('--cursor-y', `${mouseY}px`);
      ring.style.setProperty('--cursor-x', `${ringX}px`);
      ring.style.setProperty('--cursor-y', `${ringY}px`);
      rafId = window.requestAnimationFrame(animate);
    };

    const onLeave = () => document.body.classList.add('cursor-hidden');
    const onEnter = () => document.body.classList.remove('cursor-hidden');
    const onDown = () => document.body.classList.add('cursor-click');
    const onUp = () => document.body.classList.remove('cursor-click');

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('mouseenter', onEnter);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      if (rafId) window.cancelAnimationFrame(rafId);
      document.body.classList.remove('custom-cursor', 'cursor-hidden', 'cursor-click');
    };
  }, []);

  useEffect(() => {
    setIsLoaded(true);

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const sections = [
          { id: 'hero', navSection: 'hero' },
          { id: 'tools', navSection: 'tools' },
          { id: 'manifesto', navSection: 'manifesto' },
          { id: 'guide', navSection: 'guide' },
          { id: 'apis', navSection: 'apis' },
          { id: 'opensource', navSection: 'opensource' },
          { id: 'resources', navSection: 'community' },
          { id: 'community', navSection: 'community' }
        ];
        const scrollPosition = window.scrollY + 200;

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = document.getElementById(sections[i].id);
          const sectionTop = section ? section.getBoundingClientRect().top + window.scrollY : null;
          if (sectionTop !== null && sectionTop <= scrollPosition) {
            setCurrentSection(sections[i].navSection);
            break;
          }
        }

      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const target = (element.querySelector('[data-section-start]') as HTMLElement | null) ?? element;
    const nav = document.querySelector('[data-app-nav]') as HTMLElement | null;
    const navBottom = nav ? nav.getBoundingClientRect().bottom : 0;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const viewportGap = isMobile ? 10 : 14;
    const sectionOffset = Math.max(navBottom + viewportGap, isMobile ? 96 : 80);
    const top = target.getBoundingClientRect().top + window.scrollY - sectionOffset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-black text-white transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div id="cursor-ring" className="cursor-ring" aria-hidden />
      <div id="cursor-dot" className="cursor-dot" aria-hidden />
      {/* Blockchain Background Effects */}
      <div className="fixed inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-black to-cyan-950/20" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }} />
        </div>

        {/* Bitcoin/Ethereum Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <Navigation currentSection={currentSection} scrollToSection={scrollToSection} />

      {/* Main Content */}
      <main className="relative z-10 page-intro">
        <section id="hero">
          <Hero scrollToSection={scrollToSection} />
        </section>

        <div data-reveal>
          <AIToolsSection aiTools={aiTools} categories={categories} />
        </div>

        <div data-reveal>
          <Web3Manifesto />
        </div>

        <div data-reveal>
          <AIBeginnersGuide />
        </div>

        <div data-reveal>
          <DeveloperAPIs />
        </div>

        <div data-reveal>
          <OpenSourceModels />
        </div>

        <div data-reveal>
          <JoinCommunity />
        </div>
      </main>

      {/* Footer */}
      <Footer scrollToSection={scrollToSection} />

    </div>
  );
}

export default App;
