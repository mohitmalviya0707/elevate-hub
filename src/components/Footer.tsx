const Footer = () => (
  <footer className="border-t border-border bg-background/90 backdrop-blur-xl mt-16">
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="font-display text-lg font-bold text-gradient-brand mb-3">InnovateX 2026</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The ultimate hackathon experience at SBITM Betul. Join us to code, innovate, and transform your ideas into reality.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold text-foreground mb-3">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {["About", "Rules", "Prizes", "Register"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border pt-6 text-center">
        <p className="text-sm text-muted-foreground">© 2026 SBITM Betul - E-Cell & IT Community</p>
        <p className="text-xs text-muted-foreground mt-1">InnovateX 2026 | Code. Innovate. Transform.</p>
        <p className="text-xs text-muted-foreground mt-1">
          Organized by E-Cell & IT Community, Shri Balaji Institute of Technology & Management
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
