import { noTl, type Lang, type PerLangNoTl } from '@/lib/i18n';
import Link from '@/components/ui/LocalLink';
import { CrisisSentence } from '@/components/help/Crisis';

const PRIVACY_EMAIL = 'connect@hopebegins.today';

interface PrivacyCopy {
  title: string;
  updated: string;
  intro: string;
  sections: { title: string; items: string[] }[];
  contact: {
    title: string;
    /** The words before the email address. */
    before: string;
    /** Between the email address and the Code of Conduct link. */
    middle: string;
    link: string;
    after: string;
  };
  emergency: string;
}

/*
 * A promise to the people who use HopeBegins. Every language says what the
 * English says, no more and no less: same data, same rights, same law.
 */
const copy: PerLangNoTl<PrivacyCopy> = {
  en: {
    title: 'Privacy and confidentiality',
    updated: 'Last updated October 15, 2026',
    intro:
      'People share personal and painful things with HopeBegins. This page explains what we collect, who can see it, how we protect it, and the choices you have.',
    sections: [
      {
        title: 'What we collect',
        items: [
          'Prayer requests: your name, email, the message you write, and the category and organization you choose.',
          'Daily Hope emails: your first name, last name and email.',
          'Hope Stories: your name, occupation, photo and story. We publish a story only after we review and approve it.',
          'Hopeful Beginning Plan: your answers, plan, progress and Hope Card are saved only in your browser on your device, so you can come back to them. They are not sent to us, and you can delete them at any time from the plan page. If you download a backup file, it stays with you; we never receive it. If you ask us to email your plan, we receive your email, your first name if you give it, and the plan.',
          'Daily check-in and tools: the weather you pick, what is on your mind, and anything you pick or write in a tool stay only in your browser on your device. We count that a check-in or a tool happened, never what you chose. You can delete your check-ins from the check-in page.',
          'Plan check-in: if you ask us to check on you, we keep your email and first name until we send that one email 7 days later, then delete them.',
          'Hope Carrier applications: the details you give when you apply to volunteer.',
          'Donations: Donorbox processes donations. Your card details go to Donorbox and its payment partners, not to HopeBegins.',
          'Hope AI: chats run on Bonfire (heybonfire.com), a third-party service that processes your messages.',
          'Site usage: our own count of page visits and of taps on links and tools. It has no cookies, no names and nothing you type, and we use no outside analytics.',
        ],
      },
      {
        title: 'How we use it',
        items: [
          'To pray for you, reply to you and send the emails you asked for.',
          'To run and improve HopeBegins.',
          'We do not sell your personal information.',
        ],
      },
      {
        title: 'Who can see it',
        items: [
          'Hope Carriers see the message and category of a prayer request. They see your first name only if you choose to share it. We do not show them your email.',
          'HopeBegins staff who run the service, only as needed for their work.',
          'The third-party services named above, only for the service they provide.',
        ],
      },
      {
        title: 'How we keep it confidential',
        items: [
          'Every Hope Carrier agrees to our Code of Conduct, which requires them to keep what you share confidential and never share stories without permission.',
          'Data between your device and HopeBegins is encrypted in transit (HTTPS).',
          'Access to personal information is limited to people who need it to serve you.',
        ],
      },
      {
        title: 'Your rights',
        items: [
          'Under the Philippine Data Privacy Act of 2012 (Republic Act No. 10173), you can ask to see, correct or delete your personal information, and you can withdraw your consent.',
          'You can unsubscribe from our emails at any time using the link in each email.',
          'If you believe your rights have been violated, you can file a complaint with the National Privacy Commission (privacy.gov.ph).',
        ],
      },
    ],
    contact: {
      title: 'Contact us',
      before: 'To make a request about your information, email ',
      middle: '. Read the Hope Carrier ',
      link: 'Code of Conduct',
      after: '.',
    },
    emergency: 'HopeBegins is not an emergency service',
  },
  fr: {
    title: 'Vie privée et confidentialité',
    updated: 'Dernière mise à jour : 15 octobre 2026',
    intro:
      'Les gens confient à HopeBegins des choses personnelles et douloureuses. Cette page explique ce que nous collectons, qui peut le voir, comment nous le protégeons et ce que tu peux choisir.',
    sections: [
      {
        title: 'Ce que nous collectons',
        items: [
          'Demandes de prière : ton nom, ton adresse e-mail, le message que tu écris, ainsi que la catégorie et l’organisation que tu choisis.',
          'E-mails Daily Hope : ton prénom, ton nom et ton adresse e-mail.',
          'Histoires d’espoir : ton nom, ton métier, ta photo et ton histoire. Nous publions une histoire seulement après l’avoir relue et approuvée.',
          'Plan personnel : tes réponses, ton plan, ta progression et ta carte d’espoir sont enregistrés uniquement dans le navigateur de ton appareil, pour que tu puisses y revenir. Ils ne nous sont pas envoyés, et tu peux les supprimer à tout moment depuis la page du plan. Si tu télécharges un fichier de sauvegarde, il reste chez toi ; nous ne le recevons jamais. Si tu nous demandes de t’envoyer ton plan par e-mail, nous recevons ton adresse e-mail, ton prénom si tu le donnes, et le plan.',
          'Bilan du jour et outils : la météo que tu choisis, ce que tu as en tête et tout ce que tu choisis ou écris dans un outil restent uniquement dans le navigateur de ton appareil. Nous comptons les bilans faits et les outils utilisés, jamais ce que tu as choisi. Tu peux supprimer tes bilans depuis la page du bilan du jour.',
          'Suivi du plan : si tu nous demandes de prendre de tes nouvelles, nous gardons ton adresse e-mail et ton prénom jusqu’à l’envoi de cet unique e-mail, 7 jours plus tard, puis nous les supprimons.',
          'Candidatures Hope Carrier : les informations que tu donnes quand tu postules pour devenir bénévole.',
          'Dons : Donorbox traite les dons. Les données de ta carte vont à Donorbox et à ses partenaires de paiement. HopeBegins ne les reçoit pas.',
          'Hope AI : les conversations passent par Bonfire (heybonfire.com), un service tiers qui traite tes messages.',
          'Utilisation du site : notre propre comptage des visites de pages et des clics sur les liens et les outils. Il n’utilise aucun cookie, ne contient aucun nom ni rien de ce que tu écris, et nous n’utilisons aucun outil d’analyse externe.',
        ],
      },
      {
        title: 'Ce que nous en faisons',
        items: [
          'Prier pour toi, te répondre et t’envoyer les e-mails que tu as demandés.',
          'Faire fonctionner et améliorer HopeBegins.',
          'Nous ne vendons pas tes données personnelles.',
        ],
      },
      {
        title: 'Qui peut y avoir accès',
        items: [
          'Les Hope Carriers voient le message et la catégorie d’une demande de prière. Ils voient ton prénom seulement si tu choisis de le partager. Nous ne leur montrons pas ton adresse e-mail.',
          'L’équipe de HopeBegins qui fait fonctionner le service, seulement si son travail l’exige.',
          'Les services tiers cités plus haut, seulement pour le service qu’ils fournissent.',
        ],
      },
      {
        title: 'Comment nous préservons la confidentialité',
        items: [
          'Chaque Hope Carrier accepte notre code de conduite, qui l’oblige à garder confidentiel ce que tu partages et à ne jamais partager une histoire sans permission.',
          'Les données échangées entre ton appareil et HopeBegins sont chiffrées pendant leur transfert (HTTPS).',
          'L’accès aux données personnelles est réservé aux personnes qui en ont besoin pour t’aider.',
        ],
      },
      {
        title: 'Tes droits',
        items: [
          'Selon la loi philippine sur la protection des données (Data Privacy Act of 2012, Republic Act No. 10173), tu peux demander à voir, corriger ou supprimer tes données personnelles, et tu peux retirer ton consentement.',
          'Tu peux te désabonner de nos e-mails à tout moment grâce au lien présent dans chaque e-mail.',
          'Si tu penses que tes droits n’ont pas été respectés, tu peux déposer une plainte auprès de la National Privacy Commission des Philippines (privacy.gov.ph).',
        ],
      },
    ],
    contact: {
      title: 'Nous contacter',
      before: 'Pour toute demande concernant tes informations, écris à ',
      middle: '. Lis le ',
      link: 'code de conduite',
      after: ' des Hope Carriers.',
    },
    emergency: 'HopeBegins n’est pas un service d’urgence',
  },
  de: {
    title: 'Datenschutz und Vertraulichkeit',
    updated: 'Zuletzt aktualisiert am 15. Oktober 2026',
    intro:
      'Menschen vertrauen HopeBegins Persönliches und Schmerzhaftes an. Hier erfährst du, was wir sammeln, wer es sehen kann, wie wir es schützen und was du selbst entscheiden kannst.',
    sections: [
      {
        title: 'Was wir sammeln',
        items: [
          'Gebetsanliegen: dein Name, deine E-Mail-Adresse, deine Nachricht sowie die Kategorie und die Organisation, die du auswählst.',
          'E-Mails von Daily Hope: dein Vorname, dein Nachname und deine E-Mail-Adresse.',
          'Geschichten der Hoffnung: dein Name, dein Beruf, dein Foto und deine Geschichte. Wir veröffentlichen eine Geschichte erst, nachdem wir sie geprüft und freigegeben haben.',
          'Persönlicher Plan: Deine Antworten, dein Plan, dein Fortschritt und deine Hoffnungskarte werden nur in deinem Browser auf deinem Gerät gespeichert, damit du später darauf zurückkommen kannst. Nichts davon wird an uns geschickt, und du kannst alles jederzeit auf der Seite deines Plans löschen. Wenn du eine Sicherungsdatei herunterlädst, bleibt sie bei dir; wir bekommen sie nie. Wenn du uns bittest, dir deinen Plan per E-Mail zu schicken, bekommen wir deine E-Mail-Adresse, deinen Vornamen, falls du ihn angibst, und den Plan.',
          'Täglicher Check-in und Übungen: Das Wetter, das du auswählst, was dich beschäftigt, und alles, was du in einer Übung auswählst oder schreibst, bleibt nur in deinem Browser auf deinem Gerät. Wir zählen, wie oft Check-ins gemacht und Übungen genutzt werden, aber nie, was du gewählt hast. Deine Check-ins kannst du auf der Check-in-Seite löschen.',
          'Nachfrage zum Plan: Wenn du uns bittest, nachzufragen, wie es dir geht, behalten wir deine E-Mail-Adresse und deinen Vornamen, bis wir 7 Tage später diese eine E-Mail schicken. Danach löschen wir sie.',
          'Bewerbungen als Hope Carrier: die Angaben, die du machst, wenn du dich für ein Ehrenamt bewirbst.',
          'Spenden: Donorbox wickelt die Spenden ab. Deine Kartendaten gehen an Donorbox und seine Zahlungspartner. HopeBegins bekommt sie nicht.',
          'Hope AI: Die Chats laufen über Bonfire (heybonfire.com), einen externen Dienst, der deine Nachrichten verarbeitet.',
          'Nutzung der Website: unsere eigene Zählung von Seitenaufrufen und von Klicks auf Links und Übungen. Diese Zählung kommt ohne Cookies und ohne Namen aus, enthält nichts, was du eingibst, und wir nutzen keine externen Analysedienste.',
        ],
      },
      {
        title: 'Wofür wir es nutzen',
        items: [
          'Um für dich zu beten, dir zu antworten und dir die E-Mails zu schicken, um die du gebeten hast.',
          'Um HopeBegins zu betreiben und zu verbessern.',
          'Wir verkaufen deine persönlichen Daten nicht.',
        ],
      },
      {
        title: 'Wer es sehen kann',
        items: [
          'Die Hope Carrier sehen die Nachricht und die Kategorie eines Gebetsanliegens. Deinen Vornamen sehen sie nur, wenn du ihn teilen möchtest. Deine E-Mail-Adresse zeigen wir ihnen nicht.',
          'Das Team von HopeBegins, das den Dienst betreibt, nur soweit es für seine Arbeit nötig ist.',
          'Die oben genannten externen Dienste, nur für die Leistung, die sie erbringen.',
        ],
      },
      {
        title: 'Wie wir es vertraulich behandeln',
        items: [
          'Alle Hope Carrier stimmen unserem Verhaltenskodex zu. Er verlangt, dass sie vertraulich behandeln, was du teilst, und nie Geschichten ohne Erlaubnis weitergeben.',
          'Daten zwischen deinem Gerät und HopeBegins werden bei der Übertragung verschlüsselt (HTTPS).',
          'Zugriff auf persönliche Daten haben nur Menschen, die ihn brauchen, um für dich da zu sein.',
        ],
      },
      {
        title: 'Deine Rechte',
        items: [
          'Nach dem philippinischen Datenschutzgesetz (Data Privacy Act of 2012, Republic Act No. 10173) kannst du darum bitten, deine persönlichen Daten einzusehen, zu korrigieren oder zu löschen, und du kannst deine Einwilligung widerrufen.',
          'Von unseren E-Mails kannst du dich jederzeit abmelden. Der Link dazu steht in jeder E-Mail.',
          'Wenn du glaubst, dass deine Rechte verletzt wurden, kannst du dich bei der National Privacy Commission der Philippinen beschweren (privacy.gov.ph).',
        ],
      },
    ],
    contact: {
      title: 'Kontakt',
      before: 'Für Anfragen zu deinen Daten schreib an ',
      middle: '. Lies den ',
      link: 'Verhaltenskodex',
      after: ' für Hope Carrier.',
    },
    emergency: 'HopeBegins ist kein Notdienst',
  },
  es: {
    title: 'Privacidad y confidencialidad',
    updated: 'Última actualización: 15 de octubre de 2026',
    intro:
      'Las personas comparten con HopeBegins cosas personales y dolorosas. Esta página explica qué recopilamos, quién puede verlo, cómo lo protegemos y qué opciones tienes.',
    sections: [
      {
        title: 'Qué recopilamos',
        items: [
          'Peticiones de oración: tu nombre, tu correo electrónico, el mensaje que escribes y la categoría y la organización que eliges.',
          'Correos de Daily Hope: tu nombre, tu apellido y tu correo electrónico.',
          'Historias de esperanza: tu nombre, tu ocupación, tu foto y tu historia. Publicamos una historia solo después de revisarla y aprobarla.',
          'Plan personal: tus respuestas, tu plan, tu progreso y tu tarjeta de esperanza se guardan solo en el navegador de tu dispositivo, para que puedas volver a ellos. No se nos envían, y puedes borrarlos en cualquier momento desde la página del plan. Si descargas un archivo de respaldo, se queda contigo; nunca lo recibimos. Si nos pides que te enviemos tu plan por correo, recibimos tu correo electrónico, tu nombre si nos lo das y el plan.',
          'Chequeo diario y herramientas: el clima que eliges, lo que tienes en mente y todo lo que eliges o escribes en una herramienta se quedan solo en el navegador de tu dispositivo. Contamos cuántos chequeos se hacen y cuántas herramientas se usan, nunca lo que elegiste. Puedes borrar tus chequeos desde la página del chequeo diario.',
          'Seguimiento del plan: si nos pides que te escribamos para saber cómo estás, guardamos tu correo electrónico y tu nombre hasta enviarte ese único correo 7 días después, y luego los borramos.',
          'Solicitudes para ser Hope Carrier: los datos que das cuando te postulas para el voluntariado.',
          'Donaciones: Donorbox procesa las donaciones. Los datos de tu tarjeta van a Donorbox y a sus socios de pago. HopeBegins no los recibe.',
          'Hope AI: los chats funcionan con Bonfire (heybonfire.com), un servicio externo que procesa tus mensajes.',
          'Uso del sitio: nuestro propio conteo de visitas a las páginas y de toques en enlaces y herramientas. No usa cookies, no guarda nombres ni nada de lo que escribes, y no usamos herramientas de analítica externas.',
        ],
      },
      {
        title: 'Para qué lo usamos',
        items: [
          'Para orar por ti, responderte y enviarte los correos que pediste.',
          'Para hacer funcionar y mejorar HopeBegins.',
          'No vendemos tu información personal.',
        ],
      },
      {
        title: 'Quién puede verlo',
        items: [
          'Los Hope Carriers ven el mensaje y la categoría de una petición de oración. Solo ven tu nombre si decides compartirlo. No les mostramos tu correo electrónico.',
          'El equipo de HopeBegins que opera el servicio, solo cuando su trabajo lo requiere.',
          'Los servicios externos mencionados arriba, solo para el servicio que prestan.',
        ],
      },
      {
        title: 'Cómo lo mantenemos confidencial',
        items: [
          'Cada Hope Carrier acepta nuestro código de conducta, que le exige mantener en confidencialidad lo que compartes y nunca compartir historias sin permiso.',
          'Los datos entre tu dispositivo y HopeBegins se cifran durante la transmisión (HTTPS).',
          'Solo pueden acceder a la información personal las personas que la necesitan para atenderte.',
        ],
      },
      {
        title: 'Tus derechos',
        items: [
          'Según la ley de privacidad de datos de Filipinas (Data Privacy Act of 2012, Republic Act No. 10173), puedes pedir ver, corregir o borrar tu información personal, y puedes retirar tu consentimiento.',
          'Puedes darte de baja de nuestros correos en cualquier momento con el enlace que viene en cada correo.',
          'Si crees que se violaron tus derechos, puedes presentar una queja ante la National Privacy Commission de Filipinas (privacy.gov.ph).',
        ],
      },
    ],
    contact: {
      title: 'Contáctanos',
      before: 'Para hacer una solicitud sobre tu información, escribe a ',
      middle: '. Lee el ',
      link: 'código de conducta',
      after: ' de los Hope Carriers.',
    },
    emergency: 'HopeBegins no es un servicio de emergencias',
  },
  ko: {
    title: '개인정보 보호와 비밀 유지',
    updated: '마지막 업데이트: 2026년 10월 15일',
    intro:
      '사람들은 HopeBegins에 개인적이고 아픈 이야기를 털어놓아요. 이 페이지에서는 우리가 무엇을 수집하는지, 누가 볼 수 있는지, 어떻게 보호하는지, 그리고 어떤 선택을 할 수 있는지 설명해요.',
    sections: [
      {
        title: '수집하는 정보',
        items: [
          '기도 요청: 이름, 이메일 주소, 직접 쓴 메시지, 그리고 선택한 카테고리와 단체.',
          'Daily Hope 이메일: 이름, 성, 이메일 주소.',
          '희망 이야기: 이름, 직업, 사진, 이야기. 이야기는 우리가 검토하고 승인한 뒤에만 게시해요.',
          '나만의 계획: 답변, 계획, 진행 상황, 희망 카드는 나중에 다시 볼 수 있도록 기기의 브라우저에만 저장돼요. 우리에게 전송되지 않으며, 계획 페이지에서 언제든 삭제할 수 있어요. 백업 파일을 내려받으면 그 파일은 직접 보관하게 되고, 우리는 절대 받지 않아요. 계획을 이메일로 보내 달라고 요청하면 이메일 주소, 알려 준 경우 이름, 그리고 계획을 받아요.',
          '오늘의 체크인과 도구: 고른 날씨, 마음에 담긴 생각, 도구에서 고르거나 쓴 내용은 모두 기기의 브라우저에만 남아요. 우리는 체크인이나 도구를 사용한 횟수는 집계하지만, 무엇을 골랐는지는 절대 집계하지 않아요. 체크인 기록은 체크인 페이지에서 삭제할 수 있어요.',
          '계획 체크인: 안부를 물어봐 달라고 요청하면, 7일 뒤 그 한 통의 이메일을 보낼 때까지 이메일 주소와 이름을 보관하고, 보낸 뒤에는 삭제해요.',
          'Hope Carrier 지원서: 봉사자로 지원할 때 적은 정보.',
          '후원: 후원금은 Donorbox가 처리해요. 카드 정보는 Donorbox와 결제 협력사로 전달되며, HopeBegins는 받지 않아요.',
          'Hope AI: 대화는 Bonfire(heybonfire.com)에서 운영돼요. Bonfire는 메시지를 처리하는 외부 서비스예요.',
          '사이트 이용: 페이지 방문 수와 링크·도구를 누른 횟수를 자체적으로 집계해요. 이 집계에는 쿠키도, 이름도, 입력한 내용도 없으며, 외부 분석 도구는 사용하지 않아요.',
        ],
      },
      {
        title: '정보를 사용하는 목적',
        items: [
          '기도해 드리고, 답장하고, 요청한 이메일을 보내기 위해서예요.',
          'HopeBegins를 운영하고 개선하기 위해서예요.',
          '개인정보를 판매하지 않아요.',
        ],
      },
      {
        title: '정보를 볼 수 있는 사람',
        items: [
          'Hope Carrier는 기도 요청의 메시지와 카테고리를 봐요. 이름은 공유하기로 선택한 경우에만 볼 수 있어요. 이메일 주소는 보여 주지 않아요.',
          '서비스를 운영하는 HopeBegins 직원은 업무에 필요한 만큼만 봐요.',
          '위에서 말한 외부 서비스는 제공하는 서비스에 필요한 만큼만 봐요.',
        ],
      },
      {
        title: '비밀을 지키는 방법',
        items: [
          '모든 Hope Carrier는 행동 강령에 동의해요. 행동 강령에 따라 나눈 이야기를 비밀로 지켜야 하고, 허락 없이 이야기를 절대 공유하면 안 돼요.',
          '기기와 HopeBegins 사이의 데이터는 전송 중에 암호화돼요(HTTPS).',
          '개인정보에는 도움을 드리는 데 필요한 사람만 접근할 수 있어요.',
        ],
      },
      {
        title: '나의 권리',
        items: [
          '필리핀 개인정보보호법(Data Privacy Act of 2012, Republic Act No. 10173)에 따라 개인정보를 열람, 정정, 삭제해 달라고 요청할 수 있고, 동의를 철회할 수도 있어요.',
          '모든 이메일에 있는 링크로 언제든 수신을 거부할 수 있어요.',
          '권리가 침해되었다고 생각되면 필리핀 국가개인정보위원회(National Privacy Commission, privacy.gov.ph)에 민원을 낼 수 있어요.',
        ],
      },
    ],
    contact: {
      title: '문의하기',
      before: '내 정보에 관해 요청할 것이 있으면 ',
      middle: '로 이메일을 보내 주세요. Hope Carrier ',
      link: '행동 강령',
      after: '을 읽어 보세요.',
    },
    emergency: 'HopeBegins는 응급 서비스가 아니에요',
  },
};

export function Privacy({ lang }: { lang: Lang }) {
  const t = noTl(copy, lang);
  return (
    <div className="px-6 pt-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <h1 className="text-balance font-playfair text-4xl md:text-6xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
            {t.title}
          </h1>
          <p className="mt-4 text-sm text-[#6E5F47]">{t.updated}</p>
          <p className="mt-6 font-poppins text-lg text-[#6E5F47] leading-relaxed tracking-[-0.022em]">
            {t.intro}
          </p>

          <div className="mt-12 space-y-10">
            {t.sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-playfair text-2xl md:text-3xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
                  {section.title}
                </h2>
                <ul className="mt-4 space-y-3 list-disc pl-5 marker:text-[#AEC488]">
                  {section.items.map((item) => (
                    <li key={item} className="text-[#6E5F47] leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            <section>
              <h2 className="font-playfair text-2xl md:text-3xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
                {t.contact.title}
              </h2>
              <p className="mt-4 text-[#6E5F47] leading-relaxed">
                {t.contact.before}
                <a
                  href={`mailto:${PRIVACY_EMAIL}`}
                  className="font-bold underline underline-offset-4"
                >
                  {PRIVACY_EMAIL}
                </a>
                {t.contact.middle}
                <Link
                  href="/guidelines"
                  className="font-bold underline underline-offset-4"
                >
                  {t.contact.link}
                </Link>
                {t.contact.after}
              </p>
            </section>

            <section className="rounded-2xl border border-[#AEC488] bg-[#EFF3E7] p-5 text-[#6E5F47]">
              <h2 className="font-playfair text-2xl md:text-3xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
                {t.emergency}
              </h2>
              <p className="mt-3 text-[#6E5F47] leading-relaxed">
                <CrisisSentence lang={lang} lead />
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
