import { notFound } from "next/navigation";
import { paper2Sections } from "@/data/syllabus";
import { getTopicsForSection } from "@/data/topics";
import { SectionHub } from "@/components/SectionHub";
import { canonical } from "@/lib/seo";

interface PageProps {
  params: Promise<{ section: string }>;
}

export function generateStaticParams() {
  return paper2Sections.map((s) => ({ section: s.slug }));
}

// The full set of valid sections is always known at build time - reject anything else with a
// real 404 instead of an on-demand-rendered "soft 404" (200 status).
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps) {
  const { section: sectionSlug } = await params;
  const section = paper2Sections.find((s) => s.slug === sectionSlug);
  if (!section) return {};
  return {
    title: `Paper 2: ${section.title}`,
    description: section.description,
    ...canonical(`/paper-2/${section.slug}`),
  };
}

export default async function Paper2SectionPage({ params }: PageProps) {
  const { section: sectionSlug } = await params;
  const section = paper2Sections.find((s) => s.slug === sectionSlug);
  if (!section) notFound();

  const topics = getTopicsForSection(2, sectionSlug);

  return <SectionHub paper={2} section={section} topics={topics} />;
}
