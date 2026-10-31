import { PageJsonLd } from '@/components/layout/PageJsonLd';
import { twinMetadata } from '@/lib/pageMetadata';
import { TAGLISH_TWINS } from '@/lib/taglishTwins';
import { Toolbox } from '../tools/Toolbox';

// The Tools page in Taglish. Its search lines are in taglishTwins.ts.
const TWIN = TAGLISH_TWINS.tools;
// The page's own heading, shown in the tab until the search lines are in.
const HEADING = {
  title: 'Mga tool para sa mabibigat na sandali',
  description: 'Ilang tap at ilang minuto lang ang karamihan. Hindi umaalis sa phone mo ang anumang pipiliin mo.',
};

export const metadata = twinMetadata(TWIN, HEADING);

export default function MgaToolPage() {
  return (
    <>
      <PageJsonLd
        path={TWIN.tl}
        name={TWIN.title ?? HEADING.title}
        description={TWIN.description ?? HEADING.description}
        lang="tl"
        crumb="Mga tool"
      />
      <Toolbox lang="tl" />
    </>
  );
}
