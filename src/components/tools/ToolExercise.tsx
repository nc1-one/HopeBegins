'use client';

import type { PlanExercise } from '@/lib/actionPlan';
import type { FeelingLang } from '@/lib/feelingPages';
import type { ToolSource } from '@/services/analyticsService';
import { Biyahe } from './Biyahe';
import { BreathingExercise } from './BreathingExercise';
import { FindThePair } from './FindThePair';
import { GroundingExercise } from './GroundingExercise';
import { MessageSomeone } from './MessageSomeone';
import { Saranggola } from './Saranggola';
import { OneSmallThing } from './OneSmallThing';
import { Reasons } from './Reasons';
import { ThoughtCheck } from './ThoughtCheck';
import { Unhook } from './Unhook';
import { WorryNote } from './WorryNote';
import { WorryTime } from './WorryTime';

/** Every guided tool: the plan's, plus the games, the night-time note and thought check. */
export type ToolKind =
  | PlanExercise
  | 'game'
  | 'kite'
  | 'trip'
  | 'worry-note'
  | 'thought-check';

/** Opens the guided version of a plan tool. */
export function ToolExercise({
  kind,
  ...props
}: {
  kind: ToolKind;
  lang: FeelingLang;
  source: ToolSource;
  onClose: () => void;
  onFinish?: () => void;
  doneNote?: string;
}) {
  switch (kind) {
    case 'breathe':
      return <BreathingExercise {...props} />;
    case 'ground':
      return <GroundingExercise {...props} />;
    case 'one-thing':
      return <OneSmallThing {...props} />;
    case 'worry-time':
      return <WorryTime {...props} />;
    case 'unhook':
      return <Unhook {...props} />;
    case 'thought-check':
      return <ThoughtCheck {...props} />;
    case 'reasons':
      return <Reasons {...props} />;
    case 'message':
      return (
        <div className="mt-5">
          <MessageSomeone lang={props.lang} />
        </div>
      );
    case 'game':
      return (
        <div className="mt-5">
          <FindThePair
            lang={props.lang}
            source={props.source}
            onClose={props.onClose}
          />
        </div>
      );
    case 'kite':
      return (
        <div className="mt-5">
          <Saranggola
            lang={props.lang}
            source={props.source}
            onClose={props.onClose}
          />
        </div>
      );
    case 'trip':
      return (
        <div className="mt-5">
          <Biyahe
            lang={props.lang}
            source={props.source}
            onClose={props.onClose}
          />
        </div>
      );
    case 'worry-note':
      return (
        <div className="mt-5">
          <WorryNote lang={props.lang} />
        </div>
      );
  }
}
