import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-160px)] w-full max-w-sm content-center gap-5 px-4 py-12">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-black">Üye Ol</h1>
        <p className="text-sm text-neutral-500">Alışveriş deneyimini hızlandır.</p>
      </div>
      <RegisterForm />
    </main>
  );
}
