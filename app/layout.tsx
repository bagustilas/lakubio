import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lakubio — Bikin Toko Online, Tinggal Isi Form",
  description:
    "Satu link untuk semua produkmu. Pelanggan pesan, langsung masuk WhatsApp. Tanpa install apa pun.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
