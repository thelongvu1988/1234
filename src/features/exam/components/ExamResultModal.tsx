import type { ExamResult } from '../utils/examUtils'
import { useCandidateStore } from '../stores/useCandidateStore'
import { useExamStore } from '../stores/useExamStore'

interface Props {
  result: ExamResult
  onReview: () => void
  onRetry: () => void
}

export const ResultModal = ({ result, onReview, onRetry }: Props) => {
  const { candidate } = useCandidateStore()
  const { licenseType } = useExamStore()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div
          className={`px-5 py-5 text-white ${
            result.passed ? 'bg-green-700' : 'bg-red-700'
          }`}
        >
          <h2 className="text-2xl font-black">
            {result.passed ? 'ĐẠT' : 'KHÔNG ĐẠT'}
          </h2>
          <p className="mt-1 text-sm opacity-90">
            Kết quả bài thi thử lý thuyết lái xe
          </p>
        </div>

        <div className="space-y-3 p-5">
          <Info label="Học viên" value={candidate?.fullName || 'Chưa nhập'} />
          <Info label="Số điện thoại" value={candidate?.phone || 'Chưa nhập'} />
          <Info label="Hạng GPLX" value={licenseType} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <Stat label="Số câu đúng" value={String(result.correct)} />
            <Stat label="Số câu sai" value={String(result.wrong)} />
            <Stat label="Chưa trả lời" value={String(result.unanswered)} />
            <Stat
              label="Điểm của bạn"
              value={`${result.correct}/${result.totalQuestions}`}
            />
          </div>

          <div className="rounded-xl bg-slate-50 px-4 py-3 text-center text-sm font-bold text-slate-700">
            Điểm đạt yêu cầu: {result.passScore}/{result.totalQuestions}
          </div>

          {result.criticalWrong && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
              Bài thi có câu điểm liệt trả lời sai nên không đạt.
            </div>
          )}
        </div>

        <div className="flex gap-3 border-t p-5">
          <button
            type="button"
            onClick={onRetry}
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3 font-bold text-slate-700"
          >
            Làm đề khác
          </button>

          <button
            type="button"
            onClick={onReview}
            className="flex-1 rounded-xl bg-blue-700 px-4 py-3 font-bold text-white"
          >
            Xem đáp án
          </button>
        </div>
      </div>
    </div>
  )
}

const Info = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm">
    <span className="font-semibold text-slate-600">{label}</span>
    <span className="font-bold text-slate-900">{value}</span>
  </div>
)

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-xl bg-slate-100 p-4 text-center">
    <div className="text-2xl font-black text-slate-900">{value}</div>
    <div className="mt-1 text-xs font-semibold text-slate-600">{label}</div>
  </div>
)