import { AnswerButton } from "./AnswerButton";
import type { AnswerKey, Question } from "../types/exam.types";

type AnswerListProps = {
  question: Question;
  selected?: AnswerKey;
  isSubmitted: boolean;
  onSelect: (answerKey: AnswerKey) => void;
};

export function AnswerList({
  question,
  selected,
  isSubmitted,
  onSelect,
}: AnswerListProps) {
  const answers = Object.entries(question.answers).filter(([, value]) =>
    Boolean(value)
  );

  return (
    <div className="mt-6 space-y-3">
      {answers.map(([key, value], index) => {
        return (
          <AnswerButton
            key={key}
            answerKeyValue={key}
            answerText={value || ""}
            index={index}
            active={selected === key}
            disabled={isSubmitted}
            onSelect={onSelect}
          />
        );
      })}
    </div>
  );
}