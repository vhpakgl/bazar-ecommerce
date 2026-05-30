export type Order = {
  id: string;
  date: string;
  status: string;
  total: number;
  items: string[];
};

export const orders: Order[] = [
  {
    id: "BC-1024",
    date: "24 Mayıs 2026",
    status: "Hazırlanıyor",
    total: 2247,
    items: ["Oversize Poplin Gömlek", "Minimal Sneaker"],
  },
  {
    id: "BC-1018",
    date: "18 Mayıs 2026",
    status: "Teslim edildi",
    total: 1148,
    items: ["Monochrome Basic Tişört", "Deri Görünümlü Omuz Çantası"],
  },
];
