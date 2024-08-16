import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "People CO",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-screen bg-gray-100 text-[#212121]">
          <Navbar />
          <div className="flex flex-1 w-full mt-2">
            <div className="w-1/6">
              <Sidebar />
            </div>
            <div className="w-5/6 shadow-sm rounded-xl">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}