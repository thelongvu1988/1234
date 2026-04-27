import type { AnswerKey } from "../types/exam.types";

type Props = {
  answerKeyValue: string;
  answerText: string;
  index: number;
  active?: boolean;
  disabled?: boolean;
  onSelect: (key: AnswerKey) => void;
};

export function AnswerButton({
  answerKeyValue,
  answerText,
  index,
  active,
  disabled,
  onSelect,
}: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelect(answerKeyValue as AnswerKey)}
      className={`exam-answer-row ${active ? "active" : ""}`}
    >
      <span className="exam-answer-index">{index + 1}</span>
      <span className="exam-answer-text">{answerText}</span>
    </button>
  );
}