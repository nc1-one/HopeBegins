'use client';

import { useRef, useSyncExternalStore } from 'react';
import { FadeImage } from '@/components/ui/FadeImage';
import { usePhoto } from '@/components/ui/PhotoTurn';
import { noTl, type Lang, type PerLangNoTl } from '@/lib/i18n';
import { analyticsService } from '@/services/analyticsService';
import { CarrierForm } from '../../be-carrier/components/CarrierForm';
import { CarrierSteps } from '../../be-carrier/components/CarrierSteps';
import { AllocationBreakdown } from './AllocationBreakdown';
import { DonationForm } from './DonationForm';

type Way = 'gift' | 'time';

const copy: PerLangNoTl<{
  title: string;
  tabs: string;
  ways: Record<Way, { title: string; text: string }>;
  /** What a gift keeps free; on the four new languages, also the currency. */
  everyGift: string;
  signUp: string;
}> = {
  en: {
    title: 'Two ways to give',
    tabs: 'Ways to give',
    ways: {
      gift: {
        title: 'Give a gift',
        text: 'Keep HopeBegins free for the next person.',
      },
      time: {
        title: 'Give your time',
        text: 'Pray for people as a Hope Carrier.',
      },
    },
    everyGift:
      'Every gift, big or small, keeps the plan, the tools, prayer and Daily Hope free for anyone who needs them.',
    signUp: 'Sign up to be a Hope Carrier',
  },
  fr: {
    title: 'Deux façons de donner',
    tabs: 'Façons de donner',
    ways: {
      gift: {
        title: 'Faire un don',
        text: 'Pour que HopeBegins reste gratuit pour la prochaine personne.',
      },
      time: {
        title: 'Donner ton cœur et ton temps',
        text: 'Prie pour les autres comme Hope Carrier.',
      },
    },
    everyGift:
      'Chaque don, petit ou grand, garde gratuits le plan, les outils, la prière et Daily Hope pour toutes les personnes qui en ont besoin. Les dons se font en pesos philippins (₱).',
    signUp: 'Devenir Hope Carrier',
  },
  de: {
    title: 'Zwei Wege, etwas zu geben',
    tabs: 'Wege zu geben',
    ways: {
      gift: {
        title: 'Spenden',
        text: 'Damit HopeBegins für den nächsten Menschen kostenlos bleibt.',
      },
      time: {
        title: 'Dein Herz und deine Zeit schenken',
        text: 'Bete als Hope Carrier für andere.',
      },
    },
    everyGift:
      'Jede Spende, ob groß oder klein, hält den Plan, die Übungen, das Gebet und Daily Hope kostenlos für alle, die sie brauchen. Gespendet wird in philippinischen Pesos (₱).',
    signUp: 'Als Hope Carrier anmelden',
  },
  es: {
    title: 'Dos formas de dar',
    tabs: 'Formas de dar',
    ways: {
      gift: {
        title: 'Hacer una donación',
        text: 'Para que HopeBegins siga siendo gratis para la próxima persona.',
      },
      time: {
        title: 'Dar tu corazón y tu tiempo',
        text: 'Ora por otras personas como Hope Carrier.',
      },
    },
    everyGift:
      'Cada donación, grande o pequeña, mantiene gratis el plan, las herramientas, la oración y Daily Hope para quien lo necesite. Las donaciones son en pesos filipinos (₱).',
    signUp: 'Inscríbete como Hope Carrier',
  },
  ko: {
    title: '나눌 수 있는 두 가지 방법',
    tabs: '나누는 방법',
    ways: {
      gift: {
        title: '후원하기',
        text: '다음 사람에게도 HopeBegins가 무료일 수 있도록.',
      },
      time: {
        title: '마음과 시간 나누기',
        text: 'Hope Carrier가 되어 사람들을 위해 기도해요.',
      },
    },
    everyGift:
      '크든 작든 모든 후원이 계획, 도구, 기도, Daily Hope를 필요한 누구에게나 무료로 지켜 줘요. 후원 금액은 필리핀 페소(₱) 기준이에요.',
    signUp: 'Hope Carrier 신청하기',
  },
};

// Picking a way rewrites the address without a jump, then says so here.
const PICKED = 'hopebegins:give-way';

const subscribeToHash = (onChange: () => void) => {
  window.addEventListener('hashchange', onChange);
  window.addEventListener(PICKED, onChange);
  return () => {
    window.removeEventListener('hashchange', onChange);
    window.removeEventListener(PICKED, onChange);
  };
};

/**
 * The two ways to give, as two photos to pick from: a gift, or your heart
 * and time as a Hope Carrier. /give-hope#time opens straight on the second.
 */
export function GiveWays({ lang }: { lang: Lang }) {
  const t = noTl(copy, lang);
  const hash = useSyncExternalStore(
    subscribeToHash,
    () => window.location.hash,
    () => ''
  );
  // The address decides the tab, so a shared link opens on the same one.
  const active: Way = hash === '#time' ? 'time' : 'gift';
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  // The two photos of people caring for each other, never the same one.
  const giftPhoto = usePhoto('care', 1);
  const timePhoto = usePhoto('care');

  const ways = [
    { id: 'gift' as const, ...t.ways.gift, photo: giftPhoto },
    { id: 'time' as const, ...t.ways.time, photo: timePhoto },
  ];

  const pick = (way: Way) => {
    if (way === active) return;
    // The address follows, so the link can be shared as it is.
    window.history.replaceState(null, '', `#${way}`);
    window.dispatchEvent(new Event(PICKED));
    analyticsService.recordClick(`give_way_${way}`);
  };

  // Arrow keys move between the two, as in any set of tabs.
  const onKey = (event: React.KeyboardEvent) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const next = active === 'gift' ? 1 : 0;
    pick(ways[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <section aria-labelledby="ways-title" className="relative">
      {/* Where #gift and #time land. */}
      <span id="gift" className="absolute -top-24" aria-hidden />
      <span id="time" className="absolute -top-24" aria-hidden />
      <h2
        id="ways-title"
        className="font-playfair text-3xl md:text-5xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]"
      >
        {t.title}
      </h2>

      <div
        role="tablist"
        aria-label={t.tabs}
        onKeyDown={onKey}
        className="mt-8 grid grid-cols-2 gap-4 md:gap-6"
      >
        {ways.map((way, index) => {
          const isActive = way.id === active;
          return (
            <button
              key={way.id}
              ref={(el) => {
                tabs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`way-tab-${way.id}`}
              aria-selected={isActive}
              aria-controls={`way-panel-${way.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => pick(way.id)}
              className="group text-left focus-visible:outline-none"
            >
              <span
                className={`relative block aspect-[4/3] overflow-hidden rounded-xl bg-[#EFF3E7] ring-offset-4 ring-offset-[#FCFDFA] transition-shadow duration-[var(--hb-base)] group-focus-visible:ring-4 group-focus-visible:ring-[#91AFAA]/60 md:aspect-[16/10] ${
                  isActive ? 'ring-2 ring-[#6E5F47]' : ''
                }`}
              >
                <FadeImage
                  src={way.photo.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 500px, 50vw"
                  className="object-cover"
                />
              </span>
              <span className="mt-3 block font-poppins text-base font-semibold leading-snug text-[#6E5F47] md:text-xl">
                {way.title}
              </span>
              <span className="mt-1 block text-sm leading-snug text-[#6E5F47]/85 md:text-base">
                {way.text}
              </span>
            </button>
          );
        })}
      </div>

      {/* Both stay on the page, so an amount or a half-written form is
          still there after a look at the other. */}
      <div
        id="way-panel-gift"
        role="tabpanel"
        aria-labelledby="way-tab-gift"
        hidden={active !== 'gift'}
        className="mt-10 border-t border-[#E2DFDA] pt-10 hb-step-in"
      >
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-14">
          {/* Volunteers on the other tab never load the payment form. */}
          <DonationForm shown={active === 'gift'} lang={lang} />
          <div className="space-y-6">
            <AllocationBreakdown lang={lang} />
            <p className="text-[#6E5F47] leading-relaxed">{t.everyGift}</p>
          </div>
        </div>
      </div>
      <div
        id="way-panel-time"
        role="tabpanel"
        aria-labelledby="way-tab-time"
        hidden={active !== 'time'}
        className="mt-10 border-t border-[#E2DFDA] pt-10 hb-step-in"
      >
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-14">
          <CarrierSteps headingLevel="h3" />
          <div>
            <h3 className="font-playfair text-2xl md:text-3xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
              {t.signUp}
            </h3>
            <div className="mt-6">
              <CarrierForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
