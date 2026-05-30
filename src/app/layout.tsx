import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { CartProvider } from "@/components/cart/CartProvider";
import { FavoritesProvider } from "@/components/favorites/FavoritesProvider";
import { SiteShell } from "@/components/layout/SiteShell";
import { OrderProvider } from "@/components/orders/OrderProvider";

export const metadata: Metadata = {
  title: "bazar.commerce",
  description: "Modern e-ticaret mağazası",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <FavoritesProvider>
            <CartProvider>
              <OrderProvider>
                <SiteShell>{children}</SiteShell>
              </OrderProvider>
            </CartProvider>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
