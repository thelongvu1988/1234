// src/features/study/pages/StudyStartPage.tsx

import { useState } from 'react'
import type { LicenseType } from '../../exam/types/exam.types'
import { useCandidateStore } from '../../exam/stores/useCandidateStore'
import { useExamStore } from '../../exam/stores/useExamStore'
import { useStudyStore } from '../stores/useStudyStore'

interface Props {
  onStartStudy: () => void
  onBack: () => void
}

const licenseOptions: { value: LicenseType; label: string }[] = [
  { value: 'A1', label: 'A1 - Xe máy dưới 125cc' },
  { value: 'A', label: 'A - Xe máy trên 125cc' },
  { value: 'B1', label: 'B1 - Mô tô 3 bánh' },
  { value: 'B', label: 'B - Ô tô' },
  { value: 'C1', label: 'C1 - Xe tải trung' },
  { value: 'C', label: 'C - Xe tải nặng' },
  { value: 'D', label: 'D - Xe khách' },
]

export const StudyStartPage = ({ onStartStudy, onBack }: Props) => {
  const { candidate, setCandidate } = useCandidateStore()
  const examLicenseType = useExamStore((state) => state.licenseType)
  const setExamLicenseType = useExamStore((state) => state.setLicenseType)
  const setStudyLicense = useStudyStore((state) => state.setLicense)

  const [fullName, setFullName] = useState(candidate?.fullName || '')
  const [phone, setPhone] = useState(candidate?.phone || '')
  const [licenseType, setLicenseType] = useState<LicenseType>(
    (examLicenseType as LicenseType) || 'B'
  )
  const [error, setError] = useState('')

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

    return ''
  }

  const handleStartStudy = () => {
    const message = validate()

    if (message) {
      setError(message)
      return
    }

    setError('')

    setCandidate({
      fullName: fullName.trim(),
      phone: phone.trim(),
      registrationNumber: 'HOC-LY-THUYET',
    })

    setExamLicenseType(licenseType)
    setStudyLicense(licenseType)

    onStartStudy()
  }

  return (
    <div className="exam-shell">
      <div className="study-start-page">
        <button
          type="button"
          className="study-start-back"
          onClick={onBack}
        >
          ← Về trang chủ
        </button>

        <div className="study-start-card">
          <div className="study-start-header">
            <h1>HỌC LÝ THUYẾT CHUẨN BỘ CÔNG AN</h1>
            <p>
              Nhập thông tin học viên và chọn hạng GPLX để vào học đúng bộ câu
              hỏi theo hạng.
            </p>
          </div>

          <div className="study-start-body">
            <div className="study-start-info">
              <strong>Thông tin học viên</strong>
              <span>
                Hệ thống sẽ lưu tên, số điện thoại và hạng GPLX để theo dõi tiến
                trình học lý thuyết.
              </span>
            </div>

            <div className="study-start-grid">
              <div className="study-start-field">
                <label>Họ và tên học viên</label>
                <input
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn A"
                />
              </div>

              <div className="study-start-field">
                <label>Số điện thoại</label>
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Ví dụ: 0987654321"
                  inputMode="tel"
                />
              </div>

              <div className="study-start-field study-start-field-full">
                <label>Hạng GPLX</label>
                <select
                  value={licenseType}
                  onChange={(event) =>
                    setLicenseType(event.target.value as LicenseType)
                  }
                >
                  {licenseOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {error && <div className="study-start-error">{error}</div>}

            <button
              type="button"
              className="study-start-submit"
              onClick={handleStartStudy}
            >
              Vào học
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}