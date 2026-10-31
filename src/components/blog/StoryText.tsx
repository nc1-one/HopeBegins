import Link from '@/components/ui/LocalLink';
import { linkParts } from '@/lib/blog';

const linkClass =
  'font-medium underline decoration-[#AEC488] decoration-2 underline-offset-4 hover:text-[#5c4f3b] hover:decoration-[#6E5F47]';

/** A paragraph from a story, with its [words](/path) links made real. */
export function StoryText({ text }: { text: string }) {
  return (
    <>
      {linkParts(text).map((part, index) =>
        'href' in part ? (
          <Link key={index} href={part.href} className={linkClass}>
            {part.text}
          </Link>
        ) : (
          part.text
        )
      )}
    </>
  );
}
