// src/features/study/components/StudyQuestionNavigator.tsx

import type { Question } from '../../exam/types/exam.types'

interface Props {
  questions: Question[]
  currentIndex: number
  learnedIds: number[]
  favoriteIds: number[]
  wrongMap: Record<number, number>
  onSelect: (index: number) => void
}

export const StudyQuestionNavigator = ({
  questions,
  currentIndex,
  learnedIds,
  favoriteIds,
  wrongMap,
  onSelect,
}: Props) => {
  return (
    <div className="study-navigator">
      <div className="study-navigator-title">Danh sách câu hỏi</div>

      <div className="study-navigator-grid">
        {questions.map((question, index) => {
          const isCurrent = index === currentIndex
          const isLearned = learnedIds.includes(question.id)
          const isFavorite = favoriteIds.includes(question.id)
          const wrongCount = wrongMap[question.id] || 0

          let className = 'study-nav-item'

          if (question.isCritical) className += ' study-nav-item--critical'
          if (isLearned) className += ' study-nav-item--learned'
          if (wrongCount > 0) className += ' study-nav-item--wrong'
          if (isCurrent) className += ' study-nav-item--current'

          return (
            <button
              key={question.id}
              type="button"
              className={className}
              onClick={() => onSelect(index)}
              title={`Câu ${index + 1}`}
            >
              <span>{index + 1}</span>
              {isFavorite && <small>★</small>}
            </button>
          )
        })}
      </div>

      <div className="study-navigator-legend">
        <div>
          <span className="legend-box legend-current" />
          Đang học
        </div>

        <div>
          <span className="legend-box legend-learned" />
          Đã học
        </div>

        <div>
          <span className="legend-box legend-critical" />
          Điểm liệt
        </div>

        <div>
          <span className="legend-box legend-wrong" />
          Hay sai
        </div>
      </div>
    </div>
  )
}