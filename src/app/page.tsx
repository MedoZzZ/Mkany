import { Hero } from "@/components/ui/hero";
import { FeaturesSection } from "@/components/ui/features";
import { Footer } from "@/components/ui/footer";

export default function AppCenter() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Top Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <FeaturesSection />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
