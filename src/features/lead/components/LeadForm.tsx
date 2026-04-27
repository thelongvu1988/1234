import { FormEvent, useState } from 'react'
import { courses } from '../../course/data/courses'
import { submitLead } from '../services/leadService'
import { useCandidateStore } from '../../exam/stores/useCandidateStore'

interface Props {
  defaultCourse?: string
}

export const LeadForm = ({ defaultCourse = 'Khóa Học Hạng B' }: Props) => {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [course, setCourse] = useState(defaultCourse)
  const [note, setNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  // ✅ store học viên
  const setCandidate = useCandidateStore((s) => s.setCandidate)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!fullName.trim()) {
      setMessage('Anh/chị vui lòng nhập họ tên.')
      return
    }

    if (!phone.trim()) {
      setMessage('Anh/chị vui lòng nhập số điện thoại.')
      return
    }

    try {
      setIsSubmitting(true)
      setMessage('')

      // ✅ LƯU LOCAL HỌC VIÊN
      setCandidate({
        fullName: fullName.trim(),
        phone: phone.trim(),
        license: course,
      })

      // ✅ GỬI GOOGLE SHEET
      await submitLead({
        fullName: fullName.trim(),
        phone: phone.trim(),
        course,
        note: note.trim(),
        source: window.location.href,
      })

      setFullName('')
      setPhone('')
      setNote('')
      setMessage('Đã lưu thông tin & gửi đăng ký thành công.')
    } catch (error) {
      console.error(error)
      setMessage('Gửi thông tin chưa thành công. Anh/chị vui lòng gọi hotline.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="lead-box">
      <div className="lead-info">
        <h2>Đăng ký nhận tư vấn</h2>
        <p>
          Để lại thông tin, chuyên viên sẽ gọi lại tư vấn khóa học, hồ sơ và
          lịch học phù hợp.
        </p>

        <div className="lead-contact">
          <a href="tel:0845517979">📞 Mr Long: 084.551.7979</a>
          <a href="tel:0363697697">📞 Mrs Vân: 0363.697.697</a>
        </div>
      </div>

      <form className="lead-form" onSubmit={handleSubmit}>
        <div className="lead-form-grid">
          <label>
            Họ và tên *
            <input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Nguyễn Văn A"
            />
          </label>

          <label>
            Số điện thoại *
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="09xx xxx xxx"
              inputMode="tel"
            />
          </label>
        </div>

        <label>
          Khóa học quan tâm
          <select
            value={course}
            onChange={(event) => setCourse(event.target.value)}
          >
            {courses.map((item) => (
              <option key={item.id} value={item.title}>
                {item.title} - {item.price}
              </option>
            ))}
          </select>
        </label>

        <label>
          Ghi chú thêm
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Ví dụ: Cần tư vấn học cuối tuần, khu vực Quận 8..."
            rows={4}
          />
        </label>

        {message && <div className="lead-message">{message}</div>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Đang gửi...' : 'Đăng ký ngay'}
        </button>

        <p className="lead-safe">🔒 Thông tin chỉ dùng để tư vấn khóa học.</p>
      </form>
    </div>
  )
}