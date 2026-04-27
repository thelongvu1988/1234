import { useState } from 'react'
import type { LicenseType } from '../config/examConfigs'
import { useCandidateStore } from '../stores/useCandidateStore'
import { useExamStore } from '../stores/useExamStore'
import { PREBUILT_EXAM_COUNT } from '../utils/examGenerator'

interface Props {
  onStart: () => void
}

type ExamMode = 'random' | 'fixed'

export const ExamEntryForm = ({ onStart }: Props) => {
  const { candidate, setCandidate } = useCandidateStore()
  const { licenseType, setLicenseType, startExam } = useExamStore()

  const [fullName, setFullName] = useState(candidate?.fullName || '')
  const [phone, setPhone] = useState(candidate?.phone || '')
  const [registrationNumber, setRegistrationNumber] = useState(
    candidate?.registrationNumber || '9'
  )
  const [examMode, setExamMode] = useState<ExamMode>('random')
  const [fixedExamCode, setFixedExamCode] = useState('1')
  const [error, setError] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

  const validate = () => {
    if (!fullName.trim()) {
      return 'Anh vui lòng nhập họ và tên học viên.'
    }

    if (!phone.trim()) {
      return 'Anh vui lòng nhập số điện thoại.'
    }

    const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/

    if (!phoneRegex.test(phone.trim())) {
      return 'Số điện thoại chưa đúng định dạng Việt Nam.'
    }

    if (!registrationNumber.trim()) {
      return 'Anh vui lòng nhập số báo danh.'
    }

    return ''
  }

  const getSelectedExamNumber = () => {
    if (examMode === 'fixed') {
      return Number(fixedExamCode)
    }

    return Math.floor(Math.random() * PREBUILT_EXAM_COUNT) + 1
  }

  const handleCheckInfo = () => {
    const message = validate()

    if (message) {
      setError(message)
      return
    }

    setError('')
    setShowConfirm(true)
  }

  const handleStartExam = () => {
    const selectedExamNumber = getSelectedExamNumber()

    setCandidate({
      fullName: fullName.trim(),
      phone: phone.trim(),
      registrationNumber: registrationNumber.trim(),
    })

    const started = startExam(selectedExamNumber)

    if (!started) {
      setShowConfirm(false)
      setError(
        `Không tạo được đề số ${selectedExamNumber} cho hạng ${licenseType}. Anh kiểm tra lại dữ liệu 600 câu, phụ lục câu hỏi hoặc cấu trúc đề.`
      )
      return
    }

    onStart()
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="bg-blue-700 px-5 py-4 text-white">
          <h1 className="text-xl font-bold uppercase">
            Thi lý thuyết lái xe Bộ Công An
          </h1>
          <p className="mt-1 text-sm text-blue-100">
            Nhập thông tin học viên để bắt đầu bài thi thử.
          </p>
        </div>

        <div className="space-y-5 p-5">
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
            <p className="font-semibold text-blue-800">
              Thông tin thí sinh
            </p>
            <p className="mt-1 text-sm text-blue-700">
              Hệ thống sẽ lưu tên và số điện thoại để theo dõi kết quả thi thử.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                Họ và tên học viên
              </label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn A"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                Số điện thoại
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ví dụ: 0987654321"
                inputMode="tel"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                Số báo danh
              </label>
              <input
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                inputMode="numeric"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                Hạng GPLX
              </label>
              <select
                value={licenseType}
                onChange={(e) => setLicenseType(e.target.value as LicenseType)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
              >
                <option value="A1">A1 - Xe máy dưới 125cc</option>
                <option value="A">A - Xe máy trên 125cc</option>
                <option value="B1">B1</option>
                <option value="B">B - Ô tô</option>
                <option value="C1">C1</option>
                <option value="C">C</option>
                <option value="D">D/D1/D2</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Lựa chọn đề thi
            </label>

            <div className="grid gap-3 md:grid-cols-2">
              <button
                type="button"
                onClick={() => setExamMode('random')}
                className={`rounded-xl border p-4 text-left ${
                  examMode === 'random'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <p className="font-bold text-slate-900">Đề ngẫu nhiên</p>
                <p className="mt-1 text-sm text-slate-600">
                  Chọn ngẫu nhiên 1 trong {PREBUILT_EXAM_COUNT} đề dựng sẵn.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setExamMode('fixed')}
                className={`rounded-xl border p-4 text-left ${
                  examMode === 'fixed'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <p className="font-bold text-slate-900">Đề cố định</p>
                <p className="mt-1 text-sm text-slate-600">
                  Dùng để luyện từng bộ đề từ 1 đến {PREBUILT_EXAM_COUNT}.
                </p>
              </button>
            </div>
          </div>

          {examMode === 'fixed' && (
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                Chọn mã đề
              </label>
              <select
                value={fixedExamCode}
                onChange={(e) => setFixedExamCode(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
              >
                {Array.from({ length: PREBUILT_EXAM_COUNT }).map((_, index) => (
                  <option key={index + 1} value={String(index + 1)}>
                    Đề số {index + 1}
                  </option>
                ))}
              </select>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3 md:flex-row">
            <button
              type="button"
              onClick={handleCheckInfo}
              className="flex-1 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800"
            >
              Kiểm tra thông tin thí sinh
            </button>
          </div>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="border-b px-5 py-4">
              <h2 className="text-lg font-bold text-slate-900">
                Xác nhận thông tin học viên
              </h2>
            </div>

            <div className="space-y-3 p-5 text-sm">
              <InfoRow label="Họ và tên" value={fullName} />
              <InfoRow label="Số điện thoại" value={phone} />
              <InfoRow label="Số báo danh" value={registrationNumber} />
              <InfoRow label="Hạng GPLX" value={licenseType} />
              <InfoRow
                label="Dạng đề"
                value={
                  examMode === 'random'
                    ? `Đề ngẫu nhiên trong ${PREBUILT_EXAM_COUNT} đề`
                    : `Đề số ${fixedExamCode}`
                }
              />

              <div className="mt-4 rounded-xl bg-yellow-50 p-3 text-yellow-800">
                Khi bắt đầu thi, hệ thống sẽ tính giờ và lưu kết quả bài làm.
              </div>
            </div>

            <div className="flex gap-3 border-t p-5">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="flex-1 rounded-xl border border-slate-300 px-5 py-3 font-bold text-slate-700 hover:bg-slate-50"
              >
                Sửa lại
              </button>

              <button
                type="button"
                onClick={handleStartExam}
                className="flex-1 rounded-xl bg-green-600 px-5 py-3 font-bold text-white hover:bg-green-700"
              >
                Bắt đầu thi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const InfoRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex justify-between gap-4 rounded-xl bg-slate-50 px-4 py-3">
      <span className="font-semibold text-slate-600">{label}</span>
      <span className="text-right font-bold text-slate-900">{value}</span>
    </div>
  )
}