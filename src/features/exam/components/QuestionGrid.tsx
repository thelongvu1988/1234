import type { Question } from '../types/question.type'

interface Props {
  questions: Question[]
  answers: Record<number, string>
  currentIndex: number
  isSubmitted?: boolean
  onGoTo: (index: number) => void
  onAnswer?: (questionId: number, answer: string) => void
}

const answerKeys = ['A', 'B', 'C', 'D'] as const

export const QuestionGrid = ({
  questions,
  answers,
  currentIndex,
  isSubmitted = false,
  onGoTo,
  onAnswer,
}: Props) => {
  return (
    <div className="rounded border border-cyan-500 bg-orange-100 p-2">
      <h3 className="mb-3 text-center font-bold text-blue-700">
        Danh sách câu hỏi
      </h3>

      <div className="grid grid-cols-3 gap-1">
        {questions.map((question, index) => {
          const selectedAnswer = answers[question.id]
          const isCurrent = currentIndex === index
          const isWrong =
            isSubmitted &&
            selectedAnswer &&
            selectedAnswer !== question.correctAnswer

          return (
            <div
              key={question.id}
              className={`border bg-white p-1 text-center ${
                isCurrent ? 'border-blue-700 ring-2 ring-blue-600' : 'border-slate-500'
              }`}
            >
              <button
                type="button"
                onClick={() => onGoTo(index)}
                className="mb-1 w-full text-sm font-bold"
              >
                {index + 1}
              </button>

              <div className="flex justify-center gap-[2px]">
                {answerKeys.map((answerKey) => {
                  const hasAnswer = Boolean(question.answers[answerKey])
                  const checked = selectedAnswer === answerKey

                  return (
                    <button
                      key={answerKey}
                      type="button"
                      disabled={!hasAnswer || isSubmitted}
                      title={answerKey}
                      onClick={() => {
                        onGoTo(index)

                        if (hasAnswer && onAnswer) {
                          onAnswer(question.id, answerKey)
                        }
                      }}
                      className={`h-3 w-3 border text-[8px] leading-none ${
                        !hasAnswer
                          ? 'border-slate-300 bg-slate-100'
                          : isWrong && checked
                            ? 'border-red-600 bg-red-600'
                            : checked
                              ? 'border-blue-700 bg-blue-700'
                              : 'border-slate-500 bg-white'
                      }`}
                    />
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
        <Legend color="bg-white border border-slate-500" text="Chưa làm" />
        <Legend color="bg-blue-700 border border-blue-700" text="Đã chọn" />
        <Legend color="bg-white border-2 border-blue-700" text="Câu hiện tại" />
        <Legend color="bg-red-600 border border-red-600" text="Sai" />
      </div>
    </div>
  )
}

const Legend = ({ color, text }: { color: string; text: string }) => {
  return (
    <div className="flex items-center gap-1">
      <span className={`h-3 w-3 ${color}`} />
      <span>{text}</span>
    </div>
  )
}