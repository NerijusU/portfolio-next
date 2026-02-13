import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { defineQuery } from "next-sanity";
import {
  asLocaleBlockContent,
  asLocaleString,
  asLocaleStringArray,
} from "@/sanity/lib/localeProjection";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import type { LocaleSectionProps } from "./types";
import { getTranslations } from "next-intl/server";
import { defaultLocale } from "@/i18n";

const EXPERIENCE_QUERY = defineQuery(
  `*[_type == "experience"] | order(startDate desc){
  company,
  "position": position[$locale],
  employmentType,
  location,
  startDate,
  endDate,
  current,
  "description": description[$locale],
  "responsibilities": responsibilities[$locale],
  "achievements": achievements[$locale],
  technologies[]->{name, category},
  companyLogo,
  companyWebsite
}`
);

const EXPERIENCE_LABELS_QUERY = defineQuery(
  `*[_id == "singleton-siteSettings"][0]{
  "responsibilitiesTitle": experienceSection.responsibilitiesTitle[$locale],
  "achievementsTitle": experienceSection.achievementsTitle[$locale]
}`
);

export async function ExperienceSection({ locale }: LocaleSectionProps) {
  const activeLocale = locale || defaultLocale;
  const t = await getTranslations({
    locale: activeLocale,
    namespace: "Experience",
  });
  const tCommon = await getTranslations({
    locale: activeLocale,
    namespace: "Common",
  });
  const { data: experiences } = await sanityFetch({
    query: EXPERIENCE_QUERY,
    params: { locale: activeLocale },
  });
  const { data: labels } = await sanityFetch({
    query: EXPERIENCE_LABELS_QUERY,
    params: { locale: activeLocale },
  });

  if (!experiences || experiences.length === 0) {
    return null;
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <section id="experience" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp) => {
            const company = typeof exp.company === "string" ? exp.company : "";
            const position = asLocaleString(exp.position);
            const location = typeof exp.location === "string" ? exp.location : "";
            const description = asLocaleBlockContent(exp.description);
            const responsibilities = asLocaleStringArray(exp.responsibilities);
            const achievements = asLocaleStringArray(exp.achievements);
            return (
              <div
                key={`${company}-${position}-${exp.startDate}`}
                className="relative pl-8 pb-8 border-l-2 border-muted last:border-l-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />

                <div className="@container/card bg-card border rounded-lg p-4 @md/card:p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col @md/card:flex-row @md/card:items-start gap-4 mb-4">
                  {exp.companyLogo && (
                    <div className="relative w-12 h-12 @md/card:w-16 @md/card:h-16 rounded-lg overflow-hidden border shrink-0">
                      <Image
                        src={urlFor(exp.companyLogo).width(64).height(64).url()}
                        alt={`${company} company logo`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl @md/card:text-2xl font-semibold line-clamp-2">
                      {position}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <p className="text-base @md/card:text-lg text-primary font-medium truncate">
                        {company}
                      </p>
                      {exp.employmentType && (
                        <>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-xs @md/card:text-sm text-muted-foreground">
                            {exp.employmentType}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-2 text-xs @md/card:text-sm text-muted-foreground">
                      <span>
                        {exp.startDate && formatDate(exp.startDate)} -{" "}
                        {exp.current
                          ? tCommon("present")
                          : exp.endDate
                            ? formatDate(exp.endDate)
                            : tCommon("notAvailable")}
                      </span>
                      {location && (
                        <>
                          <span>•</span>
                          <span className="truncate">{location}</span>
                        </>
                      )}
                      {exp.companyWebsite && (
                        <>
                          <span>•</span>
                          <a
                            href={exp.companyWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="truncate text-primary hover:underline"
                          >
                            {t("websiteLabel")}
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {description && description.length > 0 && (
                  <div className="text-muted-foreground mb-4 text-sm @md/card:text-base">
                    <PortableText value={description} />
                  </div>
                )}

                {responsibilities.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm @md/card:text-base">
                      {asLocaleString(labels?.responsibilitiesTitle) ||
                        "Key Responsibilities:"}
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs @md/card:text-sm">
                      {responsibilities.map((resp, idx) => (
                        <li key={`${company}-resp-${idx}`}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {achievements.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm @md/card:text-base">
                      {asLocaleString(labels?.achievementsTitle) ||
                        "Achievements:"}
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs @md/card:text-sm">
                      {achievements.map((achievement, idx) => (
                        <li key={`${company}-achievement-${idx}`}>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 @md/card:gap-2 mt-4">
                    {exp.technologies.map((tech, techIdx) => {
                      const techData =
                        tech && typeof tech === "object" && "name" in tech
                          ? tech
                          : null;
                      return techData?.name ? (
                        <span
                          key={`${company}-tech-${techIdx}`}
                          className="px-2 py-0.5 @md/card:px-3 @md/card:py-1 text-xs rounded-full bg-primary/10 text-primary"
                        >
                          {techData.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
