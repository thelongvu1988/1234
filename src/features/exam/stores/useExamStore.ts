import { create } from 'zustand'
import type { Question } from '../types/exam.types'
import type { LicenseType } from '../config/examConfigs'
import { getExamConfig } from '../config/examConfigs'
import { getQuestionsByLicense } from '../data/questions'
import { generateExam } from '../utils/examGenerator'
import { calculateExamResult } from '../utils/examUtils'
import type { ExamResult } from '../utils/examUtils'
import { useCandidateStore } from './useCandidateStore'
import { submitExamResult } from '../../lead/services/leadService'

const EXAM_STORAGE_KEY = 'gplx_exam_progress_v1'
const EXAM_TIMER_DEADLINE_KEY = 'gplx_exam_timer_deadline_v1'
const EXAM_HISTORY_KEY = 'gplx_exam_history_v1'

interface SavedExamProgress {
  licenseType: LicenseType
  questions: Question[]
  currentIndex: number
  answers: Record<number, string>
  isSubmitted: boolean
  result: ExamResult | null
  savedAt: string
}

interface SavedExamHistory {
  id: string
  candidateFullName: string
  candidatePhone: string
  registrationNumber?: string
  licenseType: LicenseType
  result: ExamResult
  answers: Record<number, string>
  questionIds: number[]
  submittedAt: string
}

interface ExamState {
  licenseType: LicenseType
  questions: Question[]
  currentIndex: number
  answers: Record<number, string>
  result: ExamResult | null
  isSubmitted: boolean

  setLicenseType: (type: LicenseType) => void
  startExam: (examNumber?: number) => boolean
  restoreExam: () => boolean
  clearSavedExam: () => void
  next: () => void
  prev: () => void
  goTo: (index: number) => void
  answer: (questionId: number, answer: string) => void
  submitExam: () => void
  resetExam: () => void
}

const saveExamProgress = (state: SavedExamProgress) => {
  localStorage.setItem(EXAM_STORAGE_KEY, JSON.stringify(state))
}

const loadExamProgress = (): SavedExamProgress | null => {
  try {
    const raw = localStorage.getItem(EXAM_STORAGE_KEY)
    if (!raw) return null

    return JSON.parse(raw) as SavedExamProgress
  } catch (error) {
    console.error('Không thể load bài thi đã lưu:', error)
    localStorage.removeItem(EXAM_STORAGE_KEY)
    return null
  }
}

const removeExamProgress = () => {
  localStorage.removeItem(EXAM_STORAGE_KEY)
}

const removeExamTimer = () => {
  localStorage.removeItem(EXAM_TIMER_DEADLINE_KEY)
}

const loadExamHistory = (): SavedExamHistory[] => {
  try {
    const raw = localStorage.getItem(EXAM_HISTORY_KEY)
    if (!raw) return []

    return JSON.parse(raw) as SavedExamHistory[]
  } catch (error) {
    console.error('Không thể load lịch sử thi:', error)
    localStorage.removeItem(EXAM_HISTORY_KEY)
    return []
  }
}

const saveExamHistory = (historyItem: SavedExamHistory) => {
  const currentHistory = loadExamHistory()

  localStorage.setItem(
    EXAM_HISTORY_KEY,
    JSON.stringify([historyItem, ...currentHistory])
  )
}

const persistCurrentExam = () => {
  const {
    licenseType,
    questions,
    currentIndex,
    answers,
    isSubmitted,
    result,
  } = useExamStore.getState()

  if (!questions.length) return

  saveExamProgress({
    licenseType,
    questions,
    currentIndex,
    answers,
    isSubmitted,
    result,
    savedAt: new Date().toISOString(),
  })
}

export const useExamStore = create<ExamState>((set, get) => ({
  licenseType: 'B',
  questions: [],
  currentIndex: 0,
  answers: {},
  result: null,
  isSubmitted: false,

  setLicenseType: (type) => {
    set({
      licenseType: type,
      questions: [],
      currentIndex: 0,
      answers: {},
      result: null,
      isSubmitted: false,
    })

    removeExamProgress()
    removeExamTimer()
  },

  startExam: (examNumber) => {
    const { licenseType } = get()
    const config = getExamConfig(licenseType)
    const questionPool = getQuestionsByLicense(licenseType)

    removeExamTimer()

    if (!questionPool.length) {
      console.error(`Không có dữ liệu câu hỏi cho hạng ${licenseType}.`)

      set({
        questions: [],
        currentIndex: 0,
        answers: {},
        result: null,
        isSubmitted: false,
      })

      removeExamProgress()
      return false
    }

    try {
      const examQuestions = generateExam(questionPool, config, examNumber)

      if (!examQuestions.length) {
        throw new Error(`Không tạo được đề thi cho hạng ${licenseType}.`)
      }

      set({
        questions: examQuestions,
        currentIndex: 0,
        answers: {},
        result: null,
        isSubmitted: false,
      })

      persistCurrentExam()
      return true
    } catch (error) {
      console.error(error)

      set({
        questions: [],
        currentIndex: 0,
        answers: {},
        result: null,
        isSubmitted: false,
      })

      removeExamProgress()
      removeExamTimer()
      return false
    }
  },

  restoreExam: () => {
    const saved = loadExamProgress()

    if (!saved || !saved.questions.length) {
      return false
    }

    set({
      licenseType: saved.licenseType,
      questions: saved.questions,
      currentIndex: saved.currentIndex,
      answers: saved.answers,
      result: saved.result,
      isSubmitted: saved.isSubmitted,
    })

    return true
  },

  clearSavedExam: () => {
    removeExamProgress()
    removeExamTimer()
  },

  next: () => {
    const { currentIndex, questions } = get()

    set({
      currentIndex: Math.min(currentIndex + 1, questions.length - 1),
    })

    persistCurrentExam()
  },

  prev: () => {
    const { currentIndex } = get()

    set({
      currentIndex: Math.max(currentIndex - 1, 0),
    })

    persistCurrentExam()
  },

  goTo: (index) => {
    const { questions } = get()

    if (index < 0 || index >= questions.length) return

    set({ currentIndex: index })

    persistCurrentExam()
  },

  answer: (questionId, selectedAnswer) => {
    const { answers, isSubmitted } = get()

    if (isSubmitted) return

    const normalizedQuestionId = Number(questionId)

    set({
      answers: {
        ...answers,
        [normalizedQuestionId]: selectedAnswer,
      },
    })

    persistCurrentExam()
  },

  submitExam: () => {
    const { licenseType, questions, answers } = get()
    const config = getExamConfig(licenseType)
    const result = calculateExamResult(questions, answers, config)
    const candidate = useCandidateStore.getState().candidate
    const submittedAt = new Date().toISOString()
    const questionIds = questions.map((question) => Number(question.id))

    set({
      result,
      isSubmitted: true,
    })

    removeExamTimer()
    persistCurrentExam()

    saveExamHistory({
      id: `${licenseType}-${submittedAt}`,
      candidateFullName: candidate?.fullName || 'Chưa nhập',
      candidatePhone: candidate?.phone || '',
      registrationNumber: candidate?.registrationNumber,
      licenseType,
      result,
      answers,
      questionIds,
      submittedAt,
    })

    void submitExamResult({
      fullName: candidate?.fullName || 'Chưa nhập',
      phone: candidate?.phone || '',
      registrationNumber: candidate?.registrationNumber,
      licenseType,
      totalQuestions: result.totalQuestions,
      correct: result.correct,
      wrong: result.wrong,
      unanswered: result.unanswered,
      passed: result.passed,
      passScore: result.passScore,
      criticalWrong: result.criticalWrong,
      questionIds,
      answers,
      submittedAt,
      source: window.location.href,
    }).catch((error) => {
      console.error('Không thể gửi kết quả thi về Google Sheet:', error)
    })
  },

  resetExam: () => {
    set({
      questions: [],
      currentIndex: 0,
      answers: {},
      result: null,
      isSubmitted: false,
    })

    removeExamProgress()
    removeExamTimer()
  },
}))