import type { Question } from '../types/question.type'

interface Props {
  question: Question
  index: number
  selectedAnswer?: string
  isSubmitted: boolean
  onAnswer: (questionId: number, answer: string) => void
}

const answerLabels = ['A', 'B', 'C', 'D'] as const

const normalizeImageUrl = (url: string): string => {
  if (!url) return ''

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  if (url.startsWith('/')) {
    return url
  }

  return `/${url}`
}

const getQuestionImages = (question: Question): string[] => {
  const urls: string[] = []

  if (Array.isArray(question.imageUrls)) {
    question.imageUrls.forEach((url) => {
      if (url) urls.push(normalizeImageUrl(url))
    })
  }

  if (question.imageUrl) {
    urls.push(normalizeImageUrl(question.imageUrl))
  }

  return Array.from(new Set(urls))
}

export const QuestionCard = ({
  question,
  index,
  selectedAnswer,
  isSubmitted,
  onAnswer,
}: Props) => {
  const imageUrls = getQuestionImages(question)

  return (
    <div className="rounded-2xl bg-white p-5 shadow">
      <div className="mb-4 flex items-start justify-between gap-3">
        <h2 className="text-lg font-bold text-slate-900">
          Câu {index + 1}. {question.questionText}
        </h2>

        {question.isCritical && (
          <span className="shrink-0 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
            Điểm liệt
          </span>
        )}
      </div>

      {imageUrls.length > 0 && (
        <div className="mb-4 space-y-3">
          {imageUrls.map((imageUrl, imageIndex) => (
            <div
              key={`${question.id}-${imageUrl}-${imageIndex}`}
              className="overflow-hidden rounded-xl border bg-slate-50 p-3"
            >
              <img
                src={imageUrl}
                alt={`Hình minh họa câu ${question.id}`}
                className="mx-auto max-h-80 max-w-full object-contain"
                onError={(event) => {
                  console.error('Ảnh lỗi:', imageUrl)
                  event.currentTarget.style.display = 'none'
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="space-y-3">
        {answerLabels.map((label) => {
          const text = question.answers[label]
          if (!text) return null

          const isSelected = selectedAnswer === label
          const isCorrect = question.correctAnswer === label
          const showCorrect = isSubmitted && isCorrect
          const showWrong = isSubmitted && isSelected && !isCorrect

          return (
            <button
              key={label}
              type="button"
              disabled={isSubmitted}
              onClick={() => onAnswer(question.id, label)}
              className={`w-full rounded-xl border p-4 text-left transition ${
                showCorrect
                  ? 'border-green-600 bg-green-50'
                  : showWrong
                    ? 'border-red-600 bg-red-50'
                    : isSelected
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex gap-3">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    showCorrect
                      ? 'bg-green-600 text-white'
                      : showWrong
                        ? 'bg-red-600 text-white'
                        : isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {label}
                </span>

                <span className="font-medium text-slate-800">{text}</span>
              </div>
            </button>
          )
        })}
      </div>

      {isSubmitted && question.explanation && (
        <div className="mt-4 rounded-xl bg-yellow-50 p-4 text-sm text-yellow-900">
          <b>Giải thích:</b> {question.explanation}
        </div>
      )}
    </div>
  )
}