import { AboutSection } from "./sections/AboutSection";
import { EducationSection } from "./sections/EducationSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import HeroSection from "./sections/HeroSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SkillsSection } from "./sections/SkillsSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";

async function PortfolioContent() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <TestimonialsSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      {/* <CertificationsSection /> */}
      {/* <AchievementsSection /> */}
      {/* <ServicesSection /> */}
      {/* <BlogSection /> */}
      {/* <ContactSection /> */}
    </>
  );
}

export default PortfolioContent;
