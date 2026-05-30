"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const segments = useSelectedLayoutSegments();
  const isAdmin = segments[0] === "admin";
  const isAuth = segments[0] === "login" || segments[0] === "register";

  if (isAdmin || isAuth) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
