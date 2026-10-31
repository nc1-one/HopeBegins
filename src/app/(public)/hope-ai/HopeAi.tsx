import { noTl, type Lang, type PerLangNoTl } from '@/lib/i18n';
import Link from '@/components/ui/LocalLink';
import { BonfireInlineChat } from '@/components/bonfire/BonfireInlineChat';
import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import { primaryClass } from '@/components/tools/toolStyles';
import { EcoachLink } from '@/components/ui/EcoachLink';

// The person link goes to an e-coach in English and Taglish, and to the
// help page's free lines in French, German, Spanish and Korean.
const copy: PerLangNoTl<{
  title: string;
  subtitle: string;
  notice: string;
  person: string;
  prayer: string;
}> = {
  en: {
    title: 'I need to talk to Hope AI',
    subtitle: 'Any hour, day or night.',
    notice:
      "Hope AI is an AI assistant. It can't counsel you or help in an emergency.",
    person: 'Talk to a real person',
    prayer: 'Or send a prayer request',
  },
  fr: {
    title: 'J’ai besoin de parler à Hope AI',
    subtitle: 'À toute heure, de jour comme de nuit.',
    notice:
      'Hope AI est un assistant IA. Il ne peut pas t’accompagner comme un thérapeute ni t’aider en cas d’urgence.',
    person: 'Parler à une vraie personne',
    prayer: 'Ou envoie une demande de prière',
  },
  de: {
    title: 'Ich möchte mit Hope AI reden',
    subtitle: 'Jederzeit, Tag und Nacht.',
    notice:
      'Hope AI ist ein KI-Assistent. Er ersetzt keine Beratung und hilft nicht im Notfall.',
    person: 'Mit einem echten Menschen reden',
    prayer: 'Oder schick uns ein Gebetsanliegen',
  },
  es: {
    title: 'Necesito hablar con Hope AI',
    subtitle: 'A cualquier hora, de día o de noche.',
    notice:
      'Hope AI es un asistente de IA. No puede darte terapia ni ayudarte en una emergencia.',
    person: 'Hablar con una persona real',
    prayer: 'O envía una petición de oración',
  },
  ko: {
    title: 'Hope AI와 이야기하고 싶어요',
    subtitle: '낮이든 밤이든 언제든지요.',
    notice:
      'Hope AI는 AI 도우미예요. 상담을 대신하거나 응급 상황을 도울 수는 없어요.',
    person: '실제 사람과 이야기하기',
    prayer: '또는 기도 제목 보내기',
  },
};

export function HopeAi({ lang }: { lang: Lang }) {
  const t = noTl(copy, lang);
  return (
    <div className="px-6 pt-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <OptionPageHeader title={t.title} subtitle={t.subtitle} />

          {/* The chat draws its own card, so nothing frames it here. */}
          <div className="mt-8 flex min-h-[560px] flex-col">
            <BonfireInlineChat />
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-sm text-[#6E5F47]">{t.notice}</p>
            <EcoachLink linkName="ecoach_hope_ai" className={primaryClass}>
              {t.person}
            </EcoachLink>
            <p className="text-sm">
              <Link
                href="/prayers"
                className="inline-flex min-h-11 items-center font-medium text-[#6E5F47] underline underline-offset-4 hover:text-[#5c4f3b]"
              >
                {t.prayer}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
