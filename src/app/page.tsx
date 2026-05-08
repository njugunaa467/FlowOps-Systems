import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Process from "@/components/Process";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="w-full bg-background text-text">
      <Navbar />
      <Hero />
      <Services />
      <Work />
      <Process />
      <About />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}