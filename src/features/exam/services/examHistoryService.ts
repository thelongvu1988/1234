import type { Question, UserAnswer } from "../types/exam.types";
import { calculateResult } from "../utils/calculateResult";

const STORAGE_KEY = "lai_xe_exam_history";

export type ExamHistoryItem = {
  id: string;
  name: string;
  phone: string;
  licenseType: string;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  isPassed: boolean;
  failedReason?: string;
  answers: UserAnswer[];
  createdAt: string;
};

export type SaveExamHistoryInput = {
  name: string;
  phone: string;
  licenseType: string;
  questions: Question[];
  answers: UserAnswer[];
};

export function saveExamHistory(input: SaveExamHistoryInput): ExamHistoryItem {
  const result = calculateResult(input.questions, input.answers);

  const item: ExamHistoryItem = {
    id: crypto.randomUUID(),
    name: input.name,
    phone: input.phone,
    licenseType: input.licenseType,
    correctCount: result.correctCount,
    wrongCount: result.wrongCount,
    unansweredCount: result.unansweredCount,
    isPassed: result.isPassed,
    failedReason: result.failedReason,
    answers: input.answers,
    createdAt: new Date().toISOString(),
  };

  const current = getExamHistory();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([item, ...current]));

  return item;
}

export function getExamHistory(): ExamHistoryItem[] {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return [];

  try {
    return JSON.parse(raw) as ExamHistoryItem[];
  } catch {
    return [];
  }
}