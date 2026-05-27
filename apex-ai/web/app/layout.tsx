import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";

export const metadata: Metadata = {
  title: "Apex AI",
  description: "AI integration platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 ml-56 overflow-y-auto bg-bg-base">
            <div className="p-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
