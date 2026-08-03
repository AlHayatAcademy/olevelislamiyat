import { notFound } from "next/navigation";
import { paper1Sections } from "@/data/syllabus";
import { getTopicsForSection } from "@/data/topics";
import { SectionHub } from "@/components/SectionHub";

interface PageProps {
  params: Promise<{ section: string }>;
}

export function generateStaticParams() {
  return paper1Sections.map((s) => ({ section: s.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { section: sectionSlug } = await params;
  const section = paper1Sections.find((s) => s.slug === sectionSlug);
  if (!section) return {};
  return {
    title: `Paper 1: ${section.title}`,
    description: section.description,
  };
}

export default async function Paper1SectionPage({ params }: PageProps) {
  const { section: sectionSlug } = await params;
  const section = paper1Sections.find((s) => s.slug === sectionSlug);
  if (!section) notFound();

  const topics = getTopicsForSection(1, sectionSlug);

  return <SectionHub paper={1} section={section} topics={topics} />;
}
