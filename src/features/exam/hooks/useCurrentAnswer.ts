import { useMemo } from "react";
import type { Question, UserAnswer } from "../types/exam.types";

export function useCurrentAnswer(question: Question | undefined, answers: UserAnswer[]) {
  return useMemo(() => {
    if (!question) return undefined;

    return answers.find((answer) => answer.questionId === question.id)?.selectedAnswer;
  }, [answers, question]);
}