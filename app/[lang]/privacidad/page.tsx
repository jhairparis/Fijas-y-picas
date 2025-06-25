import { permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { generateArticleMetadata } from "@/lib/generate-metadata";

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return generateArticleMetadata(dict, lang, "/privacidad", "privacidad");
}

export default async function PrivacidadPage() {
  permanentRedirect("https://jhairparis.com/privacy");
}
