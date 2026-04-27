import type { Question, UserAnswer } from "../types/exam.types";

export type ExamResult = {
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  criticalWrongQuestions: Question[];
  isPassed: boolean;
  failedReason?: string;
};

const PASS_SCORE = 27;

export function calculateResult(
  questions: Question[],
  answers: UserAnswer[],
): ExamResult {
  let correctCount = 0;
  let wrongCount = 0;
  const criticalWrongQuestions: Question[] = [];

  for (const question of questions) {
    const answer = answers.find((item) => item.questionId === question.id);

    if (!answer) continue;

    const isCorrect = answer.selectedAnswer === question.correctAnswer;

    if (isCorrect) {
      correctCount += 1;
    } else {
      wrongCount += 1;

      if (question.isCritical) {
        criticalWrongQuestions.push(question);
      }
    }
  }

  const unansweredCount = questions.length - answers.length;
  const hasCriticalWrong = criticalWrongQuestions.length > 0;
  const enoughScore = correctCount >= PASS_SCORE;

  let failedReason: string | undefined;

  if (hasCriticalWrong) {
    failedReason = `Trả lời sai Câu mất an toàn giao thông nghiêm trọng, câu ${questions.indexOf(
      criticalWrongQuestions[0],
    ) + 1}`;
  } else if (!enoughScore) {
    failedReason = `Số câu trả lời đúng chưa đạt yêu cầu tối thiểu ${PASS_SCORE} câu.`;
  }

  return {
    correctCount,
    wrongCount,
    unansweredCount,
    criticalWrongQuestions,
    isPassed: enoughScore && !hasCriticalWrong,
    failedReason,
  };
}