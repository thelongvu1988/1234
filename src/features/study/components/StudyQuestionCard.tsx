import { useMemo, useState } from 'react'
import type { Question } from '../../exam/types/exam.types'
import { getStudyTipForQuestion } from '../data/studyTips'

interface Props {
  question: Question
  isFavorite: boolean
  onToggleFavorite: () => void
  onMarkLearned: () => void
}

const IMAGE_EXTENSIONS = [
  'png',
  'jpg',
  'jpeg',
  'webp',
  'gif',
  'bmp',
  'svg',
  'avif',
  'PNG',
  'JPG',
  'JPEG',
  'WEBP',
  'GIF',
  'BMP',
  'SVG',
  'AVIF',
]

const normalizeImageUrl = (imageUrl: string): string => {
  const cleanUrl = imageUrl.trim()

  if (!cleanUrl) return ''

  if (
    cleanUrl.startsWith('/') ||
    cleanUrl.startsWith('http://') ||
    cleanUrl.startsWith('https://') ||
    cleanUrl.startsWith('data:')
  ) {
    return cleanUrl
  }

  return `/${cleanUrl}`
}

const getImageFallbackUrls = (imageUrl: string): string[] => {
  const cleanUrl = normalizeImageUrl(imageUrl)

  if (!cleanUrl) return []

  const queryIndex = cleanUrl.indexOf('?')
  const urlWithoutQuery =
    queryIndex === -1 ? cleanUrl : cleanUrl.slice(0, queryIndex)
  const query = queryIndex === -1 ? '' : cleanUrl.slice(queryIndex)

  const slashIndex = urlWithoutQuery.lastIndexOf('/')
  const dotIndex = urlWithoutQuery.lastIndexOf('.')

  if (dotIndex === -1 || dotIndex < slashIndex) {
    return [cleanUrl]
  }

  const base = urlWithoutQuery.slice(0, dotIndex)
  const currentExt = urlWithoutQuery.slice(dotIndex + 1)

  const exts = [
    currentExt,
    ...IMAGE_EXTENSIONS.filter((ext) => ext !== currentExt),
  ]

  return Array.from(new Set(exts.map((ext) => `${base}.${ext}${query}`)))
}

const StudyImage = ({ src }: { src: string }) => {
  const sources = useMemo(() => getImageFallbackUrls(src), [src])
  const [index, setIndex] = useState(0)
  const [isHidden, setIsHidden] = useState(false)

  if (!sources.length || isHidden) return null

  return (
    <img
      src={sources[index]}
      alt="Hình câu hỏi"
      className="exam-question-image"
      onError={() => {
        setIndex((currentIndex) => {
          if (currentIndex >= sources.length - 1) {
            setIsHidden(true)
            return currentIndex
          }

          return currentIndex + 1
        })
      }}
    />
  )
}

export const StudyQuestionCard = ({
  question,
  isFavorite,
  onToggleFavorite,
  onMarkLearned,
}: Props) => {
  const { explanation, memoryTip } = getStudyTipForQuestion(question)

  const imageUrls = question.imageUrls?.length
    ? question.imageUrls
    : question.imageUrl
      ? [question.imageUrl]
      : []

  const hasLearningContent = Boolean(explanation || memoryTip)

  return (
    <div className="exam-question-content">
      <div className="study-question-top">
        <div>
          <div className="exam-question-title">{question.questionText}</div>

          {question.isCritical && (
            <div className="study-critical-badge">
              ⚠️ Câu điểm liệt - sai câu này có thể rớt bài thi
            </div>
          )}
        </div>

        <button
          type="button"
          className={isFavorite ? 'study-favorite active' : 'study-favorite'}
          onClick={onToggleFavorite}
          title="Đánh dấu yêu thích"
        >
          ★
        </button>
      </div>

      {imageUrls.length > 0 && (
        <div className="exam-question-image-wrap">
          {imageUrls.map((url) => (
            <StudyImage key={url} src={url} />
          ))}
        </div>
      )}

      <div className="study-answer-list">
        {Object.entries(question.answers).map(([key, value]) => {
          if (!value) return null

          const isCorrect = question.correctAnswer === key

          return (
            <div
              key={key}
              className={
                isCorrect
                  ? 'exam-answer-row study-answer-row study-answer-row-correct'
                  : 'exam-answer-row study-answer-row'
              }
            >
              <span className="exam-answer-index">{key}</span>
              <span className="exam-answer-text">{value}</span>

              {isCorrect && (
                <span className="study-correct-label">Đáp án đúng</span>
              )}
            </div>
          )
        })}
      </div>

      {hasLearningContent && (
        <div className="study-learning-box">
          {explanation && (
            <div className="study-learning-item study-learning-explanation">
              <div className="study-learning-title">💡 Giải thích</div>
              <p>{explanation}</p>
            </div>
          )}

          {memoryTip && (
            <div className="study-learning-item study-learning-tip">
              <div className="study-learning-title">🧠 Mẹo nhớ nhanh</div>
              <p>{memoryTip}</p>
            </div>
          )}
        </div>
      )}

      <div className="study-card-footer">
        <button type="button" onClick={onMarkLearned}>
          ✅ Đã học câu này
        </button>
      </div>
    </div>
  )
}