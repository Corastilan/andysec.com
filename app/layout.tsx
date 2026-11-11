import type { Metadata } from "next";
import figlet from "figlet";
import "@fontsource/montserrat/latin-400.css";
import "@fontsource/montserrat/latin-600.css";
import "./globals.css";
import { ConsoleBanner } from "./console-banner";

// Render at build time so figlet and its fonts never reach the client bundle.
const bannerWidth = 80;
const bannerLines = figlet
  .textSync("Andysec", { font: "ANSI Shadow", width: bannerWidth })
  .replace(/^\n+/, "")
  .replace(/\n+$/, "")
  .split("\n")
  .map((line) => line.replace(/\s+$/, ""));

while (bannerLines.length > 0 && bannerLines[0] === "") bannerLines.shift();
while (bannerLines.length > 0 && bannerLines[bannerLines.length - 1] === "") {
  bannerLines.pop();
}

const artWidth = Math.max(...bannerLines.map((line) => line.length));
const margin = " ".repeat(
  Math.max(0, Math.floor((bannerWidth - artWidth) / 2)),
);
const consoleBanner = bannerLines.map((line) => margin + line).join("\n");

export const metadata: Metadata = {
  title: "Andysec",
  description: "Cybersecurity Student at NYU Tandon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ConsoleBanner banner={consoleBanner} />
        {children}
      </body>
    </html>
  );
}
