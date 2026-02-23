const FloatingCTA = () => (
  <div className="fixed bottom-6 right-6 z-50 animate-float">
    <a
      href="#register"
      className="flex items-center gap-2 px-6 py-3 rounded-full font-display font-bold text-sm text-secondary-foreground transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "linear-gradient(135deg, hsl(var(--neon-orange)), hsl(var(--neon-blue)))",
        boxShadow: "0 10px 40px hsl(var(--neon-blue) / 0.4)",
      }}
    >
      🚀 Register Now
    </a>
  </div>
);

export default FloatingCTA;
