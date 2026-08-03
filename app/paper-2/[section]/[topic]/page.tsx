import { notFound } from "next/navigation";
import { getTopic, getAllTopicParams } from "@/data/topics";
import { TopicPage } from "@/components/TopicPage";

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
  };
}

export default async function Paper2TopicPage({ params }: PageProps) {
  const { section, topic: topicSlug } = await params;
  const topic = getTopic(2, section, topicSlug);
  if (!topic) notFound();

  return <TopicPage topic={topic} />;
}
