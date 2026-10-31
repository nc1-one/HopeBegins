'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import {
  MAX_REASONS,
  MAX_REASON_LENGTH,
  updatePlan,
  useSavedPlan,
} from '@/lib/actionPlanStore';
import type { FeelingLang } from '@/lib/feelingPages';
import { analyticsService, type ToolSource } from '@/services/analyticsService';
import { ToolFinish } from './ToolFinish';
import {
  inputClass,
  panelClass,
  primaryClass,
  quietClass,
  secondaryClass,
} from './toolStyles';

/**
 * "My reasons to keep going": a short list kept with the plan on this phone,
 * read on hard days and shown on the Hope Card.
 */

const copy = {
  en: {
    label: 'My reasons to keep going',
    intro:
      'Write the people, plans and small things that matter to you. Read them on hard days.',
    example:
      'For example: my little sister, finishing school, my dog, the sea.',
    addLabel: 'A reason',
    add: 'Add',
    listTitle: 'My reasons',
    remove: (reason: string) => `Remove "${reason}"`,
    saved: 'Saved only on this phone. They also show on your Hope Card.',
    done: 'Done',
    close: 'Close',
    doneTitle: 'Your reasons are saved.',
    doneText: 'Read them on hard days. You can add more any time.',
  },
  tl: {
    label: 'Ang mga dahilan ko para magpatuloy',
    intro:
      'Isulat ang mga tao, plano, at maliliit na bagay na mahalaga sa iyo. Basahin ang mga ito sa mabibigat na araw.',
    example:
      'Halimbawa: ang bunso kong kapatid, makatapos ng pag-aaral, ang aso ko, ang dagat.',
    addLabel: 'Isang dahilan',
    add: 'Idagdag',
    listTitle: 'Ang mga dahilan ko',
    remove: (reason: string) => `Alisin ang "${reason}"`,
    saved:
      'Naka-save lang sa phone na ito. Lumalabas din ang mga ito sa Hope Card mo.',
    done: 'Tapos na',
    close: 'Isara',
    doneTitle: 'Naka-save na ang mga dahilan mo.',
    doneText:
      'Basahin ang mga ito sa mabibigat na araw. Puwede kang magdagdag kahit kailan.',
  },
  fr: {
    label: 'Mes raisons de continuer',
    intro:
      'Note les personnes, les projets et les petites choses qui comptent pour toi. Relis-les les jours difficiles.',
    example:
      'Par exemple : ma petite sœur, finir mes études, mon chien, la mer.',
    addLabel: 'Une raison',
    add: 'Ajouter',
    listTitle: 'Mes raisons',
    remove: (reason: string) => `Retirer « ${reason} »`,
    saved:
      'Enregistrées seulement sur ce téléphone. Elles apparaissent aussi sur ta Hope Card.',
    done: 'Terminé',
    close: 'Fermer',
    doneTitle: 'Tes raisons sont enregistrées.',
    doneText:
      'Relis-les les jours difficiles. Tu peux en ajouter d’autres quand tu veux.',
  },
  de: {
    label: 'Meine Gründe zum Weitermachen',
    intro:
      'Schreib die Menschen, Pläne und kleinen Dinge auf, die dir wichtig sind. Lies sie an schweren Tagen.',
    example:
      'Zum Beispiel: meine kleine Schwester, mein Schulabschluss, mein Hund, das Meer.',
    addLabel: 'Ein Grund',
    add: 'Hinzufügen',
    listTitle: 'Meine Gründe',
    remove: (reason: string) => `„${reason}“ entfernen`,
    saved:
      'Nur auf diesem Handy gespeichert. Sie erscheinen auch auf deiner Hoffnungskarte.',
    done: 'Fertig',
    close: 'Schließen',
    doneTitle: 'Deine Gründe sind gespeichert.',
    doneText:
      'Lies sie an schweren Tagen. Du kannst jederzeit weitere hinzufügen.',
  },
  es: {
    label: 'Mis razones para seguir',
    intro:
      'Escribe qué personas, planes y pequeñas cosas te importan. Lee tu lista en los días difíciles.',
    example:
      'Por ejemplo: mi hermanita, terminar mis estudios, mi perro, el mar.',
    addLabel: 'Una razón',
    add: 'Agregar',
    listTitle: 'Mis razones',
    remove: (reason: string) => `Quitar “${reason}”`,
    saved: 'Se guardan solo en este celular. También aparecen en tu tarjeta de esperanza.',
    done: 'Listo',
    close: 'Cerrar',
    doneTitle: 'Tus razones quedaron guardadas.',
    doneText:
      'Léelas en los días difíciles. Puedes agregar más cuando quieras.',
  },
  ko: {
    label: '내가 계속 나아갈 이유',
    intro:
      '나에게 소중한 사람, 계획, 작은 것들을 적어 두고 힘든 날 꺼내 읽어 보세요.',
    example: '예: 내 동생, 졸업하기, 우리 강아지, 바다.',
    addLabel: '이유 하나',
    add: '추가',
    listTitle: '나의 이유',
    remove: (reason: string) => `“${reason}” 삭제`,
    saved: '이 휴대폰에만 저장돼요. Hope Card에도 보여요.',
    done: '완료',
    close: '닫기',
    doneTitle: '이유를 저장했어요',
    doneText: '힘든 날 읽어 보세요. 언제든 더 추가할 수 있어요.',
  },
};

export function Reasons({
  onClose,
  lang = 'en',
  source,
  onFinish,
  doneNote,
}: {
  onClose: () => void;
  lang?: FeelingLang;
  source: ToolSource;
  onFinish?: () => void;
  doneNote?: string;
}) {
  const t = copy[lang];
  const saved = useSavedPlan();
  const reasons = saved?.reasons ?? [];
  const [draft, setDraft] = useState('');
  const [isDone, setIsDone] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    boxRef.current?.focus({ preventScroll: true });
    boxRef.current?.scrollIntoView({ block: 'nearest' });
    if (counted.current) return;
    counted.current = true;
    analyticsService.recordClick(`tool_reasons_start_${source}`);
  }, [source]);

  const setReasons = (next: string[]) =>
    updatePlan((plan) => ({ ...plan, reasons: next.slice(0, MAX_REASONS) }));

  const add = () => {
    const text = draft.trim();
    if (!text || reasons.length >= MAX_REASONS) return;
    setReasons([...reasons, text]);
    setDraft('');
  };

  if (isDone) {
    return (
      <ToolFinish
        kind="reasons"
        lang={lang}
        source={source}
        title={t.doneTitle}
        text={t.doneText}
        doneNote={doneNote}
        ask={false}
        onClose={onClose}
      />
    );
  }

  return (
    <div
      ref={boxRef}
      tabIndex={-1}
      role="group"
      aria-label={t.label}
      className={panelClass}
    >
      <p className="leading-relaxed">{t.intro}</p>
      <p className="mt-1 text-sm">{t.example}</p>

      {reasons.length > 0 && (
        <div className="mt-4 rounded-2xl bg-white p-4">
          <p className="font-poppins font-bold">{t.listTitle}</p>
          <ul className="mt-2 space-y-1">
            {reasons.map((reason, i) => (
              <li
                key={`${i}-${reason}`}
                className="flex items-center justify-between gap-3"
              >
                <span>{reason}</span>
                <button
                  type="button"
                  aria-label={t.remove(reason)}
                  onClick={() =>
                    setReasons(reasons.filter((_, index) => index !== i))
                  }
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {reasons.length < MAX_REASONS && (
        <form
          className="mt-4"
          onSubmit={(event) => {
            event.preventDefault();
            add();
          }}
        >
          <label htmlFor="reason-new" className="text-sm font-bold">
            {t.addLabel}
          </label>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <input
              id="reason-new"
              value={draft}
              maxLength={MAX_REASON_LENGTH}
              onChange={(event) => setDraft(event.target.value)}
              className={inputClass}
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              className={secondaryClass}
            >
              {t.add}
            </button>
          </div>
        </form>
      )}

      <p className="mt-4 text-sm">{t.saved}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={reasons.length === 0}
          onClick={() => {
            analyticsService.recordClick(`tool_reasons_done_${source}`);
            onFinish?.();
            setIsDone(true);
          }}
          className={primaryClass}
        >
          {t.done}
        </button>
        <button type="button" onClick={onClose} className={quietClass}>
          {t.close}
        </button>
      </div>
    </div>
  );
}
