export interface LeadPayload {
  fullName: string
  phone: string
  course: string
  note: string
  source: string
}

export interface ExamResultPayload {
  fullName: string
  phone: string
  registrationNumber?: string
  licenseType: string
  totalQuestions: number
  correct: number
  wrong: number
  unanswered: number
  passed: boolean
  passScore: number
  criticalWrong: boolean
  questionIds: number[]
  answers: Record<number, string>
  submittedAt: string
  source: string
}

export interface StudyProgressPayload {
  fullName: string
  phone: string
  licenseType: string
  totalQuestions: number
  learnedCount: number
  progressPercent: number
  currentQuestionId: number
  learnedIds: number[]
  favoriteIds: number[]
  wrongMap: Record<number, number>
  updatedAt: string
  source: string
}

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxh7Y0Tl0uU7pvm1v0JatRvDHNRrFYq65HqCa9KjETBO5zEuKmlOlCMy0l9qF0PqR3v5Q/exec'

export const submitLead = async (payload: LeadPayload) => {
  const formData = new FormData()

  formData.append('Loại dữ liệu', 'Đăng ký tư vấn')
  formData.append('Họ và Tên', payload.fullName)
  formData.append('Số Điện Thoại', payload.phone)
  formData.append('Bằng Lái Đăng Ký', payload.course)
  formData.append('Ghi Chú', payload.note)
  formData.append('Nguồn', payload.source)
  formData.append('Thời gian gửi', new Date().toISOString())

  await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    body: formData,
  })
}

export const submitExamResult = async (payload: ExamResultPayload) => {
  const formData = new FormData()

  formData.append('Loại dữ liệu', 'Kết quả thi thử')
  formData.append('Họ và Tên', payload.fullName)
  formData.append('Số Điện Thoại', payload.phone)
  formData.append('Mã hồ sơ', payload.registrationNumber || '')
  formData.append('Hạng GPLX', payload.licenseType)
  formData.append('Tổng số câu', String(payload.totalQuestions))
  formData.append('Số câu đúng', String(payload.correct))
  formData.append('Số câu sai', String(payload.wrong))
  formData.append('Số câu chưa trả lời', String(payload.unanswered))
  formData.append('Điểm đạt yêu cầu', String(payload.passScore))
  formData.append('Sai câu điểm liệt', payload.criticalWrong ? 'Có' : 'Không')
  formData.append('Kết quả', payload.passed ? 'Đạt' : 'Không đạt')
  formData.append('Danh sách ID câu hỏi', payload.questionIds.join(', '))
  formData.append('Đáp án đã chọn', JSON.stringify(payload.answers))
  formData.append('Nguồn', payload.source)
  formData.append('Thời gian nộp bài', payload.submittedAt)

  await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    body: formData,
  })
}

export const submitStudyProgress = async (payload: StudyProgressPayload) => {
  const formData = new FormData()

  formData.append('Loại dữ liệu', 'Tiến trình học')
  formData.append('Họ và Tên', payload.fullName)
  formData.append('Số Điện Thoại', payload.phone)
  formData.append('Hạng GPLX', payload.licenseType)
  formData.append('Tổng số câu', String(payload.totalQuestions))
  formData.append('Số câu đã học', String(payload.learnedCount))
  formData.append('Tỷ lệ học', `${payload.progressPercent}%`)
  formData.append('Câu hiện tại', String(payload.currentQuestionId))
  formData.append('Danh sách câu đã học', payload.learnedIds.join(', '))
  formData.append('Câu yêu thích', payload.favoriteIds.join(', '))
  formData.append('Câu hay sai', JSON.stringify(payload.wrongMap))
  formData.append('Nguồn', payload.source)
  formData.append('Thời gian cập nhật', payload.updatedAt)

  await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    body: formData,
  })
}