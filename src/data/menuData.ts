export const menuData = {
  GİYİM: {
    "Kadın Giyim": ["Elbise", "Tişört", "Gömlek", "Pantolon", "Jean", "Etek", "Kazak", "Sweatshirt"],
    "Erkek Giyim": ["Tişört", "Gömlek", "Pantolon", "Jean", "Kazak", "Sweatshirt", "Mont / Ceket"],
  },
  AYAKKABI: {
    "Kadın Ayakkabı": ["Sneaker", "Bot", "Topuklu", "Sandalet", "Terlik"],
    "Erkek Ayakkabı": ["Sneaker", "Bot", "Klasik Ayakkabı", "Sandalet", "Terlik"],
  },
  AKSESUAR: {
    Aksesuar: ["Çanta", "Saat", "Gözlük", "Takı", "Şapka / Bere", "Kemer", "Cüzdan", "Parfüm"],
  },
} as const;

export const menuVisuals = {
  GİYİM: {
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    title: "Yeni Sezon Giyim",
    text: "Zamansız parçalarla sade şıklığı keşfet.",
  },
  AYAKKABI: {
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    title: "Sneaker & Bot Seçkisi",
    text: "Günün ritmine uyum sağlayan net tasarımlar.",
  },
  AKSESUAR: {
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80",
    title: "Minimal Aksesuarlar",
    text: "Küçük dokunuşlarla görünümü tamamla.",
  },
} as const;

export const menuCategorySlugs: Record<string, string> = {
  "Kadın Giyim": "kadin-giyim",
  "Erkek Giyim": "erkek-giyim",
  "Kadın Ayakkabı": "ayakkabi",
  "Erkek Ayakkabı": "ayakkabi",
  Aksesuar: "aksesuar",
};

export type MenuKey = keyof typeof menuData;
