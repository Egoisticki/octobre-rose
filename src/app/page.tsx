import { Activities } from "@/components/activities";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { RegistrationSection } from "@/components/registration-section";
import { StorySection } from "@/components/story-section";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <StorySection />
      <Activities />
      <RegistrationSection />
      <Footer />
    </main>
  );
}
