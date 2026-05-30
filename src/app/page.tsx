import { BestSellers } from "@/components/home/BestSellers";
import { CampaignBanner } from "@/components/home/CampaignBanner";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { CollectionGrid } from "@/components/home/CollectionGrid";
import { Hero } from "@/components/home/Hero";
import { NewArrivals } from "@/components/home/NewArrivals";
import { TrustBar } from "@/components/home/TrustBar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white antialiased">
      <Hero />
      <TrustBar />
      <main className="mx-auto grid w-full max-w-7xl gap-16 px-4 py-14 md:px-6 md:py-20">
        <CategoryShowcase />
        <NewArrivals />
        <CampaignBanner />
        <BestSellers />
        <CollectionGrid />
      </main>
    </div>
  );
}
