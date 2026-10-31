'use client';

import { useCountry } from '@/lib/country';
import { COUNTRY_HELP, crisisLineIn, FIND_A_HELPLINE } from '@/lib/helplines';
import type { Lang, PerLang } from '@/lib/i18n';
import { analyticsService } from '@/services/analyticsService';

/*
 * The crisis line for the country the visitor's phone is in, in the page's
 * language. Wording follows WHO safe-messaging guidance: direct, calm, a
 * number to call, never a method.
 */

const copy: PerLang<{
  lead: string;
  allDay: string;
  or: string;
  danger: (emergency: string) => string;
  call: (number: string) => string;
  nowhere: string;
  nowhereDanger: string;
}> = {
  en: {
    lead: 'In crisis or thinking of ending your life?',
    allDay: '24/7',
    or: 'or',
    danger: (n) => `If you are in immediate danger, call ${n}.`,
    call: (n) => `Call ${n}`,
    nowhere: 'Find a free crisis line where you are:',
    nowhereDanger:
      'If you are in immediate danger, call your local emergency number.',
  },
  tl: {
    lead: 'Nasa crisis ka ba o naiisip mong tapusin ang buhay mo?',
    allDay: '24/7',
    or: 'o',
    danger: (n) => `Kung nasa panganib ka ngayon, tumawag sa ${n}.`,
    call: (n) => `Tumawag sa ${n}`,
    nowhere: 'Maghanap ng libreng crisis hotline kung nasaan ka:',
    nowhereDanger:
      'Kung nasa panganib ka ngayon, tumawag sa emergency number ng lugar mo.',
  },
  fr: {
    lead: 'Tu es en crise ou tu penses à mettre fin à ta vie ?',
    allDay: '24h/24',
    or: 'ou',
    danger: (n) => `En cas de danger immédiat, appelle le ${n}.`,
    call: (n) => `Appeler le ${n}`,
    nowhere: 'Trouve une ligne d’écoute gratuite là où tu es :',
    nowhereDanger:
      'En cas de danger immédiat, appelle le numéro d’urgence de ton pays.',
  },
  de: {
    lead: 'Bist du in einer Krise oder denkst du daran, dir das Leben zu nehmen?',
    allDay: 'rund um die Uhr',
    or: 'oder',
    danger: (n) => `Bei akuter Gefahr ruf die ${n} an.`,
    call: (n) => `${n} anrufen`,
    nowhere: 'Finde ein kostenloses Krisentelefon in deinem Land:',
    nowhereDanger: 'Bei akuter Gefahr ruf den Notruf deines Landes an.',
  },
  es: {
    lead: '¿Estás en crisis o piensas en quitarte la vida?',
    allDay: 'las 24 horas',
    or: 'o',
    danger: (n) => `Si estás en peligro inmediato, llama al ${n}.`,
    call: (n) => `Llamar al ${n}`,
    nowhere: 'Encuentra una línea de ayuda gratuita donde estés:',
    nowhereDanger:
      'Si estás en peligro inmediato, llama al número de emergencias de tu país.',
  },
  ko: {
    lead: '위기 상황이거나 죽고 싶다는 생각이 드나요?',
    allDay: '24시간',
    or: '또는',
    danger: (n) => `지금 위험하다면 ${n}에 전화하세요.`,
    call: (n) => `${n}에 전화하기`,
    nowhere: '지금 있는 곳의 무료 위기 상담 전화를 찾아보세요:',
    nowhereDanger: '지금 위험하다면 그 나라의 긴급 전화번호로 연락하세요.',
  },
};

/** The visitor's country, its help and its crisis line, if the site has them. */
export function useCrisisLine(lang: Lang) {
  const country = useCountry(lang);
  return {
    country,
    help: country ? COUNTRY_HELP[country] : undefined,
    line: crisisLineIn(country),
  };
}

const linkClass = 'font-bold underline underline-offset-4 whitespace-nowrap';

/**
 * "Name (24/7): number or number. If you are in immediate danger, call
 * 911." With `lead`, it opens with "In crisis or thinking of ending your
 * life?".
 */
export function CrisisSentence({
  lang,
  lead = false,
  danger = true,
  className,
  linkClassName = linkClass,
}: {
  lang: Lang;
  lead?: boolean;
  /** The "if you are in immediate danger" sentence. */
  danger?: boolean;
  className?: string;
  linkClassName?: string;
}) {
  const t = copy[lang];
  const { help, line } = useCrisisLine(lang);
  const record = () => analyticsService.recordClick('crisis_call');

  return (
    <span lang={lang} className={className}>
      {lead && <span className="font-bold">{t.lead}</span>}{' '}
      {line && help ? (
        <>
          {line.name}
          {line.allDay && ` (${t.allDay})`}:{' '}
          <a
            href={`tel:${line.tel}`}
            onClick={record}
            className={linkClassName}
          >
            {line.number}
          </a>
          {line.also?.[0] && (
            <>
              {' '}
              {t.or}{' '}
              <a
                href={`tel:${line.also[0].tel}`}
                onClick={record}
                className={linkClassName}
              >
                {line.also[0].number}
              </a>
            </>
          )}
          .{danger && ` ${t.danger(help.emergency)}`}
        </>
      ) : (
        <>
          {t.nowhere}{' '}
          <a
            href={FIND_A_HELPLINE}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            findahelpline.com
          </a>
          .{danger && ` ${t.nowhereDanger}`}
        </>
      )}
    </span>
  );
}

/** Every crisis line for the visitor's country, one per line, then 911. */
export function CrisisList({
  lang,
  className,
}: {
  lang: Lang;
  className?: string;
}) {
  const t = copy[lang];
  const { help } = useCrisisLine(lang);
  if (!help) return <CrisisSentence lang={lang} className={className} />;
  return (
    <span lang={lang} className={className}>
      {help.lines
        .filter((line) => line.kind === 'crisis')
        .map((line) => (
          <span key={line.name} className="block">
            {line.name}
            {line.allDay && ` (${t.allDay})`}:{' '}
            {[line, ...(line.also ?? []).slice(0, 1)].map((number, index) => (
              <span key={number.tel}>
                {index > 0 && ` ${t.or} `}
                <a
                  href={`tel:${number.tel}`}
                  onClick={() => analyticsService.recordClick('crisis_call')}
                  className={linkClass}
                >
                  {number.number}
                </a>
              </span>
            ))}
          </span>
        ))}
      <span className="block">{t.danger(help.emergency)}</span>
    </span>
  );
}

/**
 * The crisis line as plain text, "NCMH Crisis Hotline (24/7): 1553 or 0917
 * 899 8727", for the Hope Card image.
 */
export function useCrisisText(lang: Lang) {
  const t = copy[lang];
  const { line } = useCrisisLine(lang);
  if (!line) return `${t.nowhere} findahelpline.com`;
  const numbers = [line.number, line.also?.[0]?.number]
    .filter(Boolean)
    .join(` ${t.or} `);
  return `${line.name}${line.allDay ? ` (${t.allDay})` : ''}: ${numbers}`;
}

/** A "Call 1553" button for the visitor's crisis line. */
export function CallCrisisButton({
  lang,
  className,
}: {
  lang: Lang;
  className?: string;
}) {
  const t = copy[lang];
  const { line } = useCrisisLine(lang);
  if (!line) {
    return (
      <a
        href={FIND_A_HELPLINE}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        findahelpline.com
      </a>
    );
  }
  return (
    <a
      href={`tel:${line.tel}`}
      onClick={() => analyticsService.recordClick('crisis_call')}
      className={className}
    >
      {t.call(line.number)}
    </a>
  );
}
