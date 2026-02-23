const Footer = () => (
  <footer className="border-t border-border py-10 px-4">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="font-display text-lg font-bold text-gradient-cyan">INNOVEX 2026</div>
      <p className="text-sm text-muted-foreground text-center">
        © 2026 INNOVEX. Built with passion for innovation.
      </p>
      <div className="flex gap-6">
        {["Twitter", "Instagram", "Discord"].map((s) => (
          <a key={s} href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            {s}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
