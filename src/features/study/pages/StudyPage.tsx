import { getQuestionsByLicense } from '../../exam/data/questions'
import { useCandidateStore } from '../../exam/stores/useCandidateStore'
import { useStudyStore } from '../stores/useStudyStore'
import { submitStudyProgress } from '../../lead/services/leadService'
import { StudyQuestionCard } from '../components/StudyQuestionCard'
import { StudyQuestionNavigator } from '../components/StudyQuestionNavigator'
import '../study.css'

export const StudyPage = ({ onBack }: { onBack: () => void }) => {
  const candidate = useCandidateStore((state) => state.candidate)

  const {
    license,
    currentIndex,
    setIndex,
    markLearned,
    toggleFavorite,
    learned,
    favorites,
    wrong,
  } = useStudyStore()

  if (!license) {
    return (
      <div className="exam-shell">
        <div style={{ maxWidth: 720, margin: '0 auto', padding: 20 }}>
          <div
            style={{
              borderRadius: 12,
              background: '#fff',
              padding: 20,
              textAlign: 'center',
            }}
          >
            <h2>Chưa chọn hạng GPLX</h2>
            <p>Vui lòng quay lại màn nhập thông tin để chọn hạng trước.</p>

            <button
              type="button"
              onClick={onBack}
              style={{
                border: 'none',
                borderRadius: 8,
                background: '#2563eb',
                padding: '12px 18px',
                color: '#fff',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Về trang chủ
            </button>
          </div>
        </div>
      </div>
    )
  }

  const questions = getQuestionsByLicense(license as any)
  const currentQuestion = questions[currentIndex]

  const learnedIds = learned[license] || []
  const favoriteIds = favorites[license] || []
  const wrongMap = wrong[license] || {}

  const syncStudyProgress = (questionId: number) => {
    const nextLearnedIds = learnedIds.includes(questionId)
      ? learnedIds
      : [...learnedIds, questionId]

    const progressPercent = questions.length
      ? Math.round((nextLearnedIds.length / questions.length) * 100)
      : 0

    void submitStudyProgress({
      fullName: candidate?.fullName || 'Chưa nhập',
      phone: candidate?.phone || '',
      licenseType: license,
      totalQuestions: questions.length,
      learnedCount: nextLearnedIds.length,
      progressPercent,
      currentQuestionId: questionId,
      learnedIds: nextLearnedIds,
      favoriteIds,
      wrongMap,
      updatedAt: new Date().toISOString(),
      source: window.location.href,
    }).catch((error) => {
      console.error('Không thể gửi tiến trình học về Google Sheet:', error)
    })
  }

  const handleMarkLearned = (questionId: number) => {
    markLearned(questionId)
    syncStudyProgress(questionId)
  }

  const goToQuestion = (index: number) => {
    if (index < 0 || index >= questions.length) return

    if (currentQuestion) {
      handleMarkLearned(currentQuestion.id)
    }

    setIndex(index)
  }

  const handlePrev = () => {
    goToQuestion(currentIndex - 1)
  }

  const handleNext = () => {
    goToQuestion(currentIndex + 1)
  }

  if (!currentQuestion) {
    return (
      <div className="exam-shell">
        <div style={{ maxWidth: 720, margin: '0 auto', padding: 20 }}>
          <div
            style={{
              borderRadius: 12,
              background: '#fff',
              padding: 20,
              textAlign: 'center',
            }}
          >
            <h2>Không có câu hỏi cho hạng {license}</h2>
            <p>Vui lòng kiểm tra lại dữ liệu câu hỏi hoặc chọn hạng khác.</p>

            <button
              type="button"
              onClick={onBack}
              style={{
                border: 'none',
                borderRadius: 8,
                background: '#2563eb',
                padding: '12px 18px',
                color: '#fff',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Về trang chủ
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="exam-shell">
      <div className="exam-container study-container">
        <div className="study-header">
          <button
            type="button"
            className="study-back-button"
            onClick={onBack}
          >
            ← Trang chủ
          </button>

          <div>
            <strong>Học lý thuyết hạng {license}</strong>
            <div>
              Câu ID {currentQuestion.id} · Vị trí {currentIndex + 1} /{' '}
              {questions.length}
            </div>
          </div>

          <button
            type="button"
            className="study-change-license-button"
            onClick={onBack}
          >
            Đổi thông tin
          </button>
        </div>

        <div className="study-layout">
          <main className="exam-main study-main">
            <StudyQuestionCard
              question={currentQuestion}
              isFavorite={favoriteIds.includes(currentQuestion.id)}
              onToggleFavorite={() => toggleFavorite(currentQuestion.id)}
              onMarkLearned={() => handleMarkLearned(currentQuestion.id)}
            />

            <div className="study-actions">
              <button
                type="button"
                className="study-action-button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                ⬅ Câu trước
              </button>

              <button
                type="button"
                className="study-action-button study-action-button-primary"
                onClick={() => handleMarkLearned(currentQuestion.id)}
              >
                Đánh dấu đã học
              </button>

              <button
                type="button"
                className="study-action-button"
                onClick={handleNext}
                disabled={currentIndex === questions.length - 1}
              >
                Câu sau ➡
              </button>
            </div>
          </main>

          <aside className="study-side">
            <StudyQuestionNavigator
              questions={questions}
              currentIndex={currentIndex}
              learnedIds={learnedIds}
              favoriteIds={favoriteIds}
              wrongMap={wrongMap}
              onSelect={goToQuestion}
            />
          </aside>
        </div>
      </div>
    </div>
  )
}