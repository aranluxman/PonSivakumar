"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "+", label: "Residential Properties Managed" },
  { value: 1.077, prefix: "$", suffix: "M", label: "NOI (Featured Asset)", decimals: 3 },
  { value: 1, display: "GTA North", label: "Focus" }
];

export function CounterStats() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const animate = (time: number) => {
          const elapsed = time - start;
          const eased = Math.min(1, elapsed / 1250);
          setProgress(1 - Math.pow(1 - eased, 3));
          if (eased < 1) {
            frame = requestAnimationFrame(animate);
          }
        };
        frame = requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.35 }
    );

    observer.observe(target);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="stats" ref={ref}>
      {stats.map((stat) => {
        const current = stat.display
          ? stat.display
          : `${stat.prefix ?? ""}${(stat.value * progress).toFixed(stat.decimals ?? 0)}${stat.suffix ?? ""}`;
        return (
          <div className="stat" key={stat.label}>
            <strong>{stat.display && progress < 1 ? "GTA" : current}</strong>
            <span>{stat.label}</span>
          </div>
        );
      })}
    </div>
  );
}
