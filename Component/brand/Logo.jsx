"use client";

import { useId } from "react";

export default function Logo({
  showWordmark = true,
  size = 36,
  className = "",
  title = "XiviaSoft",
}) {
  const uid = useId().replace(/:/g, "");

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: Math.round(size * 0.28),
        minWidth: 0,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        role="img"
        aria-hidden={showWordmark ? true : undefined}
        aria-label={showWordmark ? undefined : title}
        style={{ flex: "0 0 auto" }}
      >
        <defs>
          <linearGradient
            id={`${uid}-a`}
            x1="8"
            y1="10"
            x2="56"
            y2="54"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#5EB3C1" />
            <stop offset="55%" stopColor="#1F8A9D" />
            <stop offset="100%" stopColor="#146F7F" />
          </linearGradient>
          <linearGradient
            id={`${uid}-b`}
            x1="56"
            y1="10"
            x2="8"
            y2="54"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#A8D8C8" />
            <stop offset="50%" stopColor="#7FC4D4" />
            <stop offset="100%" stopColor="#1F8A9D" />
          </linearGradient>
          <radialGradient id={`${uid}-core`} cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#E8F7FA" />
            <stop offset="100%" stopColor="#5EB3C1" />
          </radialGradient>
        </defs>

        <rect
          x="4"
          y="4"
          width="56"
          height="56"
          rx="18"
          fill="rgba(255,255,255,0.55)"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.25"
        />
        <rect
          x="7.5"
          y="7.5"
          width="49"
          height="49"
          rx="15"
          fill="rgba(238,244,248,0.35)"
        />

        {/* Crossing ribbons: intention × craft */}
        <path
          d="M18.5 16.5c1.8-1.8 4.7-1.8 6.5 0L47.5 39c1.8 1.8 1.8 4.7 0 6.5s-4.7 1.8-6.5 0L18.5 23c-1.8-1.8-1.8-4.7 0-6.5Z"
          fill={`url(#${uid}-a)`}
          opacity="0.92"
        />
        <path
          d="M45.5 16.5c1.8 1.8 1.8 4.7 0 6.5L23 45.5c-1.8 1.8-4.7 1.8-6.5 0s-1.8-4.7 0-6.5L39 16.5c1.8-1.8 4.7-1.8 6.5 0Z"
          fill={`url(#${uid}-b)`}
          opacity="0.9"
        />

        {/* Lumen core: insight becoming product */}
        <circle
          cx="32"
          cy="32"
          r="6.2"
          fill={`url(#${uid}-core)`}
          stroke="rgba(255,255,255,0.95)"
          strokeWidth="1.4"
        />
        <circle cx="30.6" cy="30.4" r="1.7" fill="rgba(255,255,255,0.85)" />
      </svg>

      {showWordmark && (
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: Math.round(size * 0.52),
            letterSpacing: "-0.03em",
            color: "var(--ink)",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </span>
      )}
    </span>
  );
}
