export type LicenseType = "A1" | "A" | "B" | "C1" | "C";

export type AnswerKey = "A" | "B" | "C" | "D";

export type Question = {
  id: string;
  licenseType: LicenseType;
  category: string;
  questionText: string;
  imageUrl?: string;
  answers: Partial<Record<AnswerKey, string>>;
  correctAnswer: AnswerKey;
  explanation: string;
  memoryTip?: string;
  isCritical: boolean;
};

export type UserAnswer = {
  questionId: string;
  selectedAnswer: AnswerKey;
};