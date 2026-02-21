import type { Metadata } from "next";
import { 
  Inter, 
  Roboto, 
  Lato, 
  Poppins, 
  Open_Sans, 
  Montserrat, 
  Playfair_Display, 
  Merriweather,
  Source_Sans_3,
  Raleway 
} from "next/font/google";
import { ToastProvider } from "@/components/ui/toast";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-roboto" });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-lato" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" });
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-opensans" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const merriweather = Merriweather({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-merriweather" });
const sourceSans = Source_Sans_3({ subsets: ["latin"], variable: "--font-sourcesans" });
const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway" });

export const metadata: Metadata = {
  title: "DOCZipp — Create Documents. Instantly.",
  description: "The fastest way to create professional invoices, quotes, estimates, and receipts. No signup required. Download as PDF and get paid faster.",
  keywords: ["invoice generator", "free invoice", "invoice template", "PDF invoice", "quote generator", "receipt maker", "doczipp"],
  openGraph: {
    title: "DOCZipp — Create Documents. Instantly.",
    description: "The fastest way to create professional invoices, quotes, and receipts.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${roboto.variable} ${lato.variable} ${poppins.variable} ${openSans.variable} ${montserrat.variable} ${playfair.variable} ${merriweather.variable} ${sourceSans.variable} ${raleway.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <SessionProvider>
          <ToastProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
