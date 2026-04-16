import LandingNavbar from "@/components/landing-navbar";
import LandingHeroSection from "@/components/landing-hero-section";
import LandingDashboardPreviewSection from "@/components/landing-dashboard-preview-section";
import LandingFeaturesSection from "@/components/landing-feature-section";
import LandingHowItWorksSection from "@/components/landing-how-it-works-section";
import LandingStorageSection from "@/components/landing-storage-section";
import LandingPdfExportSection from "@/components/landing-pdf-export-section";
import LandingCallToActionSection from "@/components/landing-call-to-action-section";
import LandingFooterSection from "@/components/landing-footer-section";

// Content overflow and get corrected when i scroll to the bottom.
function LandingPage() {
  return (
    <div
      className={`w-full noise-overlay bg-background text-foreground min-h-screen`}
    >
      <LandingNavbar />
      <main className="overflow-hidden">
        <LandingHeroSection />
        <LandingDashboardPreviewSection />
        <LandingFeaturesSection />
        <LandingHowItWorksSection />
        <LandingStorageSection />
        <LandingPdfExportSection />
        <LandingCallToActionSection />
        <LandingFooterSection />
      </main>
    </div>
  );
}

export default LandingPage;
