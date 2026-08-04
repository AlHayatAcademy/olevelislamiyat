import { notFound } from "next/navigation";
import { getTopic, getAllTopicParams } from "@/data/topics";
import { TopicPage } from "@/components/TopicPage";
import { canonical } from "@/lib/seo";
import { siteConfig } from "@/data/site-config";

interface PageProps {
  params: Promise<{ section: string; topic: string }>;
}

export function generateStaticParams() {
  return getAllTopicParams(2);
}

export async function generateMetadata({ params }: PageProps) {
  const { section, topic: topicSlug } = await params;
  const topic = getTopic(2, section, topicSlug);
  if (!topic) return {};
  return {
    title: topic.title,
    description: topic.standing,
    ...canonical(`/paper-2/${section}/${topicSlug}`),
  };
}

export default async function Paper2TopicPage({ params }: PageProps) {
  const { section, topic: topicSlug } = await params;
  const topic = getTopic(2, section, topicSlug);
  if (!topic) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: topic.title,
    description: topic.standing,
    url: `${siteConfig.domain}/paper-2/${section}/${topicSlug}`,
    author: { "@type": "Organization", name: siteConfig.institution.name },
    publisher: { "@type": "Organization", name: siteConfig.institution.name },
    about: "Cambridge O Level Islamiyat 2058 / IGCSE Islamiyat 0493",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <TopicPage topic={topic} />
    </>
  );
}
