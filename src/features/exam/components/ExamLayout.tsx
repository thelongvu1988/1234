import { useEffect, useState } from "react";
import { ExamBottomInfo } from "./ExamBottomInfo";
import { ExamHeaderMobile } from "./ExamHeaderMobile";
import { ExamMobileActions } from "./ExamMobileActions";
import { ExamMobilePanel } from "./ExamMobilePanel";
import { ExamQuestion } from "./ExamQuestion";
import { ExamResultModal } from "./ExamResultModal";
import { ExamReviewModal } from "./ExamReviewModal";
import { ExamSidePanel } from "./ExamSidePanel";
import { LeadSaveModal } from "./LeadSaveModal";
import { useCountdown } from "../hooks/useCountdown";
import { useCurrentAnswer } from "../hooks/useCurrentAnswer";
import { useQuizStore } from "../stores/quizStore";
import type { AnswerKey } from "../types/exam.types";

const EXAM_DURATION_SECONDS = 22 * 60;

export function ExamLayout() {
  const {
    questions,
    currentIndex,
    startQuiz,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    answers,
  } = useQuizStore();

  const [showPanel, setShowPanel] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showLeadSave, setShowLeadSave] = useState(false);

  const { timeLeft, isTimeUp, stop } = useCountdown(EXAM_DURATION_SECONDS);

  useEffect(() => {
    startQuiz();
  }, [startQuiz]);

  useEffect(() => {
    if (isTimeUp) {
      setShowResult(true);
    }
  }, [isTimeUp]);

  const question = questions[currentIndex];
  const selected = useCurrentAnswer(question, answers);

  if (!question) {
    return <div className="exam-loading">Đang tải đề thi...</div>;
  }

  const progress = Math.round((answers.length / questions.length) * 100);

  const handleSelect = (answerKey: AnswerKey) => {
    answerQuestion(question.id, answerKey);
  };

  const handleGoToQuestion = (index: number) => {
    goToQuestion(index);
    setShowPanel(false);
  };

  const handleFinish = () => {
    stop();
    setShowResult(true);
  };

  const handleReview = () => {
    setShowResult(false);
    setShowReview(true);
  };

  const handleCloseReview = () => {
    setShowReview(false);
    setShowResult(true);
  };

  const handleSave = () => {
    setShowLeadSave(true);
  };

  return (
    <div className="exam-shell">
      <ExamHeaderMobile
        currentIndex={currentIndex}
        total={questions.length}
        timeLeft={timeLeft}
      />

      <div className="exam-container">
        <div className="exam-content-grid">
          <ExamQuestion
            question={question}
            selected={selected}
            onSelect={handleSelect}
          />

          <ExamSidePanel
            questions={questions}
            currentIndex={currentIndex}
            answers={answers}
            timeLeft={timeLeft}
            onGoToQuestion={handleGoToQuestion}
            onFinish={handleFinish}
          />
        </div>

        <ExamBottomInfo progress={progress} />

        <ExamMobileActions
          onPrevious={previousQuestion}
          onNext={nextQuestion}
          onOpenPanel={() => setShowPanel(true)}
          onFinish={handleFinish}
        />

        <ExamMobilePanel
          open={showPanel}
          questions={questions}
          currentIndex={currentIndex}
          answers={answers}
          onClose={() => setShowPanel(false)}
          onGoToQuestion={handleGoToQuestion}
        />

        <ExamResultModal
          open={showResult}
          questions={questions}
          answers={answers}
          onClose={() => setShowResult(false)}
          onReview={handleReview}
          onSave={handleSave}
        />

        <ExamReviewModal
          open={showReview}
          questions={questions}
          answers={answers}
          onClose={handleCloseReview}
        />

        <LeadSaveModal
          open={showLeadSave}
          questions={questions}
          answers={answers}
          onClose={() => setShowLeadSave(false)}
          onSaved={() => alert("Đã lưu bài thi thành công.")}
        />

        <div className="h-28 md:hidden" />
      </div>
    </div>
  );
}