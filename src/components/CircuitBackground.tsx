import { useEffect, useRef } from "react";

const CircuitBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const lines: HTMLDivElement[] = [];
    for (let i = 0; i < 12; i++) {
      const line = document.createElement("div");
      line.className = "circuit-line";
      line.style.left = `${Math.random() * 100}%`;
      line.style.animationDelay = `${Math.random() * 4}s`;
      line.style.height = `${60 + Math.random() * 80}px`;
      line.style.opacity = `${0.2 + Math.random() * 0.3}`;
      container.appendChild(line);
      lines.push(line);
    }

    return () => {
      lines.forEach((l) => l.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
    />
  );
};

export default CircuitBackground;
