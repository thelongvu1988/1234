import type { Question, UserAnswer } from '../types/exam.types'

type ExamReviewModalProps = {
  open: boolean
  questions: Question[]
  answers: UserAnswer[]
  onClose: () => void
}

export function ExamReviewModal({
  open,
  questions,
  answers,
  onClose,
}: ExamReviewModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between bg-slate-900 px-5 py-4 text-white">
          <div className="text-lg font-black">Xem lại bài thi</div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-2xl font-bold hover:bg-white/20"
          >
            ×
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {questions.map((question, index) => {
            const answer = answers.find(
              (item) => item.questionId === question.id
            )

            const selected = answer?.selectedAnswer
            const isUnanswered = !selected
            const isCorrect = selected === question.correctAnswer

            return (
              <div
                key={question.id}
                className={`rounded-2xl border p-4 ${
                  isUnanswered
                    ? 'border-slate-200 bg-slate-50'
                    : isCorrect
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <strong className="text-slate-900">Câu {index + 1}</strong>

                  {question.isCritical && (
                    <span className="rounded-full bg-red-700 px-3 py-1 text-xs font-bold text-white">
                      Điểm liệt
                    </span>
                  )}

                  {isUnanswered && (
                    <span className="rounded-full bg-slate-500 px-3 py-1 text-xs font-bold text-white">
                      Chưa trả lời
                    </span>
                  )}

                  {!isUnanswered && isCorrect && (
                    <span className="rounded-full bg-green-700 px-3 py-1 text-xs font-bold text-white">
                      Đúng
                    </span>
                  )}

                  {!isUnanswered && !isCorrect && (
                    <span className="rounded-full bg-red-700 px-3 py-1 text-xs font-bold text-white">
                      Sai
                    </span>
                  )}
                </div>

                <div className="mb-4 font-bold text-slate-900">
                  {question.questionText}
                </div>

                <div className="space-y-2">
                  {Object.entries(question.answers).map(
                    ([key, value], answerIndex) => {
                      if (!value) return null

                      const isSelected = selected === key
                      const isRightAnswer = question.correctAnswer === key

                      return (
                        <div
                          key={key}
                          className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
                            isRightAnswer
                              ? 'border-green-400 bg-green-100 text-green-900'
                              : isSelected
                                ? 'border-red-400 bg-red-100 text-red-900'
                                : 'border-slate-200 bg-white text-slate-800'
                          }`}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-black text-white">
                            {answerIndex + 1}
                          </span>

                          <span className="flex-1">{value}</span>

                          {isRightAnswer && (
                            <strong className="shrink-0 text-xs">
                              Đáp án đúng
                            </strong>
                          )}

                          {isSelected && !isRightAnswer && (
                            <strong className="shrink-0 text-xs">
                              Bạn chọn
                            </strong>
                          )}
                        </div>
                      )
                    }
                  )}
                </div>

                {question.explanation && (
                  <div className="mt-4 rounded-xl bg-white/70 p-3 text-sm text-slate-700">
                    <strong>Giải thích:</strong> {question.explanation}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="border-t p-5">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-slate-900 px-4 py-3 font-bold text-white"
          >
            Đóng xem lại
          </button>
        </div>
      </div>
    </div>
  )
}