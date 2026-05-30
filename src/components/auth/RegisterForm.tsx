"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    if (!name || !email || password.length < 6) {
      setError("Ad, e-posta ve en az 6 karakter şifre gir.");
      return;
    }

    try {
      await register(name, email, password);
      router.push("/account");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Üyelik oluşturulamadı.");
    }
  }

  return (
    <form className="grid gap-3" onSubmit={onSubmit}>
      <Input name="name" placeholder="Ad soyad" />
      <Input name="email" type="email" placeholder="E-posta" />
      <Input name="password" type="password" placeholder="Şifre" />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Button type="submit" className="rounded-full py-3">
        Üye ol
      </Button>
      <p className="text-center text-sm text-neutral-500">
        Zaten hesabın var mı?{" "}
        <Link href="/login" className="font-medium text-black underline underline-offset-4">
          Giriş yap
        </Link>
      </p>
    </form>
  );
}
