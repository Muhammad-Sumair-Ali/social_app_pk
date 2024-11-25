import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/common/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Social App",
  description: "Social App By Muhammad Sumair",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <AuthProvider>
        <Toaster/>
        {children}
         </AuthProvider>
      </body>
    </html>
  );
}
