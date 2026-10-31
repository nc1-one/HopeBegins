'use client';

import { useState } from 'react';
import Link from '@/components/ui/LocalLink';
import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import { primaryClass, secondaryClass } from '@/components/tools/toolStyles';
import { isIntlLang, noTl, withLocale, type PerLangNoTl } from '@/lib/i18n';
import { localizeHref } from '@/lib/intlRoutes';
import { useChosenLanguage } from '@/lib/languagePreference';

const SITE = 'https://hopebegins.today';

const copy: PerLangNoTl<{
  /** What the share sheet sends with the link. */
  shareText: string;
  title: string;
  subtitle: string;
  receipt: string;
  know: string;
  share: string;
  home: string;
  copied: (url: string) => string;
  needSupport: string;
}> = {
  en: {
    shareText:
      'Free support when you are not okay: a personal plan, calming tools and e-coaches.',
    title: 'Thank you for your gift',
    subtitle: 'It helps keep HopeBegins free for the next person who needs it.',
    receipt: 'Donorbox has emailed you a receipt.',
    know: 'Know someone who is struggling? Share HopeBegins with them.',
    share: 'Share HopeBegins',
    home: 'Go to the homepage',
    copied: (url) => `Link copied: ${url}`,
    needSupport: 'Need support yourself? Start here',
  },
  fr: {
    shareText:
      'Un soutien gratuit quand ça ne va pas : un plan personnel, des outils pour retrouver le calme et la prière.',
    title: 'Merci pour ton don',
    subtitle:
      'Il aide HopeBegins à rester gratuit pour la prochaine personne qui en a besoin.',
    receipt:
      'Donorbox t’a envoyé un reçu par e-mail. Le montant y est en pesos philippins (₱).',
    know: 'Tu connais quelqu’un qui traverse une période difficile ? Partage HopeBegins avec cette personne.',
    share: 'Partager HopeBegins',
    home: 'Aller à l’accueil',
    copied: (url) => `Lien copié : ${url}`,
    needSupport: 'Besoin de soutien toi aussi ? Commence ici',
  },
  de: {
    shareText:
      'Kostenlose Hilfe, wenn es dir nicht gut geht: ein persönlicher Plan, Übungen zum Ruhigwerden und Gebet.',
    title: 'Danke für deine Spende',
    subtitle:
      'Damit bleibt HopeBegins kostenlos für den nächsten Menschen, der es braucht.',
    receipt:
      'Donorbox hat dir eine Quittung per E-Mail geschickt. Der Betrag steht dort in philippinischen Pesos (₱).',
    know: 'Kennst du jemanden, der es gerade schwer hat? Teil HopeBegins mit dieser Person.',
    share: 'HopeBegins teilen',
    home: 'Zur Startseite',
    copied: (url) => `Link kopiert: ${url}`,
    needSupport: 'Brauchst du selbst Unterstützung? Fang hier an',
  },
  es: {
    shareText:
      'Apoyo gratuito cuando no estás bien: un plan personal, herramientas para calmarte y oración.',
    title: 'Gracias por tu donación',
    subtitle:
      'Ayuda a que HopeBegins siga siendo gratis para la próxima persona que lo necesite.',
    receipt:
      'Donorbox te envió un recibo por correo. El monto aparece en pesos filipinos (₱).',
    know: '¿Conoces a alguien que la esté pasando mal? Comparte HopeBegins con esa persona.',
    share: 'Compartir HopeBegins',
    home: 'Ir al inicio',
    copied: (url) => `Enlace copiado: ${url}`,
    needSupport: '¿Necesitas apoyo tú también? Empieza aquí',
  },
  ko: {
    shareText:
      '괜찮지 않을 때 받을 수 있는 무료 도움: 나만의 계획, 마음을 가라앉히는 도구, 그리고 기도.',
    title: '후원해 주셔서 감사해요',
    subtitle:
      '다음에 도움이 필요한 사람에게도 HopeBegins가 무료일 수 있게 해 줘요.',
    receipt:
      'Donorbox에서 영수증을 이메일로 보냈어요. 금액은 필리핀 페소(₱)로 적혀 있어요.',
    know: '힘든 시간을 보내는 사람을 알고 있나요? 그 사람에게 HopeBegins를 알려 주세요.',
    share: 'HopeBegins 공유하기',
    home: '홈으로 가기',
    copied: (url) => `링크를 복사했어요: ${url}`,
    needSupport: '나도 도움이 필요하다면? 여기서 시작하세요',
  },
};

export default function DonationSuccessPage() {
  // Donorbox brings every giver back to this one address, so it thanks them
  // in the language they picked with the globe, or their phone's.
  const lang = useChosenLanguage();
  const t = noTl(copy, lang);
  const intl = isIntlLang(lang);
  // Links and the shared address follow, so words and pages agree.
  const local = (href: string) => localizeHref(href, lang);
  const url = intl ? `${SITE}${withLocale(lang, '/')}` : SITE;
  const [copied, setCopied] = useState(false);

  const share = async () => {
    if (navigator.share) {
      await navigator
        .share({ title: 'HopeBegins', text: t.shareText, url })
        .catch(() => {});
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Clipboard blocked: the link is shown on the page to copy by hand.
      setCopied(true);
    }
  };

  return (
    <div className="px-6 pt-6 pb-24" lang={intl ? lang : undefined}>
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <OptionPageHeader title={t.title} subtitle={t.subtitle} />

          <div className="mt-8 space-y-6 text-[#6E5F47]">
            <p>{t.receipt}</p>
            <div className="border-t border-[#E2DFDA] pt-6">
              <p>{t.know}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button type="button" onClick={share} className={primaryClass}>
                  {t.share}
                </button>
                <Link href={local('/')} className={secondaryClass}>
                  {t.home}
                </Link>
              </div>
              {copied && (
                <p className="mt-3 text-sm" role="status">
                  {t.copied(url)}
                </p>
              )}
            </div>
          </div>

          <Link
            href={local('/#start')}
            className="mt-8 inline-flex min-h-11 items-center font-poppins font-medium text-[#6E5F47] underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
          >
            {t.needSupport}
          </Link>
        </div>
      </div>
    </div>
  );
}
