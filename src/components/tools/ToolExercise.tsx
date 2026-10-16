'use client';

import type { PlanExercise } from '@/lib/actionPlan';
import type { FeelingLang } from '@/lib/feelingPages';
import type { ToolSource } from '@/services/analyticsService';
import { BreathingExercise } from './BreathingExercise';
import { GroundingExercise } from './GroundingExercise';
import { MessageSomeone } from './MessageSomeone';
import { OneSmallThing } from './OneSmallThing';
import { Reasons } from './Reasons';
import { Unhook } from './Unhook';
import { WorryTime } from './WorryTime';

/** Opens the guided version of a plan tool. */
export function ToolExercise({
  kind,
  ...props
}: {
  kind: PlanExercise;
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
    case 'reasons':
      return <Reasons {...props} />;
    case 'message':
      return (
        <div className="mt-5">
          <MessageSomeone lang={props.lang} />
        </div>
      );
  }
}
