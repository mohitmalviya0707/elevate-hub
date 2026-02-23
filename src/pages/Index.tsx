import Navbar from "@/components/Navbar";
import CircuitBackground from "@/components/CircuitBackground";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CommunitySection from "@/components/CommunitySection";
import RulesSection from "@/components/RulesSection";
import TimelineSection from "@/components/TimelineSection";
import PrizesSection from "@/components/PrizesSection";
import RegistrationForm from "@/components/RegistrationForm";
import FAQSection from "@/components/FAQSection";
import VenueSection from "@/components/VenueSection";
import ContactSection from "@/components/ContactSection";
import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <CircuitBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <CommunitySection />
        <RulesSection />
        <TimelineSection />
        <PrizesSection />
        <RegistrationForm />
        <FAQSection />
        <VenueSection />
        <ContactSection />
      </main>
      <FloatingCTA />
      <Footer />
    </div>
  );
};

export default Index;
