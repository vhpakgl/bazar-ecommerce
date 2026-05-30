import type { ReactNode } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, Share2 } from "lucide-react";
import { getCategories } from "@/lib/catalog";

const customerLinks = [
  { label: "Sipariş Takibi", href: "/account/orders" },
  { label: "Kolay İade", href: "/account/orders" },
  { label: "Yardım Merkezi", href: "/account" },
  { label: "Teslimat Bilgileri", href: "/checkout" },
];

const accountLinks = [
  { label: "Giriş Yap", href: "/login" },
  { label: "Üye Ol", href: "/register" },
  { label: "Favorilerim", href: "/favorites" },
  { label: "Adreslerim", href: "/account/addresses" },
];

export function Footer() {
  const categories = getCategories();

  return (
    <footer className="border-t border-neutral-100 bg-white text-black">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.25fr_3fr] md:px-6 md:py-16">
        <section className="grid content-start gap-5">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            bazar.commerce
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-neutral-500">
            Günlük stile sade, güçlü ve zamansız parçalar ekleyen seçili e-ticaret deneyimi.
          </p>
          <div className="grid gap-3 text-sm text-neutral-500">
            <a href="mailto:destek@bazar.commerce" className="inline-flex items-center gap-3 hover:text-black">
              <Mail size={15} strokeWidth={1.6} />
              destek@bazar.commerce
            </a>
            <a href="tel:+902120000000" className="inline-flex items-center gap-3 hover:text-black">
              <Phone size={15} strokeWidth={1.6} />
              +90 212 000 00 00
            </a>
            <span className="inline-flex items-center gap-3">
              <MapPin size={15} strokeWidth={1.6} />
              İstanbul, Türkiye
            </span>
          </div>
        </section>

        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn title="Kategoriler">
            {categories.map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`}>
                {category.name}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Müşteri Hizmetleri">
            {customerLinks.map((item) => (
              <Link key={`${item.href}-${item.label}`} href={item.href}>
                {item.label}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Hesabım">
            {accountLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Bizi Takip Et">
            <a href="#" className="inline-flex items-center gap-2">
              <Share2 size={15} strokeWidth={1.6} />
              Instagram
            </a>
            <p className="text-sm leading-relaxed text-neutral-500">
              Yeni koleksiyonlar ve kampanyalar için sosyal hesaplarımızı takip edin.
            </p>
          </FooterColumn>
        </section>
      </div>

      <div className="border-t border-neutral-100">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 text-[11px] text-neutral-400 md:flex-row md:items-center md:justify-between md:px-6">
          <span>© {new Date().getFullYear()} bazar.commerce. Tüm hakları saklıdır.</span>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/account/settings" className="hover:text-black">
              Gizlilik
            </Link>
            <Link href="/account/settings" className="hover:text-black">
              Kullanım Koşulları
            </Link>
            <span>Visa / Mastercard / Troy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

type FooterColumnProps = {
  title: string;
  children: ReactNode;
};

function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div className="grid content-start gap-3">
      <h3 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-black">{title}</h3>
      <div className="grid gap-2 text-sm text-neutral-500 [&_a]:transition-colors [&_a:hover]:text-black">
        {children}
      </div>
    </div>
  );
}
