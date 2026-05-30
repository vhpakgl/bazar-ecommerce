"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type UserRole = "admin" | "customer";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const formEmail = String(form.get("email") ?? "").trim();
    const formPassword = String(form.get("password") ?? "");

    if (!formEmail || !formPassword) {
      setError("E-posta ve şifre zorunlu.");
      return;
    }

    try {
      setError("");
      const user = await login(formEmail, formPassword);
      router.push(getRedirectPath(user.role, searchParams.get("next")));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Giriş yapılamadı.");
    }
  }

  return (
    <form className="grid gap-3" onSubmit={onSubmit}>
      <Input name="email" type="email" placeholder="E-posta" value={email} onChange={(event) => setEmail(event.target.value)} />
      <Input name="password" type="password" placeholder="Şifre" value={password} onChange={(event) => setPassword(event.target.value)} />

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <Button type="submit" className="rounded-full py-3">
        Giriş yap
      </Button>

      <div className="grid grid-cols-2 gap-2">
        <DemoButton
          label="Müşteri demo"
          onClick={() => {
            setEmail("musteri@bazar.commerce");
            setPassword("musteri123");
          }}
        />
        <DemoButton
          label="Admin demo"
          onClick={() => {
            setEmail("admin@bazar.commerce");
            setPassword("admin123");
          }}
        />
      </div>

      <p className="text-center text-sm text-neutral-500">
        Hesabın yok mu?{" "}
        <Link href="/register" className="font-medium text-black underline underline-offset-4">
          Üye ol
        </Link>
      </p>
    </form>
  );
}

function DemoButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-600 transition-colors hover:border-black hover:text-black"
    >
      {label}
    </button>
  );
}

function getRedirectPath(role: UserRole, next: string | null) {
  if (next?.startsWith("/admin")) {
    return role === "admin" ? next : "/account";
  }

  if (next?.startsWith("/") && !next.startsWith("//")) {
    return next;
  }

  return role === "admin" ? "/admin" : "/account";
}
