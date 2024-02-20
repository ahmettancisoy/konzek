import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/navbar/Nav";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "Konzek Assignments",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className="bg-slate-200">
          <div className="flex flex-row">
            <Nav />
            <div className="py-6 px-12 h-screen w-full">{children}</div>
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}