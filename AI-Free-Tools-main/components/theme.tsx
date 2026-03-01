// components/BlockchainTheme/Web3Manifesto.tsx
import { Bitcoin, Ethereum, Coins, Network, Shield, Lock, Target, Users, Code } from 'lucide-react';
import { useRevealOnScroll } from '../src/hooks/useRevealOnScroll';

export function Web3Manifesto() {
  const { ref: sectionRef, isVisible } = useRevealOnScroll<HTMLElement>();

  const principles = [
    {
      icon: Shield,
      title: "Complete Privacy",
      description: "Your data belongs to you. No tracking, no surveillance, no data mining.",
      color: "from-emerald-500 to-cyan-500"
    },
    {
      icon: Network,
      title: "Decentralization",
      description: "No single point of failure. AI powered by the people, for the people.",
      color: "from-purple-500 to-cyan-500"
    },
    {
      icon: Lock,
      title: "Censorship Resistance",
      description: "Information wants to be free. AI should be accessible to everyone, everywhere.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Coins,
      title: "Economic Freedom",
      description: "Earn cryptocurrency by contributing compute power or AI models.",
      color: "from-cyan-500 to-indigo-500"
    },
    {
      icon: Users,
      title: "Community Governance",
      description: "Decisions made by the community, not by corporations.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Code,
      title: "Open Source Everything",
      description: "Transparent code that anyone can audit, improve, and fork.",
      color: "from-violet-500 to-purple-500"
    }
  ];

  return (
    <section ref={sectionRef} id="manifesto" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Blockchain Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-black to-cyan-950/20" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(251, 146, 60, 0.1) 0%, transparent 50%),
                          radial-gradient(circle at 75% 75%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)`
        }} />
        {/* Blockchain Nodes Animation */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div data-section-start className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 mb-6">
            <Target className="w-4 h-4 text-purple-300" />
            <span className="text-sm font-medium bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
              The Web3 AI Revolution
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Welcome to the Future of
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Decentralized AI
            </span>
          </h2>

          <p className="max-w-3xl mx-auto text-lg text-gray-300 mb-8">
            We're building a world where artificial intelligence is controlled by the people,
            not corporations. Where your data remains yours, and innovation happens in the open.
          </p>

          {/* Bitcoin & Ethereum Support */}
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20">
            <div className="flex items-center gap-2">
              <Bitcoin className="w-5 h-5 text-orange-400" />
              <span className="text-sm text-gray-300">Bitcoin: Digital Freedom</span>
            </div>
            <div className="w-px h-6 bg-gradient-to-b from-transparent via-purple-500/50 to-transparent" />
            <div className="flex items-center gap-2">
              <Ethereum className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-gray-300">Ethereum: Smart Contracts</span>
            </div>
            <div className="w-px h-6 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent" />
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-purple-300" />
              <span className="text-sm text-gray-300">Web3: User Ownership</span>
            </div>
          </div>
        </div>

        {/* Principles Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {principles.map((principle, index) => (
            <div
              key={index}
              className="group p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-purple-500/30 transition-all duration-300 sm:hover:scale-105"
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${principle.color} flex items-center justify-center mb-3 sm:mb-6 group-hover:scale-110 transition-transform`}>
                <principle.icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-sm sm:text-xl font-semibold text-white mb-1 sm:mb-3">{principle.title}</h3>
              <p className="text-xs sm:text-base text-gray-400">{principle.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-indigo-500/10 border border-purple-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Join the Decentralized AI Revolution
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              The future of AI is open, transparent, and owned by the people. 
              No more walled gardens, no more data exploitation, no more corporate control.
              <br /><br />
              <span className="text-purple-300 font-semibold">
                Technology revolution is here. You don't have to pay for freedom.
              </span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#tools"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Explore Free AI Tools
              </a>
              <a
                href="#guide"
                className="px-6 py-3 rounded-xl border border-purple-500/30 text-purple-200 hover:bg-purple-500/10 transition-colors"
              >
                Start Learning AI
              </a>
            </div>

            {/* Final Inspirational Message */}
            <div className="mt-8 pt-6 border-t border-purple-500/20">
              <p className="text-lg text-gray-300">
                <span className="text-cyan-300 font-semibold">Welcome to the future of Web3.</span>{" "}
                Support blockchain, support Bitcoin, support decentralized technology.
                <br />
                <span className="text-cyan-300">The revolution will not be centralized.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
