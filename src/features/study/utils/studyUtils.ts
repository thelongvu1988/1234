// src/features/study/utils/studyUtils.ts

import type { Question } from '../../exam/types/exam.types'

export const filterByLicense = (
  questions: Question[],
  license: string
): Question[] => {
  return questions.filter((question) => {
    return (
      question.licenseType === license ||
      question.licenseTypes?.includes(license as any)
    )
  })
}