'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from '@/components/ui/LocalLink';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import { ToolExercise, type ToolKind } from '@/components/tools/ToolExercise';
import { EcoachLink } from '@/components/ui/EcoachLink';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { groupClass, rowClass } from '@/components/ui/listStyles';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import { WAR_ROOM_URL } from '@/lib/actionPlan';
import { useSavedPlan } from '@/lib/actionPlanStore';
import type { FeelingLang } from '@/lib/feelingPages';
import { setLanguage, useLanguage } from '@/lib/languagePreference';
import { pathIn, TAGLISH_TWINS, twinLinks } from '@/lib/taglishTwins';
import { type PhotoId } from '@/lib/photos';
import { usePhotoPicker } from '@/components/ui/PhotoTurn';
import { CrisisSentence } from '@/components/help/Crisis';

/**
 * Every tool in one place, grouped by what is happening right now. Each one
 * opens and runs right on this page. What people type stays on the phone;
 * the tools count only that they were started and finished. Under them, the
 * rest of HopeBegins (Hope AI, prayer, Daily Hope, HopeCasts and the plan),
 * each on its own page.
 */

type Text = Record<FeelingLang, string>;

interface Tool {
  minutes: Text;
  title: Text;
  text: Text;
  why: Text;
}

const TOOLS: Record<ToolKind, Tool> = {
  breathe: {
    minutes: {
      en: '1 to 2 min',
      tl: '1 hanggang 2 min',
      fr: '1 à 2 min',
      de: '1 bis 2 Min.',
      es: '1 a 2 min',
      ko: '1~2분',
    },
    title: {
      en: 'Slow breathing',
      tl: 'Dahan-dahang paghinga',
      fr: 'Respiration lente',
      de: 'Langsames Atmen',
      es: 'Respiración lenta',
      ko: '천천히 숨쉬기',
    },
    text: {
      en: 'Breathe in for 4 and out for 6, following a circle.',
      tl: 'Inhale nang 4, exhale nang 6, habang sinusundan ang bilog.',
      fr: 'Inspire pendant 4 secondes et expire pendant 6, en suivant un cercle.',
      de: 'Atme 4 Sekunden lang ein und 6 Sekunden lang aus und folge dabei einem Kreis.',
      es: 'Inhala durante 4 segundos y exhala durante 6, siguiendo un círculo.',
      ko: '원을 따라 4초 동안 들이쉬고 6초 동안 내쉬어요.',
    },
    why: {
      en: 'A longer breath out slows your heart and helps your body settle.',
      tl: 'Kapag mas mahaba ang exhale, bumabagal ang tibok ng puso at kumakalma ang katawan.',
      fr: 'Une expiration plus longue ralentit ton cœur et aide ton corps à s’apaiser.',
      de: 'Längeres Ausatmen verlangsamt deinen Herzschlag und hilft deinem Körper, zur Ruhe zu kommen.',
      es: 'Exhalar por más tiempo hace que tu corazón lata más despacio y ayuda a tu cuerpo a calmarse.',
      ko: '숨을 더 길게 내쉬면 심장 박동이 느려지고 몸이 차분해져요.',
    },
  },
  ground: {
    minutes: {
      en: '2 min',
      tl: '2 min',
      fr: '2 min',
      de: '2 Min.',
      es: '2 min',
      ko: '2분',
    },
    title: {
      en: 'Use your 5 senses (5-4-3-2-1)',
      tl: 'Gamitin ang 5 senses mo (5-4-3-2-1)',
      fr: 'Utilise tes 5 sens (5-4-3-2-1)',
      de: 'Deine 5 Sinne nutzen (5-4-3-2-1)',
      es: 'Usa tus 5 sentidos (5-4-3-2-1)',
      ko: '오감 사용하기 (5-4-3-2-1)',
    },
    text: {
      en: 'Notice 5 things you see, 4 you can touch, 3 you hear, 2 you smell and 1 you taste.',
      tl: 'Pansinin ang 5 nakikita mo, 4 na nahahawakan, 3 na naririnig, 2 na naaamoy at 1 na nalalasahan.',
      fr: 'Remarque 5 choses que tu vois, 4 que tu peux toucher, 3 que tu entends, 2 que tu sens et 1 que tu goûtes.',
      de: 'Nimm 5 Dinge wahr, die du siehst, 4, die du anfassen kannst, 3, die du hörst, 2, die du riechst, und 1, das du schmeckst.',
      es: 'Fíjate en 5 cosas que ves, 4 que puedes tocar, 3 que oyes, 2 que hueles y 1 que saboreas.',
      ko: '보이는 것 5가지, 만질 수 있는 것 4가지, 들리는 소리 3가지, 맡을 수 있는 냄새 2가지, 느껴지는 맛 1가지를 찾아봐요.',
    },
    why: {
      en: 'Your senses bring your attention back to where you are, away from the worry.',
      tl: 'Ibinabalik ng senses mo ang atensyon mo sa paligid, palayo sa inaalala mo.',
      fr: 'Tes sens ramènent ton attention là où tu es, loin de l’inquiétude.',
      de: 'Deine Sinne holen deine Aufmerksamkeit zurück ins Hier und Jetzt, weg von der Sorge.',
      es: 'Tus sentidos traen tu atención de vuelta a donde estás, lejos de la preocupación.',
      ko: '감각이 주의를 걱정에서 떼어 내 지금 있는 곳으로 데려와요.',
    },
  },
  game: {
    minutes: {
      en: '2 min',
      tl: '2 min',
      fr: '2 min',
      de: '2 Min.',
      es: '2 min',
      ko: '2분',
    },
    title: {
      en: 'Find the pair',
      tl: 'Hanapin ang kapares',
      fr: 'Trouve la paire',
      de: 'Paare finden',
      es: 'Encuentra las parejas',
      ko: '짝 맞추기',
    },
    text: {
      en: 'Match jeepneys, mangoes and parol lanterns. No timer.',
      tl: 'Ipares ang mga dyip, mangga at parol. Walang timer.',
      fr: 'Retrouve les paires de mangues, d’étoiles de Noël et de bus. Pas de chrono.',
      de: 'Finde Paare aus Mangos, Weihnachtssternen und Bussen. Ohne Zeitdruck.',
      es: 'Encuentra las parejas de mangos, estrellas navideñas y autobuses. Sin cronómetro.',
      ko: '망고, 크리스마스 별, 버스의 짝을 맞춰요. 시간 제한은 없어요.',
    },
    why: {
      en: 'Keeping a few cards in mind leaves less room for the thoughts going round.',
      tl: 'Kapag may ilang card kang tinatandaan, nababawasan ang puwang ng paulit-ulit na isip.',
      fr: 'Garder quelques cartes en tête laisse moins de place aux pensées qui tournent en boucle.',
      de: 'Wenn du dir ein paar Karten merkst, bleibt weniger Platz für die Gedanken, die sich im Kreis drehen.',
      es: 'Recordar algunas cartas deja menos espacio a los pensamientos que dan vueltas.',
      ko: '카드 몇 장을 기억하다 보면 맴도는 생각이 들어설 자리가 줄어요.',
    },
  },
  kite: {
    minutes: {
      en: '1 min',
      tl: '1 min',
      fr: '1 min',
      de: '1 Min.',
      es: '1 min',
      ko: '1분',
    },
    title: {
      en: 'Saranggola',
      tl: 'Saranggola',
      fr: 'Le cerf-volant',
      de: 'Der Drachen',
      es: 'La cometa',
      ko: '연날리기',
    },
    text: {
      en: 'Fly a kite from morning to sunset and catch the stars. Hold to lift, let go to glide.',
      tl: 'Paliparin ang saranggola mula umaga hanggang paglubog ng araw at hulihin ang mga bituin. I-hold para tumaas, bitawan para dumausdos.',
      fr: 'Fais voler un cerf-volant du matin au coucher du soleil et attrape les étoiles. Maintiens le doigt appuyé pour monter, relâche pour planer.',
      de: 'Lass einen Drachen vom Morgen bis zum Sonnenuntergang steigen und fang die Sterne. Halte gedrückt, damit er steigt, lass los, damit er gleitet.',
      es: 'Vuela una cometa desde la mañana hasta el atardecer y atrapa las estrellas. Mantén presionado para subir y suelta para planear.',
      ko: '아침부터 해 질 녘까지 연을 날리며 별을 잡아요. 누르고 있으면 올라가고, 손을 떼면 미끄러지듯 날아요.',
    },
    why: {
      en: 'Following something that moves, and breathing with it, gives a busy mind somewhere to rest.',
      tl: 'Kapag may sinusundan kang gumagalaw at sinasabayan mo ng hinga, may mapagpapahingahan ang abalang isip.',
      fr: 'Suivre des yeux quelque chose qui bouge, en respirant avec, donne à un esprit agité un endroit où se reposer.',
      de: 'Wenn du etwas folgst, das sich bewegt, und dabei mitatmest, kommt ein unruhiger Kopf zur Ruhe.',
      es: 'Seguir algo que se mueve, y respirar a su ritmo, le da a una mente ocupada un lugar donde descansar.',
      ko: '움직이는 것을 눈으로 따라가며 함께 숨 쉬면, 바쁜 마음이 쉴 곳이 생겨요.',
    },
  },
  'thought-check': {
    minutes: {
      en: '3 min',
      tl: '3 min',
      fr: '3 min',
      de: '3 Min.',
      es: '3 min',
      ko: '3분',
    },
    title: {
      en: 'Thought check',
      tl: 'Thought check',
      fr: 'Vérifier une pensée',
      de: 'Gedanken-Check',
      es: 'Revisar un pensamiento',
      ko: '생각 점검',
    },
    text: {
      en: 'Tap the thought that sounds like yours, spot the thinking trap, then pick a kinder, truer way to see it.',
      tl: 'I-tap ang isip na kahawig ng sa iyo, kilalanin ang thinking trap, tapos pumili ng mas mabait at mas totoong pagtingin.',
      fr: 'Touche la pensée qui ressemble à la tienne, repère le piège de pensée, puis choisis une façon plus douce et plus juste de voir les choses.',
      de: 'Tippe auf den Gedanken, der wie deiner klingt, erkenne die Denkfalle und wähle dann eine freundlichere, ehrlichere Sicht darauf.',
      es: 'Toca el pensamiento que se parece al tuyo, descubre la trampa de pensamiento y elige una forma más amable y más real de verlo.',
      ko: '내 생각과 비슷한 생각을 누르고, 생각의 함정을 알아본 다음, 더 다정하고 더 사실에 가까운 시각을 골라요.',
    },
    why: {
      en: 'Heavy thoughts feel like facts. Checking one, the way CBT counselors teach, often makes it lighter. Nothing you pick is saved.',
      tl: 'Parang totoo ang mabibigat na isip. Kapag sinuri mo ito, gaya ng itinuturo sa CBT, madalas itong gumagaan. Walang naka-save sa pipiliin mo.',
      fr: 'Les pensées lourdes ont l’air de faits. En vérifier une, comme on l’apprend en TCC, la rend souvent plus légère. Rien de ce que tu choisis n’est enregistré.',
      de: 'Schwere Gedanken fühlen sich wie Tatsachen an. Einen davon zu prüfen, wie man es in der kognitiven Verhaltenstherapie lernt, macht ihn oft leichter. Nichts, was du auswählst, wird gespeichert.',
      es: 'Los pensamientos pesados se sienten como hechos. Revisar uno, como se enseña en la terapia cognitivo-conductual, muchas veces lo aligera. Nada de lo que eliges se guarda.',
      ko: '무거운 생각은 사실처럼 느껴져요. 인지행동치료(CBT)에서 배우는 방식으로 하나를 점검해 보면 가벼워질 때가 많아요. 고른 내용은 저장되지 않아요.',
    },
  },
  unhook: {
    minutes: {
      en: '2 min',
      tl: '2 min',
      fr: '2 min',
      de: '2 Min.',
      es: '2 min',
      ko: '2분',
    },
    title: {
      en: 'Step back from a heavy thought',
      tl: 'Lumayo nang kaunti sa mabigat na isip',
      fr: 'Prendre du recul face à une pensée lourde',
      de: 'Von einem schweren Gedanken Abstand nehmen',
      es: 'Tomar distancia de un pensamiento pesado',
      ko: '무거운 생각에서 한 걸음 물러나기',
    },
    text: {
      en: 'Tap the thought that has hold of you, read it back in a new way, then return to what you were doing.',
      tl: 'I-tap ang isip na kumakapit sa iyo, basahin ito sa bagong paraan, tapos bumalik sa ginagawa mo.',
      fr: 'Touche la pensée qui a prise sur toi, relis-la d’une nouvelle façon, puis reviens à ce que tu faisais.',
      de: 'Tippe auf den Gedanken, der dich festhält, lies ihn auf eine neue Art und kehr dann zu dem zurück, was du gerade gemacht hast.',
      es: 'Toca el pensamiento que no te suelta, reléelo de una forma nueva y vuelve a lo que estabas haciendo.',
      ko: '나를 붙잡고 있는 생각을 누르고, 새로운 방식으로 다시 읽은 다음, 하던 일로 돌아가요.',
    },
    why: {
      en: 'Noticing a thought as a thought puts a little space between you and it. Nothing you pick or type is saved.',
      tl: 'Kapag napansin mong isip lang ito, nagkakaroon ng kaunting distansya. Walang naka-save sa pinili o itina-type mo.',
      fr: 'Voir une pensée comme une simple pensée met un peu de distance entre elle et toi. Rien de ce que tu choisis ou écris n’est enregistré.',
      de: 'Einen Gedanken als Gedanken zu bemerken, schafft ein wenig Abstand zwischen dir und ihm. Nichts, was du auswählst oder schreibst, wird gespeichert.',
      es: 'Darte cuenta de que un pensamiento es solo un pensamiento pone un poco de distancia entre tú y él. Nada de lo que eliges o escribes se guarda.',
      ko: '생각을 그저 생각으로 알아차리면, 나와 그 생각 사이에 작은 틈이 생겨요. 고르거나 쓴 내용은 저장되지 않아요.',
    },
  },
  'worry-time': {
    minutes: {
      en: '15 min a day',
      tl: '15 min araw-araw',
      fr: '15 min par jour',
      de: '15 Min. am Tag',
      es: '15 min al día',
      ko: '하루 15분',
    },
    title: {
      en: 'Worry time',
      tl: 'Worry time',
      fr: 'Le quart d’heure des soucis',
      de: 'Sorgenzeit',
      es: 'Tiempo para preocuparte',
      ko: '걱정 시간',
    },
    text: {
      en: 'Tap or write worries as they come, then deal with them in 15 minutes at the same time each day.',
      tl: 'I-tap o isulat ang mga pag-aalala habang dumarating, tapos harapin sa loob ng 15 minuto sa parehong oras araw-araw.',
      fr: 'Touche ou écris tes soucis quand ils arrivent, puis occupe-t’en pendant 15 minutes, à la même heure chaque jour.',
      de: 'Tippe deine Sorgen an oder schreib sie auf, wenn sie kommen, und kümmere dich dann jeden Tag zur gleichen Zeit 15 Minuten lang darum.',
      es: 'Toca o escribe tus preocupaciones cuando lleguen y luego atiéndelas durante 15 minutos, a la misma hora cada día.',
      ko: '걱정이 떠오를 때마다 누르거나 적어 두고, 매일 같은 시간에 15분 동안 다뤄요.',
    },
    why: {
      en: 'Giving worry its own time makes it easier to set it down for the rest of the day.',
      tl: 'Kapag may sariling oras ang pag-aalala, mas madali itong bitawan sa natitirang oras ng araw.',
      fr: 'Donner à l’inquiétude son propre moment aide à la laisser de côté le reste de la journée.',
      de: 'Wenn die Sorgen ihre eigene Zeit haben, kannst du sie den Rest des Tages leichter beiseitelegen.',
      es: 'Darle a la preocupación su propio tiempo hace más fácil dejarla a un lado el resto del día.',
      ko: '걱정에 따로 시간을 내주면, 남은 하루 동안 걱정을 내려놓기가 더 쉬워져요.',
    },
  },
  'worry-note': {
    minutes: {
      en: '2 min, at night',
      tl: '2 min, sa gabi',
      fr: '2 min, le soir',
      de: '2 Min., abends',
      es: '2 min, en la noche',
      ko: '2분, 밤에',
    },
    title: {
      en: 'Worry note',
      tl: 'Worry note',
      fr: 'Mettre tes soucis de côté',
      de: 'Sorgenzettel',
      es: 'Nota de preocupaciones',
      ko: '걱정 메모',
    },
    text: {
      en: "Tap or write what's keeping you up, then set it aside until morning.",
      tl: 'I-tap o isulat kung bakit gising ka pa, tapos itabi muna hanggang umaga.',
      fr: 'Touche ou écris ce qui t’empêche de dormir, puis mets-le de côté jusqu’au matin.',
      de: 'Tippe an oder schreib auf, was dich wach hält, und leg es dann bis zum Morgen beiseite.',
      es: 'Toca o escribe lo que no te deja dormir y déjalo a un lado hasta la mañana.',
      ko: '잠 못 들게 하는 걱정을 누르거나 적고, 아침까지 잠시 내려놓아요.',
    },
    why: {
      en: "Getting it out of your head and onto the page can make it easier to rest. It isn't saved or sent anywhere.",
      tl: 'Kapag nailabas mo sa isip at naisulat, mas madaling makapagpahinga. Hindi ito naka-save o ipinapadala kahit saan.',
      fr: 'Le sortir de ta tête pour le poser par écrit peut t’aider à te reposer. Ce n’est ni enregistré ni envoyé nulle part.',
      de: 'Wenn es aus deinem Kopf aufs Papier kommt, fällt das Ausruhen oft leichter. Es wird nirgends gespeichert oder verschickt.',
      es: 'Sacarlo de tu cabeza y ponerlo por escrito puede ayudarte a descansar. No se guarda ni se envía a ningún lado.',
      ko: '머릿속 걱정을 꺼내 글로 적으면 쉬기가 한결 쉬워질 수 있어요. 어디에도 저장되거나 전송되지 않아요.',
    },
  },
  'one-thing': {
    minutes: {
      en: '10 min',
      tl: '10 min',
      fr: '10 min',
      de: '10 Min.',
      es: '10 min',
      ko: '10분',
    },
    title: {
      en: 'One small thing',
      tl: 'Isang maliit na bagay',
      fr: 'Une petite chose',
      de: 'Eine kleine Sache',
      es: 'Una cosa pequeña',
      ko: '작은 일 하나',
    },
    text: {
      en: 'Pick one thing you can finish in 10 minutes, like a shower, a meal or a short walk.',
      tl: 'Pumili ng isang bagay na matatapos mo sa 10 minuto, gaya ng pagligo, pagkain o maikling lakad.',
      fr: 'Choisis une chose que tu peux finir en 10 minutes, comme une douche, un repas ou une petite marche.',
      de: 'Wähl eine Sache, die du in 10 Minuten schaffst, zum Beispiel eine Dusche, eine Mahlzeit oder einen kurzen Spaziergang.',
      es: 'Elige una cosa que puedas terminar en 10 minutos, como bañarte, comer algo o dar una caminata corta.',
      ko: '샤워, 식사, 짧은 산책처럼 10분 안에 끝낼 수 있는 일 하나를 골라요.',
    },
    why: {
      en: 'When you feel low, the energy often comes after you start, rarely before.',
      tl: 'Kapag malungkot ka, kadalasang dumarating ang gana pagkatapos mong magsimula, bihira bago.',
      fr: 'Quand le moral est bas, l’envie vient souvent après avoir commencé, rarement avant.',
      de: 'Wenn du niedergeschlagen bist, kommt der Antrieb oft erst, wenn du angefangen hast, selten vorher.',
      es: 'Cuando estás sin ánimo, las ganas suelen llegar después de empezar, casi nunca antes.',
      ko: '마음이 가라앉은 날에는 시작하고 나서야 힘이 나는 경우가 많아요. 시작하기 전에 힘이 나는 일은 드물어요.',
    },
  },
  trip: {
    minutes: {
      en: '1 to 5 min each',
      tl: '1 hanggang 5 min bawat isa',
      fr: '1 à 5 min chacune',
      de: '1 bis 5 Min. pro Mission',
      es: '1 a 5 min cada una',
      ko: '하나에 1~5분',
    },
    title: {
      en: 'The trip',
      tl: 'Biyahe',
      fr: 'Le trajet',
      de: 'Die Fahrt',
      es: 'El paseo en autobús',
      ko: '여행길',
    },
    text: {
      en: 'Tiny real-life missions, like a glass of water or 2 minutes outside, drive a jeepney from home to the sea.',
      tl: 'Maliliit na misyon, gaya ng isang basong tubig o 2 minuto sa labas, ang magdadala sa dyip mula bahay hanggang dagat.',
      fr: 'De toutes petites missions de la vraie vie, comme boire un verre d’eau ou passer 2 minutes dehors, font avancer le bus de la maison jusqu’à la mer.',
      de: 'Winzige Aufgaben aus dem echten Leben, wie ein Glas Wasser oder 2 Minuten draußen, bringen den Bus von zu Hause bis ans Meer.',
      es: 'Misiones pequeñitas de la vida real, como un vaso de agua o 2 minutos afuera, llevan el autobús de la casa hasta el mar.',
      ko: '물 한 잔, 바깥에서 2분처럼 아주 작은 실제 미션을 할 때마다 버스가 집에서 바다까지 달려가요.',
    },
    why: {
      en: 'On low days, small real steps tend to lift your mood more than waiting until you feel ready.',
      tl: 'Sa mabibigat na araw, mas nakakagaan ang maliliit na totoong hakbang kaysa hintaying maging handa ka.',
      fr: 'Les jours sans élan, de petits pas concrets remontent souvent le moral plus qu’attendre d’en avoir envie.',
      de: 'An schweren Tagen heben kleine, echte Schritte die Stimmung meist mehr, als zu warten, bis du dich bereit fühlst.',
      es: 'En los días bajos, los pasos pequeños y reales suelen levantar más el ánimo que esperar a tener ganas.',
      ko: '기운 없는 날에는 준비됐다고 느낄 때까지 기다리기보다, 작은 걸음을 실제로 내딛는 쪽이 기분을 더 끌어올려 줄 때가 많아요.',
    },
  },
  message: {
    minutes: {
      en: '1 min',
      tl: '1 min',
      fr: '1 min',
      de: '1 Min.',
      es: '1 min',
      ko: '1분',
    },
    title: {
      en: 'Message someone',
      tl: 'Mag-message sa isang tao',
      fr: 'Écrire à quelqu’un',
      de: 'Jemandem schreiben',
      es: 'Escribirle a alguien',
      ko: '누군가에게 메시지 보내기',
    },
    text: {
      en: 'A short message you can copy and send to someone you trust.',
      tl: 'Isang maikling mensahe na puwede mong kopyahin at ipadala sa taong pinagkakatiwalaan mo.',
      fr: 'Un court message à copier et à envoyer à une personne de confiance.',
      de: 'Eine kurze Nachricht, die du kopieren und jemandem schicken kannst, dem du vertraust.',
      es: 'Un mensaje corto que puedes copiar y mandarle a alguien de confianza.',
      ko: '복사해서 믿을 수 있는 사람에게 보낼 수 있는 짧은 메시지예요.',
    },
    why: {
      en: 'One message is easier to send than starting a whole conversation.',
      tl: 'Mas madaling magpadala ng isang mensahe kaysa magsimula ng mahabang usapan.',
      fr: 'Un seul message, c’est plus facile à envoyer que de lancer toute une conversation.',
      de: 'Eine einzelne Nachricht ist leichter abzuschicken, als ein ganzes Gespräch anzufangen.',
      es: 'Un solo mensaje es más fácil de mandar que empezar toda una conversación.',
      ko: '긴 대화를 시작하는 것보다 메시지 하나 보내는 게 더 쉬워요.',
    },
  },
  reasons: {
    minutes: {
      en: '5 min',
      tl: '5 min',
      fr: '5 min',
      de: '5 Min.',
      es: '5 min',
      ko: '5분',
    },
    title: {
      en: 'My reasons to keep going',
      tl: 'Ang mga dahilan ko para magpatuloy',
      fr: 'Mes raisons de continuer',
      de: 'Meine Gründe zum Weitermachen',
      es: 'Mis razones para seguir',
      ko: '내가 계속 나아갈 이유',
    },
    text: {
      en: 'Write down the people, plans and small things that matter to you, to read on hard days.',
      tl: 'Isulat ang mga tao, plano at maliliit na bagay na mahalaga sa iyo, para basahin sa mabibigat na araw.',
      fr: 'Note les personnes, les projets et les petites choses qui comptent pour toi, à relire les jours difficiles.',
      de: 'Schreib die Menschen, Pläne und kleinen Dinge auf, die dir wichtig sind, damit du sie an schweren Tagen lesen kannst.',
      es: 'Escribe las personas, los planes y las pequeñas cosas que te importan, para leerlos en los días difíciles.',
      ko: '소중한 사람, 계획, 작은 것들을 적어 두고 힘든 날에 읽어요.',
    },
    why: {
      en: 'Your own reasons, in your own words, are there when it is hard to think of any.',
      tl: 'Nandiyan ang sarili mong mga dahilan, sa sarili mong salita, kapag mahirap mag-isip ng kahit isa.',
      fr: 'Tes propres raisons, avec tes propres mots, sont là quand c’est dur d’en trouver une seule.',
      de: 'Deine eigenen Gründe, in deinen eigenen Worten, sind da, wenn dir gerade keiner einfällt.',
      es: 'Tus propias razones, con tus propias palabras, están ahí cuando cuesta pensar en alguna.',
      ko: '이유가 하나도 떠오르지 않을 때, 내 말로 적어 둔 나만의 이유가 거기 있어요.',
    },
  },
};

const GROUPS: {
  id: string;
  /** The words under the photo you pick. */
  label: Text;
  photo: PhotoId;
  title: Text;
  tools: ToolKind[];
}[] = [
  {
    id: 'tight',
    label: {
      en: 'Chest is tight',
      tl: 'Masikip ang dibdib',
      fr: 'Poitrine serrée',
      de: 'Enge in der Brust',
      es: 'Pecho apretado',
      ko: '가슴이 답답해요',
    },
    photo: 'anxious',
    title: {
      en: "When your chest is tight or you're panicking",
      tl: 'Kapag masikip ang dibdib mo o nagpa-panic ka',
      fr: 'Quand ta poitrine se serre ou que tu paniques',
      de: 'Wenn deine Brust eng wird oder du in Panik gerätst',
      es: 'Cuando sientes el pecho apretado o tienes pánico',
      ko: '가슴이 답답하거나 공황이 올 때',
    },
    tools: ['breathe', 'ground'],
  },
  {
    id: 'loop',
    label: {
      en: "Thoughts won't stop",
      tl: 'Ayaw tumigil ng isip',
      fr: 'Pensées en boucle',
      de: 'Gedanken kreisen',
      es: 'No paro de pensar',
      ko: '생각이 안 멈춰요',
    },
    photo: 'sleep',
    title: {
      en: "When your thoughts won't stop",
      tl: 'Kapag ayaw tumigil ng isip mo',
      fr: 'Quand tes pensées tournent en boucle',
      de: 'Wenn deine Gedanken nicht zur Ruhe kommen',
      es: 'Cuando tus pensamientos no paran',
      ko: '생각이 멈추지 않을 때',
    },
    tools: ['thought-check', 'unhook', 'worry-time', 'worry-note'],
  },
  {
    id: 'break',
    label: {
      en: 'Need a break',
      tl: 'Kailangan ng pahinga',
      fr: 'Besoin de souffler',
      de: 'Brauche eine Pause',
      es: 'Necesito un respiro',
      ko: '쉬고 싶어요',
    },
    photo: 'morning',
    title: {
      en: 'When you need a break from your head',
      tl: 'Kapag kailangan mo ng pahinga sa kakaisip',
      fr: 'Quand ta tête a besoin d’une pause',
      de: 'Wenn dein Kopf eine Pause braucht',
      es: 'Cuando tu mente necesita un respiro',
      ko: '머릿속에 쉼이 필요할 때',
    },
    tools: ['game', 'kite'],
  },
  {
    id: 'stuck',
    label: {
      en: "Can't get going",
      tl: 'Walang ganang kumilos',
      fr: 'Du mal à démarrer',
      de: 'Komme nicht in Gang',
      es: 'No puedo arrancar',
      ko: '시작이 안 돼요',
    },
    photo: 'tired',
    title: {
      en: "When you can't get going",
      tl: 'Kapag wala kang ganang kumilos',
      fr: 'Quand tu n’arrives pas à démarrer',
      de: 'Wenn du nicht in Gang kommst',
      es: 'Cuando no logras arrancar',
      ko: '도무지 시작이 안 될 때',
    },
    tools: ['one-thing', 'trip'],
  },
  {
    id: 'alone',
    label: {
      en: 'Feel alone',
      tl: 'Parang mag-isa',
      fr: 'La solitude pèse',
      de: 'Fühle mich allein',
      es: 'Siento soledad',
      ko: '외로워요',
    },
    photo: 'alone',
    title: {
      en: 'When you feel alone',
      tl: 'Kapag pakiramdam mo mag-isa ka',
      fr: 'Quand la solitude te pèse',
      de: 'Wenn du dich allein fühlst',
      es: 'Cuando sientes que no tienes a nadie',
      ko: '외롭다고 느낄 때',
    },
    tools: ['message'],
  },
  {
    id: 'reason',
    label: {
      en: 'Need a reason',
      tl: 'Kailangan ng dahilan',
      fr: 'Besoin d’une raison',
      de: 'Brauche einen Grund',
      es: 'Necesito una razón',
      ko: '이유가 필요해요',
    },
    photo: 'hope',
    title: {
      en: 'When you need a reason to keep going',
      tl: 'Kapag kailangan mo ng dahilan para magpatuloy',
      fr: 'Quand tu as besoin d’une raison de continuer',
      de: 'Wenn du einen Grund zum Weitermachen brauchst',
      es: 'Cuando necesitas una razón para seguir adelante',
      ko: '계속 나아갈 이유가 필요할 때',
    },
    tools: ['reasons'],
  },
];

interface MoreLink {
  /** A plain string is a name, kept in English on Taglish pages too. */
  title: Text | string;
  text: Text;
  /** A page opens at its Taglish address on Taglish pages, if it has one. */
  to:
    | { page: string }
    | { ecoach: string }
    | { site: string; linkName: string };
}

/** The rest of HopeBegins. These open their own page, or another app. */
const MORE: { id: string; title: Text; links: MoreLink[] }[] = [
  {
    id: 'talk',
    title: {
      en: 'When you want to talk to someone',
      tl: 'Kapag gusto mong may makausap',
      fr: 'Quand tu as envie de parler à quelqu’un',
      de: 'Wenn du mit jemandem reden möchtest',
      es: 'Cuando quieres hablar con alguien',
      ko: '누군가와 이야기하고 싶을 때',
    },
    links: [
      {
        title: {
          en: 'Talk to Hope AI',
          tl: 'Kausapin si Hope AI',
          fr: 'Parler à Hope AI',
          de: 'Mit Hope AI reden',
          es: 'Hablar con Hope AI',
          ko: 'Hope AI와 이야기하기',
        },
        text: {
          en: 'An AI assistant you can talk to any hour, day or night.',
          tl: 'Isang AI assistant na puwede mong kausapin anumang oras, araw man o gabi.',
          fr: 'Un assistant IA à qui parler à toute heure, de jour comme de nuit.',
          de: 'Ein KI-Assistent, mit dem du jederzeit reden kannst, Tag und Nacht.',
          es: 'Un asistente de IA con el que puedes hablar a cualquier hora, de día o de noche.',
          ko: '낮이든 밤이든 언제든 이야기할 수 있는 AI 도우미예요.',
        },
        to: { page: '/hope-ai' },
      },
      {
        // On French, German, Spanish and Korean pages this goes to the help
        // page (free lines in the visitor's country), so no e-coach there.
        title: {
          en: 'Talk to an e-coach',
          tl: 'Kausapin ang isang e-coach',
          fr: 'Parler à quelqu’un',
          de: 'Mit jemandem reden',
          es: 'Hablar con alguien',
          ko: '누군가와 이야기하기',
        },
        text: {
          en: 'A real person from Himala Everyday, on Messenger.',
          tl: 'Isang totoong tao mula sa Himala Everyday, sa Messenger.',
          fr: 'Une ligne d’écoute gratuite dans ton pays, avec une vraie personne au bout du fil.',
          de: 'Kostenlose Hilfetelefone in deinem Land. Am anderen Ende ist ein echter Mensch.',
          es: 'Una línea de ayuda gratuita en tu país, con una persona real del otro lado.',
          ko: '지금 있는 나라의 무료 상담 전화에서 실제 사람과 이야기할 수 있어요.',
        },
        to: { ecoach: 'ecoach_tools_talk' },
      },
    ],
  },
  {
    id: 'pray',
    title: {
      en: 'When you want to pray',
      tl: 'Kapag gusto mong magdasal',
      fr: 'Quand tu as envie de prier',
      de: 'Wenn du beten möchtest',
      es: 'Cuando quieres orar',
      ko: '기도하고 싶을 때',
    },
    links: [
      {
        title: {
          en: 'Ask for prayer',
          tl: 'Magpadasal',
          fr: 'Demander qu’on prie pour toi',
          de: 'Um Gebet bitten',
          es: 'Pedir oración',
          ko: '기도 요청하기',
        },
        text: {
          en: 'Send a prayer request and a Hope Carrier will pray for you.',
          tl: 'Ipadala ang prayer request mo at ipagdadasal ka ng isang Hope Carrier.',
          fr: 'Envoie une demande de prière, et un Hope Carrier priera pour toi.',
          de: 'Schick ein Gebetsanliegen, und ein Hope Carrier betet für dich.',
          es: 'Envía tu petición de oración y un Hope Carrier orará por ti.',
          ko: '기도 제목을 보내면 Hope Carrier가 그 제목을 놓고 기도해 줘요.',
        },
        to: { page: '/prayers' },
      },
      {
        title: 'Prayer War Room',
        text: {
          en: 'A free prayer app for a guided prayer time. Opens in a new tab.',
          tl: 'Libreng prayer app para sa guided prayer time. Magbubukas sa bagong tab.',
          fr: 'Une appli de prière gratuite pour un temps de prière guidé. S’ouvre dans un nouvel onglet.',
          de: 'Eine kostenlose Gebets-App für eine angeleitete Gebetszeit. Öffnet sich in einem neuen Tab.',
          es: 'Una app de oración gratuita para un tiempo de oración guiado. Se abre en una pestaña nueva.',
          ko: '안내에 따라 기도 시간을 가질 수 있는 무료 기도 앱이에요. 새 탭에서 열려요.',
        },
        to: { site: WAR_ROOM_URL, linkName: 'war_room' },
      },
    ],
  },
  {
    id: 'every-day',
    title: {
      en: 'For every day',
      tl: 'Para sa araw-araw',
      fr: 'Pour chaque jour',
      de: 'Für jeden Tag',
      es: 'Para cada día',
      ko: '하루하루를 위해',
    },
    links: [
      {
        title: 'Daily Hope',
        text: {
          en: 'A short, encouraging email every day for 21 days. Free.',
          tl: 'Isang maikling email na pampalakas-loob araw-araw, sa loob ng 21 araw. Libre.',
          fr: 'Un court e-mail encourageant chaque jour pendant 21 jours. Gratuit.',
          de: 'Jeden Tag eine kurze, ermutigende E-Mail, 21 Tage lang. Kostenlos.',
          es: 'Un correo corto y alentador cada día durante 21 días. Gratis.',
          ko: '21일 동안 매일 짧은 격려 이메일이 와요. 무료예요.',
        },
        to: { page: '/daily-hope' },
      },
      {
        title: 'HopeCasts',
        text: {
          en: 'Short audio messages of hope to listen to.',
          tl: 'Maiikling audio na mensahe ng pag-asa na puwede mong pakinggan.',
          fr: 'De courts messages audio pleins d’espoir, à écouter.',
          de: 'Kurze Audiobotschaften voller Hoffnung zum Anhören.',
          es: 'Mensajes de audio cortos y llenos de esperanza para escuchar.',
          ko: '들을 수 있는 짧은 희망의 오디오 메시지예요.',
        },
        to: { page: '/hopecasts' },
      },
      {
        title: 'Hopeful Beginning Plan',
        text: {
          en: 'A free plan for hard days that stays on your phone.',
          tl: 'Libreng plano para sa mabibigat na araw. Sa phone mo lang ito naka-save.',
          fr: 'Un plan gratuit pour les jours difficiles, qui reste sur ton téléphone.',
          de: 'Ein kostenloser Plan für schwere Tage, der auf deinem Handy bleibt.',
          es: 'Un plan gratuito para los días difíciles que se queda en tu celular.',
          ko: '힘든 날을 위한 무료 계획이에요. 내 휴대폰에만 저장돼요.',
        },
        to: { page: '/action-plan' },
      },
      {
        title: {
          en: 'Five steps for hopeless days',
          tl: 'Limang hakbang kapag parang wala nang pag-asa',
          fr: 'Cinq étapes pour les jours sans espoir',
          de: 'Fünf Schritte für hoffnungslose Tage',
          es: 'Cinco pasos cortos para cuando pierdes la esperanza',
          ko: '희망이 보이지 않는 날을 위한 다섯 걸음',
        },
        text: {
          en: 'A video, a prayer and a Bible reading.',
          tl: 'Isang video, isang dasal at isang Bible reading.',
          fr: 'Une vidéo, une prière et une lecture de la Bible.',
          de: 'Ein Video, ein Gebet und ein Bibeltext.',
          es: 'Un video, una oración y una lectura de la Biblia.',
          ko: '영상 하나, 기도 하나, 성경 말씀 한 구절이에요.',
        },
        to: { page: '/get-started' },
      },
    ],
  },
];

const copy = {
  en: {
    title: 'Tools for hard moments',
    subtitle:
      'Most take a few taps and a few minutes. Nothing you pick leaves your phone.',
    pick: "What's happening?",
    needsPlan: 'Your reasons are kept with your plan on this phone.',
    makePlan: 'Make your free plan first',
    ecoach: 'Or talk to an e-coach on Messenger',
    close: 'Close',
  },
  tl: {
    title: 'Mga tool para sa mabibigat na sandali',
    subtitle:
      'Ilang tap at ilang minuto lang ang karamihan. Walang umaalis sa phone mo sa mga pipiliin mo.',
    pick: 'Ano ang nangyayari?',
    needsPlan:
      'Naka-save ang mga dahilan mo kasama ng plano mo sa phone na ito.',
    makePlan: 'Gumawa muna ng libreng plano',
    ecoach: 'O kausapin ang isang e-coach sa Messenger',
    close: 'Isara',
  },
  fr: {
    title: 'Des outils pour les moments difficiles',
    subtitle:
      'La plupart se font en quelques touches et quelques minutes. Rien de ce que tu choisis ne quitte ton téléphone.',
    pick: 'Qu’est-ce qui se passe ?',
    needsPlan: 'Tes raisons sont gardées avec ton plan, sur ce téléphone.',
    makePlan: 'Crée d’abord ton plan gratuit',
    ecoach: 'Ou parle à quelqu’un',
    close: 'Fermer',
  },
  de: {
    title: 'Übungen für schwere Momente',
    subtitle:
      'Meist reichen ein paar Minuten und ein paar Mal Tippen. Nichts, was du auswählst, verlässt dein Handy.',
    pick: 'Was ist gerade los?',
    needsPlan:
      'Deine Gründe werden zusammen mit deinem Plan auf diesem Handy gespeichert.',
    makePlan: 'Erstell zuerst deinen kostenlosen Plan',
    ecoach: 'Oder rede mit jemandem',
    close: 'Schließen',
  },
  es: {
    title: 'Herramientas para momentos difíciles',
    subtitle:
      'Casi todas se usan con unos cuantos toques, en pocos minutos. Nada de lo que eliges sale de tu celular.',
    pick: '¿Qué está pasando?',
    needsPlan: 'Tus razones se guardan junto con tu plan en este celular.',
    makePlan: 'Primero haz tu plan gratuito',
    ecoach: 'O habla con alguien',
    close: 'Cerrar',
  },
  ko: {
    title: '힘든 순간을 위한 도구',
    subtitle:
      '대부분 몇 번 누르고 몇 분이면 끝나요. 고른 내용은 휴대폰 밖으로 나가지 않아요.',
    pick: '지금 어떤가요?',
    needsPlan: '이유는 이 휴대폰에 계획과 함께 저장돼요.',
    makePlan: '먼저 무료 계획 만들기',
    ecoach: '아니면 누군가와 이야기해 보세요',
    close: '닫기',
  },
};

function MoreRow({ link, lang }: { link: MoreLink; lang: FeelingLang }) {
  const { to } = link;
  const icon = 'h-4 w-4 shrink-0 text-[#C5BFB5] group-hover:text-[#6E5F47]';
  const body = (
    <>
      <span className="min-w-0 flex-1">
        {typeof link.title === 'string' ? (
          <span
            lang="en"
            className="block font-poppins font-bold text-[#6E5F47]"
          >
            {link.title}
          </span>
        ) : (
          <span className="block font-poppins font-bold text-[#6E5F47]">
            {link.title[lang]}
          </span>
        )}
        <span className="mt-0.5 block text-sm text-[#6E5F47]/75">
          {link.text[lang]}
        </span>
      </span>
      {'page' in to ? (
        <ChevronRight aria-hidden className={icon} />
      ) : (
        <ArrowUpRight aria-hidden className={icon} />
      )}
    </>
  );

  if ('ecoach' in to) {
    return (
      <EcoachLink linkName={to.ecoach} className={rowClass}>
        {body}
      </EcoachLink>
    );
  }
  if ('site' in to) {
    return (
      <TrackedLink
        href={to.site}
        linkName={to.linkName}
        target="_blank"
        rel="noopener noreferrer"
        className={rowClass}
      >
        {body}
      </TrackedLink>
    );
  }
  return (
    <Link href={pathIn(to.page, lang)} className={rowClass}>
      {body}
    </Link>
  );
}

function ToolCard({
  kind,
  lang,
  isOpen,
  onOpen,
  onClose,
}: {
  kind: ToolKind;
  lang: FeelingLang;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const tool = TOOLS[kind];
  const t = copy[lang];
  const rowRef = useRef<HTMLButtonElement>(null);
  const plan = useSavedPlan();
  const needsPlan = kind === 'reasons' && !plan;

  // Back to the row once the tool closes.
  const close = () => {
    onClose();
    requestAnimationFrame(() => rowRef.current?.focus());
  };

  return (
    <li className="hb-step-in">
      {/* One row per tool: tap it and the tool opens right under it. */}
      <button
        ref={rowRef}
        type="button"
        aria-expanded={isOpen}
        onClick={isOpen ? close : onOpen}
        className={`${rowClass} w-full text-left`}
      >
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline gap-x-3">
            <span className="font-poppins font-bold text-[#6E5F47]">
              {tool.title[lang]}
            </span>
            <span className="text-sm text-[#6E5F47]/75">
              {tool.minutes[lang]}
            </span>
          </span>
        </span>
        <ChevronRight
          className={`h-4 w-4 shrink-0 text-[#C5BFB5] transition-transform duration-[var(--hb-quick)] group-hover:text-[#6E5F47] ${
            isOpen ? 'rotate-90' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-3 pb-4 sm:px-5">
          <p className="px-2 text-sm text-[#6E5F47] leading-relaxed sm:px-0">
            {tool.text[lang]} {tool.why[lang]}
          </p>
          {needsPlan ? (
            <p className="mt-3 px-2 text-sm text-[#6E5F47] sm:px-0">
              {t.needsPlan}{' '}
              <Link
                href={pathIn('/action-plan', lang)}
                className="inline-flex min-h-11 items-center font-bold underline underline-offset-4"
              >
                {t.makePlan}
              </Link>
            </p>
          ) : (
            <>
              <ToolExercise
                kind={kind}
                lang={lang}
                source="page"
                onClose={close}
              />
              {/* These two have no close button of their own. */}
              {(kind === 'message' || kind === 'worry-note') && (
                <button
                  type="button"
                  onClick={close}
                  className="mt-3 inline-flex min-h-11 items-center rounded-xl px-3 text-sm font-medium text-[#6E5F47] underline underline-offset-4 hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
                >
                  {t.close}
                </button>
              )}
            </>
          )}
        </div>
      )}
    </li>
  );
}

/**
 * The tools in the visitor's language, or in `lang` on the page's Taglish
 * address (see taglishTwins.ts).
 */
export function Toolbox({ lang: pageLang }: { lang?: FeelingLang } = {}) {
  const preferred = useLanguage();
  const lang = pageLang ?? preferred;
  const t = copy[lang];
  const [active, setActive] = useState(GROUPS[0].id);
  const pickPhoto = usePhotoPicker();
  const [open, setOpen] = useState<ToolKind | null>(null);
  const tabs = useRef<Record<string, HTMLButtonElement | null>>({});
  const group = GROUPS.find((item) => item.id === active) ?? GROUPS[0];

  // The Taglish address, and links with ?lang=tl, make Taglish the choice.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('lang');
    const chosen = pageLang ?? requested;
    if (chosen === 'tl' || chosen === 'en') setLanguage(chosen);
  }, [pageLang]);

  const select = (id: string) => {
    setActive(id);
    setOpen(null);
  };

  // Arrow keys move between the photos, like any set of tabs.
  const onTabKey = (event: React.KeyboardEvent) => {
    const index = GROUPS.findIndex((item) => item.id === active);
    const last = GROUPS.length - 1;
    const next =
      event.key === 'ArrowRight'
        ? (index + 1) % GROUPS.length
        : event.key === 'ArrowLeft'
          ? (index + last) % GROUPS.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : -1;
    if (next < 0) return;
    event.preventDefault();
    select(GROUPS[next].id);
    tabs.current[GROUPS[next].id]?.focus();
  };

  return (
    <div lang={lang} className="px-6 pt-6 pb-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col-reverse gap-6 md:flex-row md:items-start md:justify-between">
          <OptionPageHeader title={t.title} subtitle={t.subtitle} />
          <div className="self-end md:self-auto">
            {pageLang ? (
              <LanguageSwitch
                links={twinLinks(TAGLISH_TWINS.tools)}
                current={pageLang}
              />
            ) : (
              <LanguageSwitch />
            )}
          </div>
        </div>

        <p
          id="tools-pick"
          className="mt-10 font-poppins font-semibold text-[#6E5F47]"
        >
          {t.pick}
        </p>
        <div
          role="tablist"
          aria-labelledby="tools-pick"
          onKeyDown={onTabKey}
          className="-mx-6 mt-3 flex snap-x scroll-px-6 gap-4 overflow-x-auto px-6 pt-1 pb-3 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-6 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {GROUPS.map((item) => {
            const isActive = item.id === active;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  tabs.current[item.id] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={isActive}
                aria-controls="tools-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => select(item.id)}
                className="group w-28 shrink-0 snap-start text-left focus-visible:outline-none md:w-auto"
              >
                <span
                  className={`relative block aspect-square overflow-hidden rounded-xl bg-[#EFF3E7] ring-offset-2 ring-offset-[#FCFDFA] transition-shadow duration-[var(--hb-base)] ease-[var(--hb-ease-out)] group-focus-visible:ring-4 group-focus-visible:ring-[#91AFAA]/60 ${
                    isActive ? 'ring-2 ring-[#6E5F47]' : ''
                  }`}
                >
                  <Image
                    src={pickPhoto(item.photo).src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 160px, 112px"
                    className={`object-cover transition-[filter,transform] duration-[var(--hb-slow)] ease-[var(--hb-ease-out)] ${
                      isActive
                        ? 'scale-105'
                        : 'saturate-[0.8] group-hover:saturate-100'
                    }`}
                  />
                </span>
                <span className="mt-2 block font-poppins text-sm font-medium leading-snug text-[#6E5F47]">
                  {item.label[lang]}
                </span>
              </button>
            );
          })}
        </div>

        <section
          id="tools-panel"
          role="tabpanel"
          aria-labelledby={`tab-${group.id}`}
          className="mt-8 border-t border-[#E2DFDA] pt-8 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10"
        >
          {/* The picked photo, large, crossfading from the last one: a
              second picture of the same moment, not the tab's own. */}
          <div className="relative hidden aspect-[4/5] overflow-hidden rounded-xl bg-[#EFF3E7] md:sticky md:top-28 md:block md:self-start">
            {GROUPS.map((item) => (
              <Image
                key={item.id}
                src={pickPhoto(item.photo, 1).src}
                alt=""
                fill
                sizes="400px"
                className={`object-cover transition-opacity duration-[var(--hb-slow)] ease-[var(--hb-ease-out)] ${
                  item.id === active ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>

          <div key={group.id}>
            <h2 className="font-playfair text-3xl md:text-4xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em] hb-step-in">
              {group.title[lang]}
            </h2>
            {group.id === 'reason' && (
              <div className="mt-5 rounded-2xl border border-[#AEC488] bg-[#EFF3E7] p-5 text-[#6E5F47] hb-step-in">
                <p>
                  <CrisisSentence lang={lang} lead />
                </p>
                <EcoachLink
                  linkName="ecoach_tools_reason"
                  className="mt-2 inline-flex min-h-11 items-center font-bold underline underline-offset-4"
                >
                  {t.ecoach}
                </EcoachLink>
              </div>
            )}
            <ul className={`mt-5 ${groupClass}`}>
              {group.tools.map((kind) => (
                <ToolCard
                  key={kind}
                  kind={kind}
                  lang={lang}
                  isOpen={open === kind}
                  onOpen={() => setOpen(kind)}
                  onClose={() => setOpen(null)}
                />
              ))}
            </ul>
          </div>
        </section>

        {/* Hope AI, prayer, Daily Hope and the rest live here too, with
            the other things to do now. */}
        {MORE.map((section) => (
          <section
            key={section.id}
            aria-labelledby={`more-${section.id}`}
            className="mt-12 border-t border-[#E2DFDA] pt-8"
          >
            <h2
              id={`more-${section.id}`}
              className="font-playfair text-3xl md:text-4xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]"
            >
              {section.title[lang]}
            </h2>
            <ul className={`mt-5 max-w-2xl ${groupClass}`}>
              {section.links.map((link) => (
                <li
                  key={
                    typeof link.title === 'string' ? link.title : link.title.en
                  }
                >
                  <MoreRow link={link} lang={lang} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
