import type { Question } from '../types/exam.types'
import type { ExamConfig } from '../config/examConfigs'

export interface ExamResult {
  totalQuestions: number
  correct: number
  wrong: number
  unanswered: number
  passed: boolean
  passScore: number
  criticalWrong: boolean
}

export const calculateExamResult = (
  questions: Question[],
  answers: Record<number, string>,
  config: ExamConfig
): ExamResult => {
  let correct = 0
  let wrong = 0
  let unanswered = 0
  let criticalWrong = false

  questions.forEach((question) => {
    const userAnswer = answers[question.id]

    if (!userAnswer) {
      unanswered++
      return
    }

    if (userAnswer === question.correctAnswer) {
      correct++
    } else {
      wrong++

      if (question.isCritical) {
        criticalWrong = true
      }
    }
  })

  const passed =
    correct >= config.passScore &&
    (!config.criticalFailRule || !criticalWrong)

  return {
    totalQuestions: questions.length,
    correct,
    wrong,
    unanswered,
    passed,
    passScore: config.passScore,
    criticalWrong,
  }
}