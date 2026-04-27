import { useEffect, useMemo, useState } from 'react'
import { Timer } from '../components/Timer'
import { ExamQuestion } from '../components/ExamQuestion'
import { QuestionNavigator } from '../components/QuestionNavigator'
import { ResultModal } from '../components/ExamResultModal'
import { ExamReviewModal } from '../components/ExamReviewModal'
import { getExamConfig } from '../config/examConfigs'
import { useCandidateStore } from '../stores/useCandidateStore'
import { useExamStore } from '../stores/useExamStore'
import type { AnswerKey } from '../types/exam.types'

interface Props {
  onBackToStart: () => void
}

export const ExamPage = ({ onBackToStart }: Props) => {
  const { candidate } = useCandidateStore()

  const {
    licenseType,
    questions,
    currentIndex,
    answers,
    result,
    isSubmitted,
    answer,
    next,
    prev,
    goTo,
    submitExam,
    startExam,
    restoreExam,
  } = useExamStore()

  const [showReview, setShowReview] = useState(false)
  const [hasTriedRestore, setHasTriedRestore] = useState(false)

  useEffect(() => {
    if (!questions.length) {
      restoreExam()
    }

    setHasTriedRestore(true)
  }, [questions.length, restoreExam])

  const config = getExamConfig(licenseType)
  const currentQuestion = questions[currentIndex]

  const answeredCount = Object.keys(answers).length

  const reviewAnswers = useMemo(() => {
    return Object.entries(answers).map(([questionId, selectedAnswer]) => ({
      questionId: Number(questionId),
      selectedAnswer: selectedAnswer as AnswerKey,
    }))
  }, [answers])

  if (!hasTriedRestore) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <div className="rounded-2xl bg-white p-6 text-center shadow">
          <h1 className="text-xl font-bold text-slate-900">
            Đang tải lại đề thi...
          </h1>
        </div>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <div className="rounded-2xl bg-white p-6 text-center shadow">
          <h1 className="text-xl font-bold text-slate-900">Chưa có đề thi</h1>

          <button
            type="button"
            onClick={onBackToStart}
            className="mt-4 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white"
          >
            Quay lại nhập thông tin
          </button>
        </div>
      </div>
    )
  }

  const handleSubmit = () => {
    const ok = window.confirm('Anh chắc chắn muốn kết thúc bài thi?')
    if (!ok) return

    submitExam()
  }

  const handleTimeout = () => {
    if (!isSubmitted) {
      submitExam()
    }
  }

  const handleRetry = () => {
    setShowReview(false)
    startExam()
  }

  const handleSelectAnswer = (answerKey: AnswerKey) => {
    if (isSubmitted) return

    answer(currentQuestion.id, answerKey)
  }

  const handleReview = () => {
    setShowReview(true)
  }

  const handleCloseReview = () => {
    setShowReview(false)
  }

  return (
    <div className="min-h-screen bg-[#fff4df]">
      <header className="sticky top-0 z-40 border-b border-blue-300 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-black uppercase text-slate-900">
              Thi lý thuyết lái xe Bộ Công An
            </h1>

            <p className="text-sm text-slate-600">
              Học viên: <b>{candidate?.fullName || 'Chưa nhập'}</b> · Hạng:{' '}
              <b>{licenseType}</b>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold">
              Đã làm: {answeredCount}/{questions.length} câu
            </div>

            {!isSubmitted && (
              <Timer
                duration={config.durationMinutes}
                onTimeout={handleTimeout}
              />
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitted}
              className="rounded-xl bg-red-600 px-5 py-3 font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              Kết thúc thi
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-3 px-3 py-3 lg:grid-cols-[1fr_330px]">
        <section className="space-y-3">
          <ExamQuestion
            question={currentQuestion}
            questionIndex={currentIndex}
            selectedAnswer={answers[currentQuestion.id]}
            isSubmitted={isSubmitted}
            onAnswer={(id, ans) => answer(id, ans)}
          />

          <div className="flex justify-between gap-3">
            <button
              type="button"
              onClick={prev}
              disabled={currentIndex === 0}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-700 disabled:opacity-40"
            >
              Câu trước
            </button>

            <div className="rounded-xl bg-white px-5 py-3 text-center font-bold text-slate-700">
              Câu {currentIndex + 1}/{questions.length}
            </div>

            <button
              type="button"
              onClick={next}
              disabled={currentIndex === questions.length - 1}
              className="rounded-xl bg-blue-700 px-5 py-3 font-bold text-white disabled:opacity-40"
            >
              Câu tiếp
            </button>
          </div>
        </section>

        <aside className="lg:sticky lg:top-[92px] lg:self-start">
          <QuestionNavigator
            questions={questions}
            answers={answers}
            currentIndex={currentIndex}
            isSubmitted={isSubmitted}
            onGoTo={goTo}
            onAnswer={answer}
          />
        </aside>
      </main>

      {result && !showReview && (
        <ResultModal
          result={result}
          onReview={handleReview}
          onRetry={handleRetry}
        />
      )}

      <ExamReviewModal
        open={showReview}
        questions={questions}
        answers={reviewAnswers}
        onClose={handleCloseReview}
      />
    </div>
  )
}