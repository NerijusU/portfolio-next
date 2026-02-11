import { AboutSection } from "./sections/AboutSection";
// import { AchievementsSection } from "./sections/AchievementsSection";
// import { BlogSection } from "./sections/BlogSection";
import { CertificationsSection } from "./sections/CertificationsSection";
import { ContactSection } from "./sections/ContactSection";
import { EducationSection } from "./sections/EducationSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import HeroSection from "./sections/HeroSection";
// import { ProjectsSection } from "./sections/ProjectsSection";
// import { ServicesSection } from "./sections/ServicesSection";
import { SkillsSection } from "./sections/SkillsSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import type { Locale } from "@/i18n";

async function PortfolioContent({ locale }: { locale: Locale }) {
  return (
    <>
      <HeroSection locale={locale} />
      <AboutSection locale={locale} />
      <TestimonialsSection locale={locale} />
      <SkillsSection locale={locale} />
      <ExperienceSection locale={locale} />
      <EducationSection locale={locale} />
      {/* <ProjectsSection /> */}
      <CertificationsSection locale={locale} />
      {/* <AchievementsSection /> */}
      {/* <ServicesSection /> */}
      {/* <BlogSection /> */}
      <ContactSection locale={locale} />
    </>
  );
}

export default PortfolioContent;
