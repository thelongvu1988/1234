import type { Question } from '../types/exam.types'
import type { ExamConfig, LicenseType } from '../config/examConfigs'

type CategoryKey =
  | 'rules'
  | 'culture'
  | 'driving_technique'
  | 'vehicle_structure'
  | 'road_signs'
  | 'situations'

interface ExamStructure {
  totalQuestions: number
  critical: number
  categories: Record<CategoryKey, number>
}

export interface PrebuiltExam {
  id: string
  examNumber: number
  licenseType: LicenseType
  questions: Question[]
}

export const PREBUILT_EXAM_COUNT = 20

const CRITICAL_QUESTION_IDS = [
  19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
  30, 32, 34, 35, 47, 48, 52, 53, 55, 58,
  63, 64, 65, 66, 67, 68, 70, 71, 72, 73,
  74, 85, 86, 87, 88, 89, 90, 91, 92, 93,
  97, 98, 102, 117, 163, 165, 167, 197, 198, 206,
  215, 226, 234, 245, 246, 252, 253, 254, 255, 260,
]

const examStructures: Record<LicenseType, ExamStructure> = {
  A1: {
    totalQuestions: 25,
    critical: 1,
    categories: {
      rules: 8,
      culture: 1,
      driving_technique: 1,
      vehicle_structure: 0,
      road_signs: 8,
      situations: 6,
    },
  },
  A: {
    totalQuestions: 25,
    critical: 1,
    categories: {
      rules: 8,
      culture: 1,
      driving_technique: 1,
      vehicle_structure: 0,
      road_signs: 8,
      situations: 6,
    },
  },
  B1: {
    totalQuestions: 25,
    critical: 1,
    categories: {
      rules: 8,
      culture: 1,
      driving_technique: 1,
      vehicle_structure: 0,
      road_signs: 8,
      situations: 6,
    },
  },
  B: {
    totalQuestions: 30,
    critical: 1,
    categories: {
      rules: 8,
      culture: 1,
      driving_technique: 1,
      vehicle_structure: 1,
      road_signs: 9,
      situations: 9,
    },
  },
  C1: {
    totalQuestions: 35,
    critical: 1,
    categories: {
      rules: 10,
      culture: 1,
      driving_technique: 2,
      vehicle_structure: 1,
      road_signs: 10,
      situations: 10,
    },
  },
  C: {
    totalQuestions: 40,
    critical: 1,
    categories: {
      rules: 10,
      culture: 1,
      driving_technique: 2,
      vehicle_structure: 1,
      road_signs: 14,
      situations: 11,
    },
  },
  D: {
    totalQuestions: 45,
    critical: 1,
    categories: {
      rules: 10,
      culture: 1,
      driving_technique: 2,
      vehicle_structure: 1,
      road_signs: 16,
      situations: 14,
    },
  },
}

const getQuestionId = (question: Question): number => {
  return Number(question.id)
}

const isCriticalQuestion = (question: Question): boolean => {
  return (
    Boolean(question.isCritical) ||
    CRITICAL_QUESTION_IDS.includes(getQuestionId(question))
  )
}

const getCategoryKeyByQuestionId = (questionId: number): CategoryKey => {
  if (questionId >= 1 && questionId <= 180) return 'rules'
  if (questionId >= 181 && questionId <= 205) return 'culture'
  if (questionId >= 206 && questionId <= 263) return 'driving_technique'
  if (questionId >= 264 && questionId <= 300) return 'vehicle_structure'
  if (questionId >= 301 && questionId <= 485) return 'road_signs'

  return 'situations'
}

const getCategoryKey = (question: Question): CategoryKey => {
  return getCategoryKeyByQuestionId(getQuestionId(question))
}

const createSeed = (text: string): number => {
  let seed = 0

  for (let index = 0; index < text.length; index += 1) {
    seed = (seed * 31 + text.charCodeAt(index)) >>> 0
  }

  return seed || 1
}

const createRandom = (seedText: string) => {
  let seed = createSeed(seedText)

  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0
    return seed / 4294967296
  }
}

const shuffleWithSeed = <T,>(items: T[], seedText: string): T[] => {
  const random = createRandom(seedText)
  const result = [...items]

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    const temp = result[index]

    result[index] = result[swapIndex]
    result[swapIndex] = temp
  }

  return result
}

const takeBySeed = (
  items: Question[],
  count: number,
  seedText: string
): Question[] => {
  return shuffleWithSeed(items, seedText).slice(0, count)
}

const uniqueQuestions = (questions: Question[]): Question[] => {
  const map = new Map<number, Question>()

  questions.forEach((question) => {
    map.set(getQuestionId(question), question)
  })

  return Array.from(map.values())
}

const pickCriticalQuestion = (
  pool: Question[],
  selectedIds: Set<number>,
  seedText: string
): Question[] => {
  const criticalPool = pool.filter((question) => {
    const questionId = getQuestionId(question)

    return isCriticalQuestion(question) && !selectedIds.has(questionId)
  })

  const picked = takeBySeed(criticalPool, 1, `${seedText}-critical`)

  picked.forEach((question) => {
    selectedIds.add(getQuestionId(question))
  })

  return picked
}

const pickByCategory = (
  pool: Question[],
  categoryKey: CategoryKey,
  count: number,
  selectedIds: Set<number>,
  seedText: string
): Question[] => {
  if (count <= 0) return []

  const categoryPool = pool.filter((question) => {
    const questionId = getQuestionId(question)

    if (selectedIds.has(questionId)) return false

    return getCategoryKey(question) === categoryKey
  })

  const picked = takeBySeed(categoryPool, count, `${seedText}-${categoryKey}`)

  picked.forEach((question) => {
    selectedIds.add(getQuestionId(question))
  })

  return picked
}

const validateGeneratedExam = (
  selected: Question[],
  config: ExamConfig,
  structure: ExamStructure
): void => {
  if (selected.length !== structure.totalQuestions) {
    throw new Error(
      `Không đủ câu hỏi để tạo đề ${config.licenseType}. Cần ${structure.totalQuestions}, hiện có ${selected.length}.`
    )
  }

  const criticalCount = selected.filter(isCriticalQuestion).length

  if (criticalCount !== structure.critical) {
    throw new Error(
      `Đề ${config.licenseType} phải có ${structure.critical} câu điểm liệt, hiện có ${criticalCount}.`
    )
  }
}

const generateOneExam = (
  questionPool: Question[],
  config: ExamConfig,
  examNumber: number
): Question[] => {
  const structure = examStructures[config.licenseType]

  if (!structure) {
    throw new Error(`Chưa có cấu trúc đề cho hạng ${config.licenseType}.`)
  }

  if (!questionPool.length) {
    throw new Error(`Không có dữ liệu câu hỏi cho hạng ${config.licenseType}.`)
  }

  const seedText = `${config.licenseType}-${examNumber}`
  const selectedIds = new Set<number>()

  const selectedCritical = pickCriticalQuestion(
    questionPool,
    selectedIds,
    seedText
  )

  if (selectedCritical.length !== structure.critical) {
    throw new Error(
      `Không đủ câu điểm liệt để tạo đề ${config.licenseType}. Cần ${structure.critical}, hiện có ${selectedCritical.length}.`
    )
  }

  const normalPool = questionPool.filter((question) => {
    return !isCriticalQuestion(question)
  })

  const selectedByCategory: Question[] = []

  Object.entries(structure.categories).forEach(([categoryKey, count]) => {
    selectedByCategory.push(
      ...pickByCategory(
        normalPool,
        categoryKey as CategoryKey,
        count,
        selectedIds,
        seedText
      )
    )
  })

  const selected = uniqueQuestions([...selectedCritical, ...selectedByCategory])

  validateGeneratedExam(selected, config, structure)

  return shuffleWithSeed(selected, `${seedText}-final`)
}

export const generatePrebuiltExams = (
  questionPool: Question[],
  config: ExamConfig,
  examCount = PREBUILT_EXAM_COUNT
): PrebuiltExam[] => {
  const exams: PrebuiltExam[] = []

  for (let index = 0; index < examCount; index += 1) {
    const examNumber = index + 1
    const questions = generateOneExam(questionPool, config, examNumber)

    exams.push({
      id: `${config.licenseType}-${String(examNumber).padStart(2, '0')}`,
      examNumber,
      licenseType: config.licenseType,
      questions,
    })
  }

  return exams
}

export const pickPrebuiltExam = (
  prebuiltExams: PrebuiltExam[],
  examNumber?: number
): PrebuiltExam => {
  if (!prebuiltExams.length) {
    throw new Error('Không có bộ đề dựng sẵn để chọn.')
  }

  if (examNumber) {
    const fixedExam = prebuiltExams.find((exam) => exam.examNumber === examNumber)

    if (fixedExam) {
      return fixedExam
    }
  }

  const index = Math.floor(Math.random() * prebuiltExams.length)

  return prebuiltExams[index]
}

export const generateExam = (
  questionPool: Question[],
  config: ExamConfig,
  examNumber?: number
): Question[] => {
  const prebuiltExams = generatePrebuiltExams(
    questionPool,
    config,
    PREBUILT_EXAM_COUNT
  )

  const selectedExam = pickPrebuiltExam(prebuiltExams, examNumber)

  return selectedExam.questions
}