export type LicenseType = 'A1' | 'A' | 'B1' | 'B' | 'C1' | 'C' | 'D'

export interface ExamConfig {
  licenseType: LicenseType
  totalQuestions: number
  durationMinutes: number
  passScore: number
  allowCriticalWrong: boolean
  criticalFailRule: boolean
}

export const examConfigs: Record<LicenseType, ExamConfig> = {
  A1: {
    licenseType: 'A1',
    totalQuestions: 25,
    durationMinutes: 19,
    passScore: 21,
    allowCriticalWrong: false,
    criticalFailRule: true,
  },
  A: {
    licenseType: 'A',
    totalQuestions: 25,
    durationMinutes: 19,
    passScore: 23,
    allowCriticalWrong: false,
    criticalFailRule: true,
  },
  B1: {
    licenseType: 'B1',
    totalQuestions: 25,
    durationMinutes: 19,
    passScore: 23,
    allowCriticalWrong: false,
    criticalFailRule: true,
  },
  B: {
    licenseType: 'B',
    totalQuestions: 30,
    durationMinutes: 20,
    passScore: 27,
    allowCriticalWrong: false,
    criticalFailRule: true,
  },
  C1: {
    licenseType: 'C1',
    totalQuestions: 35,
    durationMinutes: 22,
    passScore: 32,
    allowCriticalWrong: false,
    criticalFailRule: true,
  },
  C: {
    licenseType: 'C',
    totalQuestions: 40,
    durationMinutes: 24,
    passScore: 36,
    allowCriticalWrong: false,
    criticalFailRule: true,
  },
  D: {
    licenseType: 'D',
    totalQuestions: 45,
    durationMinutes: 26,
    passScore: 41,
    allowCriticalWrong: false,
    criticalFailRule: true,
  },
}

export const getExamConfig = (licenseType: LicenseType): ExamConfig => {
  return examConfigs[licenseType]
}