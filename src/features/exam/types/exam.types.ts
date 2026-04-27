export type LicenseType =
  | "A1"
  | "A"
  | "B"
  | "B1"
  | "C1"
  | "C"
  | "D";

export type AnswerKey = "A" | "B" | "C" | "D";

export interface Question {
  id: number;

  licenseType: LicenseType | string;
  licenseTypes?: LicenseType[];

  category: string;
  categoryCode?: string;

  questionText: string;

  imageUrl?: string;
  imageUrls?: string[];

  answers: {
    A: string;
    B: string;
    C?: string;
    D?: string;
  };

  correctAnswer: AnswerKey;

  explanation: string;
  memoryTip?: string;

  isCritical: boolean;
  difficulty: number;
}

export interface UserAnswer {
  questionId: number;
  selectedAnswer: AnswerKey;
}