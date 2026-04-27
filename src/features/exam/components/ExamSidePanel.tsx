import { QuestionGrid } from "./QuestionGrid";
import { formatTime } from "../utils/formatTime";
import type { Question, UserAnswer } from "../types/exam.types";

type ExamSidePanelProps = {
  questions: Question[];
  currentIndex: number;
  answers: UserAnswer[];
  timeLeft: number;
  onGoToQuestion: (index: number) => void;
  onFinish: () => void;
};

export function ExamSidePanel({
  questions,
  currentIndex,
  answers,
  timeLeft,
  onGoToQuestion,
  onFinish,
}: ExamSidePanelProps) {
  return (
    <aside className="exam-side-panel">
      <div className="exam-timer-box">
        <div className="font-bold text-[#1d2b7f]">THỜI GIAN CÒN LẠI:</div>
        <div
          className={[
            "exam-timer",
            timeLeft <= 60 ? "exam-timer--danger" : "",
          ].join(" ")}
        >
          {formatTime(timeLeft)}
        </div>
      </div>

      <QuestionGrid
        questions={questions}
        currentIndex={currentIndex}
        answers={answers}
        onGoToQuestion={onGoToQuestion}
      />

      <button type="button" onClick={onFinish} className="exam-finish-button">
        KẾT THÚC
      </button>
    </aside>
  );
}