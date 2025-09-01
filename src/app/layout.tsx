import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Domina tus habilidades de conversación en citas - Reto 100 días",
  description: "100 días para aprender rompehielos, mejorar tus historias y dejar de quedarte en blanco en tus citas. Convierte cualquier charla en química irresistible.",
  keywords: ["conversación", "citas", "rompehielos", "storytelling", "confianza", "dating"],
  authors: [{ name: "Dating Conversation Challenge" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: "en_US",
    title: "Domina tus habilidades de conversación en citas - Reto 100 días",
    description: "100 días para aprender rompehielos, mejorar tus historias y dejar de quedarte en blanco en tus citas.",
    siteName: "Dating Conversation Challenge",
  },
  twitter: {
    card: "summary_large_image",
    title: "Domina tus habilidades de conversación en citas - Reto 100 días",
    description: "100 días para aprender rompehielos, mejorar tus historias y dejar de quedarte en blanco en tus citas.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark">
      <head>
        <style>{`
          html {
            font-family: ${figtree.style.fontFamily};
            --font-sans: ${figtree.variable};
            --font-instrument-serif: ${instrumentSerif.variable};
          }
        `}</style>
      </head>
      <body className={`${figtree.variable} ${instrumentSerif.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}