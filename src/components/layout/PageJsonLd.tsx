import { jsonLdHtml, webPageJsonLd } from '@/lib/structuredData';

/** What a page is and its place under the home page, for search engines. */
export function PageJsonLd(page: Parameters<typeof webPageJsonLd>[0]) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={jsonLdHtml(webPageJsonLd(page))}
    />
  );
}
