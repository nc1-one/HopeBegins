import { PageJsonLd } from '@/components/layout/PageJsonLd';
import { twinMetadata } from '@/lib/pageMetadata';
import { TAGLISH_TWINS } from '@/lib/taglishTwins';
import ActionPlan from '../action-plan/ActionPlan';

// The Hopeful Beginning Plan in Taglish. Its search lines are in
// taglishTwins.ts.
const TWIN = TAGLISH_TWINS.plan;
// The page's own heading, shown in the tab until the search lines are in.
const HEADING = {
  title: 'Kunin ang libreng Hopeful Beginning Plan mo',
  description:
    'Sagutin ang 9 na mabilis na tanong tungkol sa pinagdadaanan mo. Bibigyan ka namin ng ilang maliliit na hakbang na puwede mong simulan ngayon.',
};

export const metadata = twinMetadata(TWIN, HEADING, {
  url: '/og/hopeful-beginning-plan.jpg',
  alt: HEADING.title,
});

export default function LibrengPlanoPage() {
  return (
    <>
      <PageJsonLd
        path={TWIN.tl}
        name={TWIN.title ?? HEADING.title}
        description={TWIN.description ?? HEADING.description}
        lang="tl"
        image="/og/hopeful-beginning-plan.jpg"
        crumb="Hopeful Beginning Plan"
      />
      <ActionPlan lang="tl" />
    </>
  );
}
