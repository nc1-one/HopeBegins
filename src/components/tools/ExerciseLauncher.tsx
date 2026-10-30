'use client';

import { useRef, useState } from 'react';
import { BreathingExercise } from './BreathingExercise';
import { FindThePair } from './FindThePair';
import { GroundingExercise } from './GroundingExercise';
import { OneSmallThing } from './OneSmallThing';
import type { FeelingLang } from '@/lib/feelingPages';
import { primaryClass } from './toolStyles';
import type { ToolSource } from '@/services/analyticsService';

const exercises = {
  tl: {
    'one-thing': {
      title: 'Isang maliit na bagay para sa araw na ito',
      description:
        'Pumili ng isang bagay na kaya mong tapusin sa loob ng 10 minuto, tulad ng maligo, kumain, o lumabas sandali. Sapat na iyon ngayong araw.',
      start: 'Pumili ng gagawin',
    },
    breathe: {
      title: 'Dahan-dahang paghinga',
      description:
        'Huminga papasok sa ilong nang 4 na bilang, palabas sa bibig nang 6. Dalawang minuto lang.',
      start: 'Simulan ang paghinga',
    },
    ground: {
      title: '5-4-3-2-1 grounding',
      description:
        'Kapag inaatake ka ng kaba, ibalik ang isip mo sa paligid gamit ang 5 senses mo. Mga 2 minuto.',
      start: 'Simulan ang 5-4-3-2-1',
    },
    game: {
      title: 'Hanapin ang kapares',
      description:
        'Mabilis na card game para sa mga oras na paulit-ulit ang iniisip mo. Mga 2 minuto.',
      start: 'Maglaro na',
    },
  },
  en: {
    'one-thing': {
      title: 'One small thing for today',
      description:
        "Pick one thing you can finish in 10 minutes, like a shower, something to eat, or a few minutes outside. That's enough for today.",
      start: 'Pick my small thing',
    },
    breathe: {
      title: 'Slow breathing',
      description:
        'Breathe in through your nose for 4 counts, then out through your mouth for 6. Just two minutes.',
      start: 'Start breathing',
    },
    ground: {
      title: 'Ground yourself with 5-4-3-2-1',
      description:
        'When anxiety hits, bring your mind back to where you are using your five senses. About 2 minutes.',
      start: 'Start 5-4-3-2-1',
    },
    game: {
      title: 'Find the pair',
      description:
        'A quick card game for when your thoughts keep going round. About 2 minutes.',
      start: 'Play now',
    },
  },
  fr: {
    'one-thing': {
      title: 'Une petite chose pour aujourd’hui',
      description:
        'Choisis une chose que tu peux finir en 10 minutes, comme une douche, manger un morceau ou quelques minutes dehors. C’est assez pour aujourd’hui.',
      start: 'Choisir ma petite chose',
    },
    breathe: {
      title: 'Respiration lente',
      description:
        'Inspire par le nez sur 4 temps, puis expire par la bouche sur 6. Deux minutes, c’est tout.',
      start: 'Commencer à respirer',
    },
    ground: {
      title: 'L’ancrage 5-4-3-2-1',
      description:
        'Quand l’anxiété monte, ramène ton esprit là où tu es grâce à tes cinq sens. Environ 2 minutes.',
      start: 'Commencer le 5-4-3-2-1',
    },
    game: {
      title: 'Trouve la paire',
      description:
        'Un petit jeu de cartes pour quand tes pensées tournent en rond. Environ 2 minutes.',
      start: 'Jouer',
    },
  },
  de: {
    'one-thing': {
      title: 'Eine kleine Sache für heute',
      description:
        'Wähl eine Sache, die du in 10 Minuten schaffst, zum Beispiel duschen, etwas essen oder ein paar Minuten nach draußen gehen. Das reicht für heute.',
      start: 'Meine kleine Sache wählen',
    },
    breathe: {
      title: 'Langsames Atmen',
      description:
        'Atme durch die Nase ein und zähl dabei bis 4, dann durch den Mund aus und zähl bis 6. Nur zwei Minuten.',
      start: 'Atemübung starten',
    },
    ground: {
      title: 'Die 5-4-3-2-1-Übung',
      description:
        'Wenn die Angst kommt, hol dich mit deinen fünf Sinnen zurück ins Hier und Jetzt. Etwa 2 Minuten.',
      start: '5-4-3-2-1 starten',
    },
    game: {
      title: 'Paare finden',
      description:
        'Ein schnelles Kartenspiel für Momente, in denen sich deine Gedanken im Kreis drehen. Etwa 2 Minuten.',
      start: 'Jetzt spielen',
    },
  },
  es: {
    'one-thing': {
      title: 'Una cosa pequeña para hoy',
      description:
        'Elige una cosa que puedas terminar en 10 minutos, como bañarte, comer algo o salir unos minutos. Con eso basta por hoy.',
      start: 'Elegir mi cosa pequeña',
    },
    breathe: {
      title: 'Respiración lenta',
      description:
        'Inhala por la nariz contando hasta 4 y luego exhala por la boca contando hasta 6. Solo dos minutos.',
      start: 'Empezar a respirar',
    },
    ground: {
      title: 'El ejercicio 5-4-3-2-1',
      description:
        'Cuando llega la ansiedad, trae tu mente de vuelta a donde estás usando tus cinco sentidos. Unos 2 minutos.',
      start: 'Empezar el 5-4-3-2-1',
    },
    game: {
      title: 'Encuentra las parejas',
      description:
        'Un juego de cartas rápido para cuando tus pensamientos no paran de dar vueltas. Unos 2 minutos.',
      start: 'Jugar ahora',
    },
  },
  ko: {
    'one-thing': {
      title: '오늘을 위한 작은 일 하나',
      description:
        '샤워하기, 뭐라도 먹기, 잠깐 밖에 나가기처럼 10분 안에 끝낼 수 있는 일 하나를 골라요. 오늘은 그거면 충분해요.',
      start: '작은 일 고르기',
    },
    breathe: {
      title: '천천히 숨쉬기',
      description:
        '코로 넷을 세며 들이쉬고, 입으로 여섯을 세며 내쉬어요. 2분이면 돼요.',
      start: '숨쉬기 시작',
    },
    ground: {
      title: '5-4-3-2-1 그라운딩',
      description:
        '불안이 밀려올 때, 오감을 사용해 마음을 지금 있는 곳으로 데려와요. 2분 정도 걸려요.',
      start: '5-4-3-2-1 시작',
    },
    game: {
      title: '짝 맞추기',
      description:
        '생각이 계속 맴돌 때 하는 짧은 카드 게임이에요. 2분 정도 걸려요.',
      start: '게임 시작',
    },
  },
};

export function ExerciseLauncher({
  kind,
  lang = 'tl',
  source = 'feeling',
}: {
  kind: 'breathe' | 'ground' | 'one-thing' | 'game';
  lang?: FeelingLang;
  source?: ToolSource;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const exercise = exercises[lang][kind];
  const startRef = useRef<HTMLButtonElement>(null);
  // Back to the start button once the exercise closes.
  const close = () => {
    setIsOpen(false);
    requestAnimationFrame(() => startRef.current?.focus());
  };

  return (
    <div className="rounded-2xl border border-zinc-100 bg-white p-6">
      <h3 className="font-poppins font-semibold text-lg text-[#6E5F47]">
        {exercise.title}
      </h3>
      <p className="mt-1 text-[#6E5F47] leading-relaxed">
        {exercise.description}
      </p>
      {isOpen ? (
        kind === 'breathe' ? (
          <BreathingExercise onClose={close} lang={lang} source={source} />
        ) : kind === 'ground' ? (
          <GroundingExercise onClose={close} lang={lang} source={source} />
        ) : kind === 'one-thing' ? (
          <OneSmallThing onClose={close} lang={lang} source={source} />
        ) : (
          <div className="mt-5">
            <FindThePair onClose={close} lang={lang} source={source} />
          </div>
        )
      ) : (
        <button
          ref={startRef}
          type="button"
          onClick={() => setIsOpen(true)}
          className={`mt-4 ${primaryClass}`}
        >
          {exercise.start}
        </button>
      )}
    </div>
  );
}
