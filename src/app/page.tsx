import { HeroSection } from "@/components/landing/hero-section";
import { LaunchOptionCard } from "@/components/landing/launch-option-card";
import { launchContent } from "@/config/launch-content";

export default function Home() {
  return (
    <>
      <section
        className="launch-options section-shell"
        aria-labelledby="launch-options-title"
      >
        <div className="section-intro">
          <span className="eyebrow">अपना अगला कदम चुनें</span>
          <h2 id="launch-options-title">Start with what matters to you.</h2>
          <p>
            Register your interest in an upcoming batch or discover the new
            book launch.
          </p>
        </div>

        <div className="launch-card-grid">
          {launchContent.homeOptions.map((option) => (
            <LaunchOptionCard key={option.title} {...option} />
          ))}
        </div>
      </section>

      <HeroSection />
    </>
  );
}