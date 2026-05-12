"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 1.077, prefix: "$", suffix: "M", label: "NOI Featured Asset", decimals: 3 },
  { value: 100, suffix: "%", label: "Occupancy" },
  { value: 4, suffix: "+", label: "Active Markets" }
];

export function CounterStats({ variant = "hero" }: { variant?: "hero" | "strip" }) {
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
          const eased = Math.min(1, elapsed / 1200);
          setProgress(1 - Math.pow(1 - eased, 3));
          if (eased < 1) frame = requestAnimationFrame(animate);
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
    <div className={`stats stats--${variant}`} ref={ref}>
      {stats.map((stat) => {
        const amount = stat.decimals
          ? (stat.value * progress).toFixed(stat.decimals)
          : Math.round(stat.value * progress);
        const current = `${stat.prefix ?? ""}${amount}${stat.suffix ?? ""}`;
        return (
          <div className="stat" key={stat.label}>
            <strong>{current}</strong>
            <span>{stat.label}</span>
          </div>
        );
      })}
    </div>
  );
}
