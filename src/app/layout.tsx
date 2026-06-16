import type { Metadata } from "next";
import { Quicksand, Space_Mono } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jplacorte.vercel.app"),
  title: "John Phillip | About me",
  description: "Personal space of John Phillip, a Full Stack Software Engineer. Deep-diving into hardware tuning and modern web engineering.",
  keywords: ["John Phillip", "Full Stack Engineer", "Software Engineer Philippines", "Hardware Tuning", "Anime.js Next.js Portfolio"],
  authors: [{ name: "John Phillip Febrero Lacorte" }],
  openGraph: {
    title: "John Phillip | About me",
    description: "Personal space of John Phillip, a Full Stack Software Engineer. Deep-diving into hardware tuning, and modern web engineering.",
    type: "website",
    locale: "en_PH",
    images: [
      {
        url: "/gallery/img3.jpg",
        width: 1200,
        height: 630,
        alt: "John Phillip - Full Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "John Phillip | About me",
    description: "Personal space of John Phillip, a Full Stack Software Engineer. Deep-diving into hardware tuning, and modern web engineering.",
    images: ["/gallery/img3.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${quicksand.variable} ${spaceMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-cute-bg text-cute-dark font-sans custom-cursor-active">
        {children}
      </body>
    </html>
  );
}
