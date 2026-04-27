import { QuestionGrid } from "./QuestionGrid";
import type { Question, UserAnswer } from "../types/exam.types";

type ExamMobilePanelProps = {
  open: boolean;
  questions: Question[];
  currentIndex: number;
  answers: UserAnswer[];
  onClose: () => void;
  onGoToQuestion: (index: number) => void;
};

export function ExamMobilePanel({
  open,
  questions,
  currentIndex,
  answers,
  onClose,
  onGoToQuestion,
}: ExamMobilePanelProps) {
  if (!open) return null;

  return (
    <div className="exam-mobile-panel-overlay">
      <div className="exam-mobile-panel">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-lg font-bold">Bảng câu hỏi</div>
          <button type="button" onClick={onClose} className="exam-close-button">
            Đóng
          </button>
        </div>

        <QuestionGrid
          questions={questions}
          currentIndex={currentIndex}
          answers={answers}
          onGoToQuestion={onGoToQuestion}
        />
      </div>
    </div>
  );
}