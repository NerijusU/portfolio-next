import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { getTranslations } from "next-intl/server";
import type { LocaleSectionProps } from "./types";
import { SkillsChart } from "@/components/SkillsChart";
import { defaultLocale } from "@/i18n";

const SKILLS_QUERY =
  defineQuery(`*[_type == "skill"] | order(category asc, order asc){
  name,
  category,
  proficiency,
  percentage,
  yearsOfExperience,
  color
}`);

export async function SkillsSection({ locale }: LocaleSectionProps) {
  const activeLocale = locale || defaultLocale;
  const t = await getTranslations({ locale: activeLocale, namespace: "Skills" });
  const { data: skills } = await sanityFetch({ query: SKILLS_QUERY });

  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <section id="skills" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <SkillsChart skills={skills} />
      </div>
    </section>
  );
}
