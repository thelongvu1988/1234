import { create } from "zustand";
import { sampleQuestions } from "../../../data/sampleQuestions";
import type {
  AnswerKey,
  LicenseType,
  Question,
  UserAnswer,
} from "../types/exam.types";

type QuizState = {
  licenseType: LicenseType;
  questions: Question[];
  currentIndex: number;
  answers: UserAnswer[];

  setLicenseType: (licenseType: LicenseType) => void;
  startQuiz: () => void;
  answerQuestion: (questionId: string, selectedAnswer: AnswerKey) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (index: number) => void;
  resetQuiz: () => void;
};

export const useQuizStore = create<QuizState>((set, get) => ({
  licenseType: "B",
  questions: [],
  currentIndex: 0,
  answers: [],

  setLicenseType: (licenseType) => set({ licenseType }),

  startQuiz: () => {
    const { licenseType } = get();
    const questions = sampleQuestions.filter((q) => q.licenseType === licenseType);

    set({
      questions,
      currentIndex: 0,
      answers: [],
    });
  },

  answerQuestion: (questionId, selectedAnswer) => {
    const answers = get().answers.filter((a) => a.questionId !== questionId);

    set({
      answers: [...answers, { questionId, selectedAnswer }],
    });
  },

  nextQuestion: () => {
    const { currentIndex, questions } = get();

    if (currentIndex < questions.length - 1) {
      set({ currentIndex: currentIndex + 1 });
    }
  },

  previousQuestion: () => {
    const { currentIndex } = get();

    if (currentIndex > 0) {
      set({ currentIndex: currentIndex - 1 });
    }
  },

  goToQuestion: (index) => {
    const { questions } = get();

    if (index >= 0 && index < questions.length) {
      set({ currentIndex: index });
    }
  },

  resetQuiz: () =>
    set({
      questions: [],
      currentIndex: 0,
      answers: [],
    }),
}));