'use client';

import Link from '@/components/ui/LocalLink';
import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import { EcoachLink } from '@/components/ui/EcoachLink';
import { setCountry, useCountry } from '@/lib/country';
import {
  COUNTRY_HELP,
  FIND_A_HELPLINE,
  HELPLINES_CHECKED,
  type HelpLine,
} from '@/lib/helplines';
import { LANG_INFO, type Lang, type PerLang } from '@/lib/i18n';
import { analyticsService } from '@/services/analyticsService';

const copy: PerLang<{
  title: string;
  intro: string;
  country: string;
  pick: string;
  crisisHeading: string;
  listeningHeading: string;
  allDay: string;
  hours: string;
  free: string;
  emergency: (n: string) => string;
  elsewhere: string;
  chat: string;
  moreHeading: string;
  ecoach?: string;
  aiTitle: string;
  aiText: string;
  prayerTitle: string;
  checked: (date: string) => string;
}> = {
  en: {
    title: 'Someone to talk to, free',
    intro:
      "Free lines where a real person listens. If the country isn't yours, pick yours.",
    country: 'Country',
    pick: 'Pick a country',
    crisisHeading: 'If you are in crisis',
    listeningHeading: 'If you need someone to listen',
    allDay: 'Open 24/7',
    hours: 'Hours:',
    free: 'Free',
    emergency: (n) => `In immediate danger, call ${n}.`,
    elsewhere: 'Your country not here? Find a free helpline:',
    chat: 'Chat online',
    moreHeading: 'More ways to talk',
    ecoach: 'Message an e-coach on Messenger',
    aiTitle: 'Talk to Hope AI',
    aiText:
      "An AI assistant you can message any time. It can't counsel you or help in an emergency.",
    prayerTitle: 'Ask someone to pray for you',
    checked: (date) => `Numbers checked on ${date}.`,
  },
  tl: {
    title: 'May makakausap ka, libre',
    intro:
      'Mga libreng linya kung saan may totoong taong nakikinig. Kung hindi ito ang bansa mo, piliin ang sa iyo.',
    country: 'Bansa',
    pick: 'Pumili ng bansa',
    crisisHeading: 'Kung nasa crisis ka',
    listeningHeading: 'Kung kailangan mo ng makikinig',
    allDay: 'Bukas 24/7',
    hours: 'Oras:',
    free: 'Libre',
    emergency: (n) => `Kung nasa panganib ka ngayon, tumawag sa ${n}.`,
    elsewhere: 'Wala rito ang bansa mo? Maghanap ng libreng helpline:',
    chat: 'Mag-chat online',
    moreHeading: 'Iba pang puwedeng kausapin',
    ecoach: 'Mag-message sa isang e-coach sa Messenger',
    aiTitle: 'Kausapin si Hope AI',
    aiText:
      'AI assistant na puwede mong i-message anumang oras. Hindi siya makakapag-counsel o makakatulong sa emergency.',
    prayerTitle: 'Magpaipanalangin',
    checked: (date) => `Huling sinuri ang mga numero noong ${date}.`,
  },
  fr: {
    title: 'Quelqu’un à qui parler, gratuitement',
    intro:
      'Des lignes gratuites où une vraie personne t’écoute. Si ce n’est pas ton pays, choisis le tien.',
    country: 'Pays',
    pick: 'Choisis un pays',
    crisisHeading: 'Si tu es en crise',
    listeningHeading: 'Si tu as besoin qu’on t’écoute',
    allDay: 'Ouvert 24h/24, 7j/7',
    hours: 'Horaires :',
    free: 'Gratuit',
    emergency: (n) => `En cas de danger immédiat, appelle le ${n}.`,
    elsewhere: 'Ton pays n’est pas là ? Trouve une ligne gratuite :',
    chat: 'Discuter en ligne',
    moreHeading: 'D’autres façons de parler',
    aiTitle: 'Parler à Hope AI',
    aiText:
      'Un assistant IA à qui écrire à toute heure. Il ne peut pas t’accompagner comme un thérapeute ni t’aider en cas d’urgence.',
    prayerTitle: 'Demander qu’on prie pour toi',
    checked: (date) => `Numéros vérifiés le ${date}.`,
  },
  de: {
    title: 'Jemand zum Reden, kostenlos',
    intro:
      'Kostenlose Telefone, bei denen ein echter Mensch zuhört. Ist das nicht dein Land, wähl deins aus.',
    country: 'Land',
    pick: 'Land wählen',
    crisisHeading: 'Wenn du in einer Krise bist',
    listeningHeading: 'Wenn du jemanden zum Zuhören brauchst',
    allDay: 'Rund um die Uhr erreichbar',
    hours: 'Erreichbar:',
    free: 'Kostenlos',
    emergency: (n) => `Bei akuter Gefahr ruf die ${n} an.`,
    elsewhere: 'Dein Land fehlt? Hier findest du kostenlose Hilfe:',
    chat: 'Online chatten',
    moreHeading: 'Weitere Wege zum Reden',
    aiTitle: 'Mit Hope AI schreiben',
    aiText:
      'Ein KI-Assistent, dem du jederzeit schreiben kannst. Er ersetzt keine Beratung und hilft nicht im Notfall.',
    prayerTitle: 'Jemanden bitten, für dich zu beten',
    checked: (date) => `Nummern geprüft am ${date}.`,
  },
  es: {
    title: 'Alguien con quien hablar, gratis',
    intro:
      'Líneas gratuitas donde una persona real te escucha. Si este no es tu país, elige el tuyo.',
    country: 'País',
    pick: 'Elige un país',
    crisisHeading: 'Si estás en crisis',
    listeningHeading: 'Si necesitas que alguien te escuche',
    allDay: 'Abierta las 24 horas',
    hours: 'Horario:',
    free: 'Gratis',
    emergency: (n) => `Si estás en peligro inmediato, llama al ${n}.`,
    elsewhere: '¿Tu país no aparece? Encuentra una línea gratuita:',
    chat: 'Chatear en línea',
    moreHeading: 'Otras formas de hablar',
    aiTitle: 'Hablar con Hope AI',
    aiText:
      'Un asistente de IA al que puedes escribir a cualquier hora. No puede darte terapia ni ayudarte en una emergencia.',
    prayerTitle: 'Pedir que oren por ti',
    checked: (date) => `Números revisados el ${date}.`,
  },
  ko: {
    title: '무료로 이야기할 수 있는 곳',
    intro:
      '실제 사람이 들어 주는 무료 상담 전화예요. 내 나라가 아니라면 바꿔 주세요.',
    country: '나라',
    pick: '나라 선택',
    crisisHeading: '위기 상황이라면',
    listeningHeading: '누군가 들어 주길 바란다면',
    allDay: '24시간 운영',
    hours: '운영 시간:',
    free: '무료',
    emergency: (n) => `지금 위험하다면 ${n}에 전화하세요.`,
    elsewhere: '목록에 내 나라가 없나요? 무료 상담 전화 찾기:',
    chat: '온라인 채팅',
    moreHeading: '이야기할 수 있는 다른 방법',
    aiTitle: 'Hope AI와 대화하기',
    aiText:
      '언제든 메시지를 보낼 수 있는 AI 도우미예요. 상담을 대신하거나 응급 상황을 도울 수는 없어요.',
    prayerTitle: '기도를 부탁하기',
    checked: (date) => `${date}에 번호를 확인했어요.`,
  },
};

const h2Class =
  'font-playfair text-2xl md:text-3xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]';
const linkClass =
  'inline-flex min-h-11 items-center font-poppins text-lg font-medium text-[#6E5F47] underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none';

function LineCard({ line, lang }: { line: HelpLine; lang: Lang }) {
  const t = copy[lang];
  const numbers = [line, ...(line.also ?? [])];
  return (
    <li className="py-5">
      <p className="font-poppins text-lg font-semibold text-[#6E5F47]">
        {line.name}
      </p>
      <p className="mt-1 text-sm text-[#6E5F47]/85">
        {[
          line.allDay ? t.allDay : `${t.hours} ${line.hours}`,
          line.free && t.free,
        ]
          .filter(Boolean)
          .join(' · ')}
      </p>
      <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        {numbers.map((number) => (
          <a
            key={number.tel}
            href={`tel:${number.tel}`}
            onClick={() => analyticsService.recordClick('help_call')}
            className="inline-flex min-h-11 items-center whitespace-nowrap text-lg font-bold text-[#6E5F47] underline underline-offset-4"
          >
            {number.number}
            {'label' in number && number.label && (
              <span className="ml-1 text-sm font-normal">({number.label})</span>
            )}
          </a>
        ))}
      </p>
      {line.chat && (
        <a
          href={line.chat}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex min-h-11 items-center text-[#6E5F47] underline underline-offset-4"
        >
          {t.chat}
        </a>
      )}
    </li>
  );
}

/**
 * Free lines in the visitor's country, picked from their phone's time zone
 * and changeable here. On French, German, Spanish and Korean pages, every
 * e-coach link comes here instead.
 */
export function HelpPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const country = useCountry(lang);
  const help = country ? COUNTRY_HELP[country] : undefined;
  const locale = LANG_INFO[lang].locale;
  const names = new Intl.DisplayNames([locale], { type: 'region' });
  const countries = Object.keys(COUNTRY_HELP).sort((a, b) =>
    (names.of(a) ?? a).localeCompare(names.of(b) ?? b, locale)
  );
  const crisis = help?.lines.filter((line) => line.kind === 'crisis') ?? [];
  const listening =
    help?.lines.filter((line) => line.kind === 'listening') ?? [];
  const checked = new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
  }).format(new Date(`${HELPLINES_CHECKED}T00:00:00`));

  return (
    <div lang={LANG_INFO[lang].htmlLang} className="px-6 pt-6 pb-16">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl text-[#6E5F47]">
          <OptionPageHeader title={t.title} subtitle={t.intro} />

          <label className="mt-8 flex flex-col gap-2">
            <span className="font-poppins text-sm font-bold">{t.country}</span>
            <select
              value={country ?? ''}
              onChange={(event) => setCountry(event.target.value)}
              className="min-h-12 w-full max-w-sm rounded-2xl border border-[#DFE7CF] bg-white px-4 font-poppins text-[#6E5F47] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
            >
              {!country && <option value="">{t.pick}</option>}
              {countries.map((code) => (
                <option key={code} value={code}>
                  {names.of(code)}
                </option>
              ))}
            </select>
          </label>

          {crisis.length > 0 && (
            <section
              aria-labelledby="crisis-title"
              className="mt-10 rounded-2xl border border-[#AEC488] bg-[#EFF3E7] p-5"
            >
              <h2 id="crisis-title" className={h2Class}>
                {t.crisisHeading}
              </h2>
              <ul className="mt-2 divide-y divide-[#DFE7CF]">
                {crisis.map((line) => (
                  <LineCard key={line.name} line={line} lang={lang} />
                ))}
              </ul>
              {help && (
                <p className="mt-2 font-bold">{t.emergency(help.emergency)}</p>
              )}
            </section>
          )}

          {listening.length > 0 && (
            <section aria-labelledby="listening-title" className="mt-10">
              <h2 id="listening-title" className={h2Class}>
                {t.listeningHeading}
              </h2>
              <ul className="mt-2 divide-y divide-[#E2DFDA] border-b border-[#E2DFDA]">
                {listening.map((line) => (
                  <LineCard key={line.name} line={line} lang={lang} />
                ))}
              </ul>
            </section>
          )}

          <p className="mt-8 leading-relaxed">
            {t.elsewhere}{' '}
            <a
              href={FIND_A_HELPLINE}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline underline-offset-4"
            >
              findahelpline.com
            </a>
          </p>

          <section
            aria-labelledby="more-title"
            className="mt-12 border-t border-[#E2DFDA] pt-10"
          >
            <h2 id="more-title" className={h2Class}>
              {t.moreHeading}
            </h2>
            <ul className="mt-3">
              {t.ecoach && country === 'PH' && (
                <li>
                  <EcoachLink linkName="ecoach_help" className={linkClass}>
                    {t.ecoach}
                  </EcoachLink>
                </li>
              )}
              <li>
                <Link href="/hope-ai" className={linkClass}>
                  {t.aiTitle}
                </Link>
                <p className="text-sm leading-relaxed">{t.aiText}</p>
              </li>
              <li className="mt-2">
                <Link href="/prayers" className={linkClass}>
                  {t.prayerTitle}
                </Link>
              </li>
            </ul>
          </section>

          <p className="mt-10 text-sm text-[#6E5F47]/85">
            {t.checked(checked)}
          </p>
        </div>
      </div>
    </div>
  );
}
