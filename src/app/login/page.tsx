import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-160px)] w-full max-w-sm content-center gap-5 px-4 py-12">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-black">Giriş Yap</h1>
        <p className="text-sm text-neutral-500">Müşteri hesabına veya admin paneline doğru rolle giriş yap.</p>
      </div>
      <Suspense fallback={<div className="h-48 animate-pulse rounded-lg bg-neutral-100" />}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
