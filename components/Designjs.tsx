// components/BlockchainTheme/Hero.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { Bitcoin, Ethereum, Coins, Shield, Globe } from 'lucide-react';

interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

// Dynamically imported Particles component — keeps tsparticles out of the main chunk
const LazyParticles = React.lazy(() => import('@tsparticles/react'));

const particlesConfig = {
  fullScreen: { enable: false },
  background: { color: 'transparent' },
  fpsLimit: 60,
  particles: {
    number: { value: 30, density: { enable: true, height: 950, width: 950 } },
    color: { value: ['#7da3ff', '#8bb8ff', '#c9e1ff', '#ffc857'] },
    shape: { type: 'circle' },
    opacity: { value: { min: 0.1, max: 0.65 } },
    size: { value: { min: 0.5, max: 3.2 } },
    links: {
      enable: true,
      distance: 155,
      color: '#6f86ff',
      opacity: 0.38,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.8,
      direction: 'none' as const,
      outModes: { default: 'out' as const },
    },
  },
  interactivity: {
    detectsOn: 'window' as const,
    events: {
      onHover: { enable: false, mode: 'grab' as const },
      onClick: { enable: false, mode: 'push' as const },
      resize: { enable: true },
    },
    modes: {
      grab: { distance: 150, links: { opacity: 0.4 } },
      push: { quantity: 3 },
    },
  },
  pauseOnBlur: true,
  pauseOnOutsideViewport: true,
  detectRetina: true,
};

export function Hero({ scrollToSection }: HeroProps) {
  const [engineReady, setEngineReady] = useState(false);
  const [engineFailed, setEngineFailed] = useState(false);

  useEffect(() => {
    let mounted = true;

    // Dynamic import keeps @tsparticles/slim out of the main bundle
    Promise.all([
      import('@tsparticles/react'),
      import('@tsparticles/slim'),
    ])
      .then(async ([{ initParticlesEngine }, { loadSlim }]) => {
        await initParticlesEngine(async (engine) => {
          await loadSlim(engine);
        });
        if (mounted) setEngineReady(true);
      })
      .catch(() => {
        if (mounted) setEngineFailed(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const options = useMemo(() => particlesConfig, []);

  return (
    <div className="relative min-h-screen flex items-start md:items-center justify-center overflow-hidden pt-56 sm:pt-48 md:pt-28 lg:pt-20 pb-24">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b1024] via-[#090c1a] to-[#0e1633]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(255,200,87,0.22),transparent_35%),radial-gradient(circle_at_20%_20%,rgba(99,130,255,0.18),transparent_40%)]" />
        {/* Subtle tech pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%236f86ff' stroke-opacity='0.18' stroke-width='1'%3E%3Cpath d='M30 0v12M30 48v12M0 30h12M48 30h12M12 12h12v12H12zM36 36h12v12H36z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        {engineReady && (
          <React.Suspense fallback={null}>
            <LazyParticles
              id="tsparticles"
              className="absolute inset-0 pointer-events-none opacity-90"
              options={options}
            />
          </React.Suspense>
        )}
        {engineFailed && (
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(125,163,255,0.45),transparent_60%)]" />
        )}
        {/* Floating Elements */}
        <div className="absolute top-24 left-12 w-4 h-4 bg-[#7da3ff] rounded-full animate-pulse" />
        <div className="absolute top-44 right-24 w-3 h-3 bg-[#ffc857] rounded-full animate-pulse" />
        <div className="absolute bottom-40 left-1/4 w-5 h-5 bg-[#8bb8ff] rounded-full animate-pulse" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Blockchain Badge */}
        <div className="inline-flex max-w-full items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-2xl sm:rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 mb-8 mt-8 sm:mt-12 animate-fade-in">
          <Bitcoin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400 shrink-0" />
          <Ethereum className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
          <span className="text-[11px] sm:text-sm leading-tight font-medium text-center bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
            Web3 AI Revolution - 2025
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-8 animate-slide-up">
          <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            The AI Revolution
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent animate-gradient">
            Is Here
          </span>
        </h1>

        {/* Subheading */}
        <p className="max-w-3xl mx-auto text-xl text-gray-300 mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Empowering everyone with free and open-source AI tools. No paywalls. No restrictions. Just pure innovation.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">200+</div>
            <div className="text-sm text-gray-400">Free AI Tools</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-300 mb-1">100%</div>
            <div className="text-sm text-gray-400">Open Source</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-300 mb-1">50+</div>
            <div className="text-sm text-gray-400">Web3 AI Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-300 mb-1">Zero</div>
            <div className="text-sm text-gray-400">Subscription Fees</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <button
            onClick={() => scrollToSection('tools')}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:opacity-90 transition-all hover:scale-105"
          >
            Browse 200+ Free AI Tools
          </button>
          <button
            onClick={() => scrollToSection('guide')}
            className="px-8 py-4 rounded-2xl border border-purple-500/30 text-purple-200 hover:bg-purple-500/10 transition-all hover:scale-105"
          >
            Start AI Learning Journey
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-200 border border-purple-500/20">
            <Shield className="w-4 h-4" />
            <span className="text-sm">No Tracking - Privacy First</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-200 border border-cyan-500/20">
            <Globe className="w-4 h-4" />
            <span className="text-sm">Decentralized - Community Run</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-200 border border-indigo-500/20">
            <Coins className="w-4 h-4" />
            <span className="text-sm">Free Forever - No Hidden Costs</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-10 flex justify-center animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-purple-500/30 flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-purple-400 to-cyan-400 rounded-full mt-2 animate-scroll" />
          </div>
        </div>

        {/* Final Inspirational Message */}
        <div className="mt-6 text-center opacity-70">
          <p className="text-sm text-gray-400">
            <span className="text-purple-300">Support blockchain.</span>{" "}
            <span className="text-orange-300">Support Bitcoin.</span>{" "}
            <span className="text-cyan-300">Support decentralized technology.</span>
            <br />
            <span className="text-white font-semibold">The revolution will not be centralized.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
