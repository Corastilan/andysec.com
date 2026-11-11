"use client";

import { useEffect } from "react";

let hasLogged = false;

type Rgb = readonly [number, number, number];

// Matches the magenta-to-cyan gradient in the reference banner.
const gradientStops: Rgb[] = [
  [255, 0, 200],
  [168, 85, 247],
  [99, 102, 241],
  [34, 211, 238],
];

const warningStyle =
  "font-family:monospace;font-size:12px;white-space:pre;font-weight:bold;color:#ff4d4d;-webkit-text-fill-color:#ff4d4d;";

const fallbackStyle = [
  "font-family:monospace",
  "font-size:12px",
  "line-height:1",
  "white-space:pre",
  "color:#22d3ee",
  "background-image:linear-gradient(90deg,#ff00c8,#a855f7,#6366f1,#22d3ee)",
  "-webkit-background-clip:text",
  "background-clip:text",
  "-webkit-text-fill-color:transparent",
].join(";");

function colorAt(t: number, row: number): Rgb {
  const position = Math.min(1, Math.max(0, t)) * (gradientStops.length - 1);
  const index = Math.min(gradientStops.length - 2, Math.floor(position));
  const fraction = position - index;
  const start = gradientStops[index];
  const end = gradientStops[index + 1];
  const shade = Math.max(0.65, 1 - row * 0.05);

  return [
    Math.round((start[0] + (end[0] - start[0]) * fraction) * shade),
    Math.round((start[1] + (end[1] - start[1]) * fraction) * shade),
    Math.round((start[2] + (end[2] - start[2]) * fraction) * shade),
  ];
}

function toAnsi(art: string) {
  const lines = art.split("\n");
  const width = Math.max(1, ...lines.map((line) => line.length));
  const lastColumn = Math.max(1, width - 1);

  return lines
    .map((line, row) =>
      Array.from(line)
        .map((char, column) => {
          const [r, g, b] = colorAt(column / lastColumn, row);
          return `\x1b[38;2;${r};${g};${b}m${char}`;
        })
        .join("") + "\x1b[0m",
    )
    .join("\n");
}

function supportsAnsi() {
  // Chrome/Edge render ANSI escape codes in DevTools; Firefox and Safari
  // currently do not, so they fall back to a CSS gradient.
  return /Chrome|Chromium|CriOS|Edg\//.test(navigator.userAgent);
}

export function ConsoleBanner({ banner }: { banner: string }) {
  useEffect(() => {
    // Avoid a duplicate banner from React Strict Mode's double effect.
    if (hasLogged) return;
    hasLogged = true;

    const warning = "Watch out for Self-XSS!";
    const bannerWidth = Math.max(
      ...banner.split("\n").map((line) => line.length),
    );
    const padding = " ".repeat(
      Math.max(0, Math.floor((bannerWidth - warning.length) / 2)),
    );
    const warningLine = padding + warning;

    // The leading newline keeps DevTools' source link off the first row of
    // the art, which would otherwise overlap it.
    if (supportsAnsi()) {
      console.log(
        "%s",
        `\n${toAnsi(banner)}\n\n\x1b[1;91m${warningLine}\x1b[0m`,
      );
    } else {
      console.log(
        "%c%s%c%s",
        fallbackStyle,
        `\n${banner}\n\n`,
        warningStyle,
        warningLine,
      );
    }
  }, [banner]);

  return null;
}
