/**
 * What Google reads about HopeBegins beyond the words on the page: who runs
 * the site, what it is called, and what each page is. Only true facts go
 * here; a "reviewedBy" or "lastReviewed" is added to a page only once the
 * review has really happened.
 */

const SITE = 'https://hopebegins.today';
const ORG_ID = `${SITE}/#organization`;
const SITE_ID = `${SITE}/#website`;

const DESCRIPTION =
  'Free, faith-driven support for Filipinos who feel anxious, low or alone: a personal plan, calming tools, someone to pray for you, and e-coaches on Messenger, in English or Taglish.';

export const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'HopeBegins',
      url: SITE,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE}/icons/icon-512.png`,
        width: 512,
        height: 512,
      },
      description: DESCRIPTION,
      email: 'connect@hopebegins.today',
      areaServed: { '@type': 'Country', name: 'Philippines' },
      knowsLanguage: ['en', 'tl'],
      sameAs: [
        'https://www.facebook.com/hopebeginstoday',
        'https://www.instagram.com/hopebeginstoday',
        'https://www.linkedin.com/company/hopebeginstoday/',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': SITE_ID,
      name: 'HopeBegins',
      // How people may type the name, so Google ties them to this site.
      alternateName: ['Hope Begins', 'hopebegins.today'],
      url: SITE,
      description: DESCRIPTION,
      inLanguage: ['en-PH', 'tl-PH'],
      publisher: { '@id': ORG_ID },
    },
  ],
};

/** One page of the site, with the trail back to the home page. */
export function webPageJsonLd({
  path,
  name,
  description,
  lang,
  image,
  crumb,
  faq,
}: {
  path: string;
  name: string;
  description: string;
  lang: 'en' | 'tl';
  image?: string;
  /** The page's short name in the trail: Home › crumb. */
  crumb: string;
  /** Questions the page answers in full, word for word. */
  faq?: { q: string; a: string }[];
}) {
  const url = `${SITE}${path}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: lang === 'tl' ? 'tl-PH' : 'en-PH',
        isPartOf: { '@id': SITE_ID },
        ...(image && {
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: `${SITE}${image}`,
            width: 1200,
            height: 630,
          },
        }),
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'HopeBegins', item: SITE },
          { '@type': 'ListItem', position: 2, name: crumb, item: url },
        ],
      },
      ...(faq?.length
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${url}#faq`,
              mainEntity: faq.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            },
          ]
        : []),
    ],
  };
}

const BLOG_ID = `${SITE}/hope-unfiltered#blog`;

const faqPage = (url: string, faq: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  '@id': `${url}#faq`,
  mainEntity: faq.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
});

/** The Hope Unfiltered blog and the stories it lists. */
export function blogJsonLd({
  path,
  name,
  description,
  image,
  posts,
}: {
  path: string;
  name: string;
  description: string;
  image: string;
  posts: { path: string; title: string }[];
}) {
  const url = `${SITE}${path}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': BLOG_ID,
        url,
        name,
        description,
        inLanguage: ['en-PH', 'tl-PH'],
        isPartOf: { '@id': SITE_ID },
        publisher: { '@id': ORG_ID },
        image: { '@type': 'ImageObject', url: `${SITE}${image}` },
        blogPost: posts.map((post) => ({
          '@type': 'BlogPosting',
          '@id': `${SITE}${post.path}#article`,
          url: `${SITE}${post.path}`,
          headline: post.title,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'HopeBegins', item: SITE },
          { '@type': 'ListItem', position: 2, name, item: url },
        ],
      },
    ],
  };
}

/** One Hope Unfiltered story, its place in the blog, and its questions. */
export function storyJsonLd({
  path,
  blogPath,
  blogName,
  headline,
  description,
  lang,
  image,
  published,
  keywords,
  section,
  wordCount,
  faq,
}: {
  path: string;
  blogPath: string;
  blogName: string;
  headline: string;
  description: string;
  lang: 'en' | 'tl';
  image: string;
  /** yyyy-MM-dd */
  published: string;
  keywords: string[];
  section: string;
  wordCount: number;
  faq: { q: string; a: string }[];
}) {
  const url = `${SITE}${path}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        url,
        mainEntityOfPage: url,
        headline,
        description,
        inLanguage: lang === 'tl' ? 'tl-PH' : 'en-PH',
        image: {
          '@type': 'ImageObject',
          url: `${SITE}${image}`,
          width: 1200,
          height: 630,
        },
        datePublished: published,
        dateModified: published,
        author: { '@id': ORG_ID },
        publisher: { '@id': ORG_ID },
        isPartOf: { '@id': BLOG_ID },
        articleSection: section,
        keywords: keywords.join(', '),
        wordCount,
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'HopeBegins', item: SITE },
          {
            '@type': 'ListItem',
            position: 2,
            name: blogName,
            item: `${SITE}${blogPath}`,
          },
          { '@type': 'ListItem', position: 3, name: headline, item: url },
        ],
      },
      ...(faq.length ? [faqPage(url, faq)] : []),
    ],
  };
}

/** Writes structured data into the page, safely escaped. */
export const jsonLdHtml = (data: object) => ({
  __html: JSON.stringify(data).replace(/</g, '\\u003c'),
});
