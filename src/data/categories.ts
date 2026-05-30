export type Category = {
  name: string;
  slug: string;
  image: string;
  description: string;
  featured?: boolean;
};

export const categories: Category[] = [
  {
    name: "Kadın Giyim",
    slug: "kadin-giyim",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
    description: "Elbise, gömlek ve günlük parçalar",
    featured: true,
  },
  {
    name: "Erkek Giyim",
    slug: "erkek-giyim",
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=80",
    description: "Net kesimler ve zamansız stiller",
    featured: true,
  },
  {
    name: "Ayakkabı",
    slug: "ayakkabi",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    description: "Sneaker, bot ve günlük modeller",
    featured: true,
  },
  {
    name: "Aksesuar",
    slug: "aksesuar",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80",
    description: "Çanta, saat, gözlük ve tamamlayıcılar",
    featured: true,
  },
];
