import type { Question } from '../types/exam.types'
import type { AnswerKey } from '../types/exam.types'

interface Props {
  questions: Question[]
  answers: Record<number, string>
  currentIndex: number
  isSubmitted: boolean
  onGoTo: (index: number) => void
  onAnswer: (questionId: number, answer: AnswerKey) => void
}

export const QuestionNavigator = ({
  questions,
  answers,
  currentIndex,
  isSubmitted,
  onGoTo,
  onAnswer,
}: Props) => {
  return (
    <div className="exam-navigator">
      <div className="exam-navigator-grid">
        {questions.map((question, index) => {
          const questionId = Number(question.id)
          const selectedAnswer = String(answers[questionId] || '').trim()
          const correctAnswer = String(question.correctAnswer || '').trim()

          const isCurrent = currentIndex === index
          const isAnswered = Boolean(selectedAnswer)
          const isCorrect = isAnswered && selectedAnswer === correctAnswer
          const isWrong = isSubmitted && !isCorrect
          const isCriticalWrong = isWrong && question.isCritical

          const answerEntries = Object.entries(question.answers).filter(
            ([, value]) => Boolean(value)
          )

          return (
            <div
              key={questionId}
              className={[
                'exam-navigator-item',
                isCurrent && !isSubmitted
                  ? 'exam-navigator-item--current'
                  : '',
                !isSubmitted && isAnswered
                  ? 'exam-navigator-item--answered'
                  : '',
                isSubmitted && isCorrect
                  ? 'exam-navigator-item--correct'
                  : '',
                isSubmitted && isWrong && !isCriticalWrong
                  ? 'exam-navigator-item--wrong'
                  : '',
                isSubmitted && isCriticalWrong
                  ? 'exam-navigator-item--critical-wrong'
                  : '',
              ].join(' ')}
            >
              <button
                type="button"
                className="exam-navigator-number"
                onClick={() => onGoTo(index)}
              >
                {index + 1}
              </button>

              <div className="exam-navigator-answer-area">
                <div className="exam-navigator-answer-labels">
                  {answerEntries.map((_, answerIndex) => (
                    <span key={answerIndex}>{answerIndex + 1}</span>
                  ))}
                </div>

                <div className="exam-navigator-checks">
                  {answerEntries.map(([key]) => {
                    const answerKey = key as AnswerKey
                    const isSelected = selectedAnswer === answerKey

                    return (
                      <button
                        key={answerKey}
                        type="button"
                        disabled={isSubmitted}
                        className={[
                          'exam-navigator-check',
                          isSelected ? 'exam-navigator-check--selected' : '',
                        ].join(' ')}
                        onClick={() => onAnswer(questionId, answerKey)}
                      >
                        {isSelected ? '✓' : ''}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}