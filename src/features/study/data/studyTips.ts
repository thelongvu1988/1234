// src/features/study/data/studyTips.ts

import type { Question } from '../../exam/types/exam.types'

export type StudyTipResult = {
  explanation?: string
  memoryTip?: string
}

const questionHints: Record<number, Partial<StudyTipResult>> = {
  1: {
    memoryTip: 'Nhớ: “phần đường xe chạy” là phần dùng cho phương tiện giao thông đi lại.',
  },
  2: {
    memoryTip: 'Làn đường phải có đủ bề rộng cho xe chạy an toàn.',
  },
  4: {
    memoryTip: 'Dải phân cách dùng để chia hai chiều xe chạy hoặc chia phần đường cho từng loại xe.',
  },
  6: {
    memoryTip: 'Người điều khiển phương tiện gồm: xe cơ giới, xe thô sơ và xe máy chuyên dùng.',
  },
  7: {
    memoryTip: 'Người lái xe là người điều khiển xe cơ giới.',
  },
  10: {
    memoryTip: 'Phương tiện giao thông đường bộ gồm cả cơ giới và thô sơ.',
  },
  11: {
    memoryTip: 'Người tham gia giao thông gồm người điều khiển, người được chở, người đi bộ và người dẫn dắt vật nuôi.',
  },
  13: {
    memoryTip: 'Người điều khiển giao thông là CSGT hoặc người được giao nhiệm vụ hướng dẫn giao thông.',
  },
  14: {
    memoryTip: 'Dừng xe là đứng yên tạm thời.',
  },
  15: {
    memoryTip: 'Đỗ xe là đứng yên không giới hạn thời gian.',
  },
  19: {
    memoryTip: 'Rải vật sắc nhọn, đổ chất gây trơn trượt là hành vi bị nghiêm cấm.',
  },
  20: {
    memoryTip: 'Xe không kiểm định hoặc hết niên hạn đều không được tham gia giao thông.',
  },
  21: {
    memoryTip: 'Đua xe chỉ được tổ chức khi có cơ quan có thẩm quyền cấp phép.',
  },
  23: {
    memoryTip: 'Có ma túy khi lái xe: vừa bị phạt tiền vừa bị tước GPLX.',
  },
  24: {
    memoryTip: 'Rượu bia khi tham gia giao thông là nhóm câu phải đặc biệt chú ý.',
  },
  27: {
    memoryTip: 'Không giao xe cho người chưa đủ tuổi, không có GPLX hoặc đã bị trừ hết điểm.',
  },
  33: {
    memoryTip: 'Có 5 nhóm biển báo: cấm, nguy hiểm, hiệu lệnh, chỉ dẫn, biển phụ.',
  },
  36: {
    memoryTip: 'CSGT dang ngang hai tay: phía trước và sau dừng, bên trái và phải được đi.',
  },
  37: {
    memoryTip: 'CSGT giơ tay thẳng đứng: tất cả các hướng phải dừng, trừ xe đã ở trong giao lộ.',
  },
  38: {
    memoryTip: 'Hiệu lệnh của người điều khiển giao thông được ưu tiên hơn đèn và biển báo.',
  },
  39: {
    memoryTip: 'Biển báo tạm thời được ưu tiên hơn biển báo cố định.',
  },
  40: {
    memoryTip: 'Đèn vàng: dừng trước vạch; vàng nhấp nháy thì đi chậm, quan sát và nhường đường.',
  },
  41: {
    memoryTip: 'Tốc độ tối đa: không được vượt quá tốc độ cho phép.',
  },
  43: {
    memoryTip: 'Xe chạy chậm hơn phải đi về bên phải.',
  },
  49: {
    memoryTip: 'Trong đô thị được dùng còi từ 5 giờ đến 22 giờ.',
  },
  54: {
    memoryTip: 'Cấm quay đầu ở cầu, gầm cầu, đường sắt, đường hẹp, đường dốc, đường cong khuất tầm nhìn, cao tốc, hầm, đường một chiều.',
  },
  56: {
    memoryTip: 'Chuyển hướng: quan sát, giảm tốc, bật tín hiệu, chuyển dần sang làn gần hướng rẽ.',
  },
  57: {
    memoryTip: 'Chuyển làn phải bật tín hiệu trước khi chuyển làn.',
  },
  58: {
    memoryTip: 'Không lùi xe ở đường một chiều, nơi giao nhau, đường sắt, hầm, cao tốc, nơi khuất tầm nhìn.',
  },
  60: {
    memoryTip: 'Dừng đỗ sát lề đường: bánh xe gần nhất không cách lề quá 0,25 m.',
  },
  61: {
    memoryTip: 'Đường phố hẹp: đỗ xe cách xe đỗ ngược chiều tối thiểu 20 m.',
  },
  80: {
    memoryTip: 'Từ 22 giờ đến 5 giờ trong đô thị, khi vượt xe chỉ báo hiệu bằng đèn.',
  },
  88: {
    memoryTip: 'Tránh xe ngược chiều: xe gần chỗ tránh vào trước, xe xuống dốc nhường xe lên dốc.',
  },
  89: {
    memoryTip: 'Xe xuống dốc phải nhường xe lên dốc.',
  },
  91: {
    memoryTip: 'Đường không ưu tiên hoặc đường nhánh phải nhường cho xe trên đường ưu tiên, đường chính.',
  },
  92: {
    memoryTip: 'Có vòng xuyến: nhường xe đi từ bên trái.',
  },
  93: {
    memoryTip: 'Không có vòng xuyến: nhường xe đi từ bên phải.',
  },
  99: {
    memoryTip: 'Qua đường sắt không gác chắn: dừng, quan sát hai phía, an toàn mới đi.',
  },
  102: {
    memoryTip: 'Đường sắt có hiệu lệnh, đèn đỏ, chuông kêu hoặc chắn đang đóng: phải dừng lại.',
  },
  103: {
    memoryTip: 'Trong hầm: bật đèn chiếu gần, không dừng đỗ, không quay đầu, không lùi xe.',
  },
  113: {
    memoryTip: 'Trên cao tốc: không dừng đỗ trên phần đường xe chạy, không lùi, không quay đầu.',
  },
  114: {
    memoryTip: 'Xe hỏng trên cao tốc: vào làn khẩn cấp, bật đèn khẩn cấp, đặt cảnh báo phía sau tối thiểu 150 m.',
  },
  115: {
    memoryTip: 'Lỡ lối ra cao tốc thì đi tiếp đến lối ra tiếp theo, không lùi hoặc quay đầu.',
  },
  116: {
    memoryTip: 'Không chạy vào làn dừng khẩn cấp khi ùn tắc, trừ xe ưu tiên.',
  },
  117: {
    memoryTip: 'Nhập cao tốc: bật tín hiệu, nhường xe đang chạy trên đường cao tốc, dùng làn tăng tốc nếu có.',
  },
  118: {
    memoryTip: 'Hạng C1: đủ 18 tuổi.',
  },
  119: {
    memoryTip: 'Hạng A1 và B: đủ 18 tuổi.',
  },
  120: {
    memoryTip: 'Xe khách trên 29 chỗ hoặc xe giường nằm: đủ 27 tuổi.',
  },
  121: {
    memoryTip: 'Tuổi tối đa lái xe khách lớn: nam 57 tuổi, nữ 55 tuổi.',
  },
  122: {
    memoryTip: 'Xe khách 16 đến 29 chỗ: đủ 24 tuổi.',
  },
  123: {
    memoryTip: 'Từ đủ 16 đến dưới 18 tuổi chỉ được lái xe gắn máy.',
  },
  124: {
    memoryTip: 'GPLX A1 không được điều khiển mô tô ba bánh.',
  },
  125: {
    memoryTip: 'A1 sau 01/01/2025: mô tô hai bánh đến 125 cm3 hoặc động cơ điện đến 11 kW.',
  },
  127: {
    memoryTip: 'Hạng B: ô tô đến 8 chỗ và xe tải/chuyên dùng đến 3.500 kg.',
  },
}

const strongKeywordTips: {
  keywords: string[]
  tip: string
}[] = [
  {
    keywords: ['rượu', 'bia', 'nồng độ cồn'],
    tip: 'Mẹo: gặp rượu bia hoặc nồng độ cồn khi lái xe thì chọn hướng bị cấm hoặc bị xử phạt.',
  },
  {
    keywords: ['ma túy', 'chất kích thích'],
    tip: 'Mẹo: có ma túy hoặc chất kích thích khi lái xe là hành vi bị nghiêm cấm.',
  },
  {
    keywords: ['lạng lách', 'đánh võng', 'rú ga'],
    tip: 'Mẹo: lạng lách, đánh võng, rú ga liên tục là hành vi bị nghiêm cấm.',
  },
  {
    keywords: ['đường cao tốc', 'lùi xe', 'quay đầu'],
    tip: 'Mẹo: trên đường cao tốc không được lùi xe, quay đầu xe.',
  },
  {
    keywords: ['vòng xuyến', 'bên trái'],
    tip: 'Mẹo: nơi có vòng xuyến thì nhường đường cho xe đến từ bên trái.',
  },
  {
    keywords: ['không có báo hiệu đi theo vòng xuyến', 'bên phải'],
    tip: 'Mẹo: giao nhau không có vòng xuyến thì nhường đường cho xe đến từ bên phải.',
  },
  {
    keywords: ['xuống dốc', 'lên dốc'],
    tip: 'Mẹo: xe xuống dốc phải nhường đường cho xe lên dốc.',
  },
  {
    keywords: ['khoảng cách an toàn'],
    tip: 'Mẹo: tốc độ càng cao thì khoảng cách an toàn càng lớn.',
  },
  {
    keywords: ['5 giờ', '22 giờ', 'còi'],
    tip: 'Mẹo: trong đô thị chỉ dùng còi từ 5 giờ đến 22 giờ.',
  },
]

const normalizeText = (value: string) => {
  return value.toLowerCase()
}

const getAnswerText = (question: Question) => {
  const answerKey = question.correctAnswer as keyof typeof question.answers
  return question.answers[answerKey]?.trim() || ''
}

const getStrongKeywordTip = (question: Question) => {
  const text = normalizeText(
    [
      question.questionText,
      question.explanation,
      question.answers.A,
      question.answers.B,
      question.answers.C,
      question.answers.D,
    ]
      .filter(Boolean)
      .join(' ')
  )

  const matched = strongKeywordTips.find((item) =>
    item.keywords.every((keyword) => text.includes(keyword))
  )

  return matched?.tip
}

const shouldCreateExplanationFromAnswer = (question: Question) => {
  const text = normalizeText(question.questionText)

  return (
    text.includes('được hiểu như thế nào') ||
    text.includes('là gì') ||
    text.includes('gồm những') ||
    text.includes('bao nhiêu') ||
    text.includes('loại nào') ||
    text.includes('như thế nào là đúng')
  )
}

export const getStudyTipForQuestion = (
  question: Question
): StudyTipResult => {
  const customHint = questionHints[Number(question.id)]

  const rawExplanation = question.explanation?.trim()
  const rawMemoryTip = question.memoryTip?.trim()

  const correctAnswerText = getAnswerText(question)

  const explanation =
    customHint?.explanation ||
    rawExplanation ||
    (shouldCreateExplanationFromAnswer(question) && correctAnswerText
      ? `Đáp án đúng là: ${correctAnswerText}`
      : undefined)

  const memoryTip =
    customHint?.memoryTip ||
    rawMemoryTip ||
    getStrongKeywordTip(question)

  return {
    explanation,
    memoryTip,
  }
}