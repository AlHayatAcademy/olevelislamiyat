import { notFound } from "next/navigation";
import { getTopic, getAllTopicParams } from "@/data/topics";
import { TopicPage } from "@/components/TopicPage";

interface PageProps {
  params: Promise<{ section: string; topic: string }>;
}

export function generateStaticParams() {
  return getAllTopicParams(1);
}

export async function generateMetadata({ params }: PageProps) {
  const { section, topic: topicSlug } = await params;
  const topic = getTopic(1, section, topicSlug);
  if (!topic) return {};
  return {
    title: topic.title,
    description: topic.standing,
  };
}

export default async function Paper1TopicPage({ params }: PageProps) {
  const { section, topic: topicSlug } = await params;
  const topic = getTopic(1, section, topicSlug);
  if (!topic) notFound();

  return <TopicPage topic={topic} />;
}
