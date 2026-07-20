"use client";

import React from "react";

export default function CategoryChart({ data }: { data: { name: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="w-full">
      <svg width="100%" height={data.length * 34} viewBox={`0 0 600 ${data.length * 34}`} preserveAspectRatio="none">
        {data.map((d, i) => {
          const barWidth = (d.value / max) * 400; // px
          return (
            <g key={d.name} transform={`translate(0, ${i * 34})`}>
              <text x={0} y={18} fontSize={12} fill="var(--color-foreground)">{d.name}</text>
              <rect x={120} y={4} width={barWidth} height={20} fill="var(--color-primary)" rx={6} />
              <text x={130 + barWidth} y={18} fontSize={12} fill="var(--color-foreground)">{d.value}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
