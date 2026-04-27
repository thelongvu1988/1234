import type { AnswerKey } from "../types/exam.types";

export const answerNumberMap: Record<AnswerKey, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
};

export function getAnswerKeyByNumber(number: number): AnswerKey {
  const map: Record<number, AnswerKey> = {
    1: "A",
    2: "B",
    3: "C",
    4: "D",
  };

  return map[number];
}