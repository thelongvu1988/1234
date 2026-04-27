import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  Link,
} from 'react-router-dom'
import type { ReactNode } from 'react'
import { HomePage } from './features/home/pages/HomePage'
import { ExamStartPage } from './features/exam/pages/ExamStartPage'
import { ExamPage } from './features/exam/pages/ExamPage'
import { StudyStartPage } from './features/study/pages/StudyStartPage'
import { StudyPage } from './features/study/pages/StudyPage'
import { CourseDetailPage } from './features/course/pages/CourseDetailPage'
import './features/home/home.css'
import './features/exam/exam.css'

const EXAM_STORAGE_KEY = 'gplx_exam_progress_v1'

interface SiteLayoutProps {
  children: ReactNode
  onStartExam: () => void
  onStartStudy: () => void
}

const SiteLayout = ({ children, onStartExam, onStartStudy }: SiteLayoutProps) => {
  return (
    <div className="home-page">
      <header className="home-navbar">
        <Link to="/" className="home-brand home-brand-link">
          <div className="home-brand-icon">🚗</div>
          <div>
            <h1>LÁI XE AN TOÀN</h1>
            <p>CẬP NHẬT LUẬT MỚI NHẤT</p>
          </div>
        </Link>

        <nav className="home-menu">
          <Link to="/">Trang chủ</Link>
          <Link to="/#courses">Khóa học</Link>
          <Link to="/#law">Luật mới</Link>
          <Link to="/#process">Quy trình</Link>

          <div className="home-menu-dropdown">
            <button type="button" className="home-menu-dropdown-button">
              Lý thuyết ▾
            </button>

            <div className="home-submenu">
              <button type="button" onClick={onStartStudy}>
                📚 Học lý thuyết
              </button>
              <button type="button" onClick={onStartExam}>
                📝 Thi thử
              </button>
              <button type="button" onClick={onStartStudy}>
                ⭐ Câu yêu thích
              </button>
              <button type="button" onClick={onStartStudy}>
                ❌ Ôn câu sai
              </button>
            </div>
          </div>
        </nav>

        <div className="home-hotline">
          <a href="tel:0845517979">Mr Long: 084.551.7979</a>
          <a href="tel:0363697697">Mrs Vân: 0363.697.697</a>
        </div>
      </header>

      {children}

      <footer className="home-footer">
        <div className="home-footer-inner">
          <div className="home-footer-main">
            <div className="home-footer-logo">SAO VIỆT</div>

            <p className="home-footer-intro">
              Trường Đào Tạo Lái Xe SAO VIỆT dạy học lái xe ô tô hàng đầu TP HCM
              với đội ngũ giáo viên giàu kinh nghiệm, sân tập lái đạt chuẩn, xe
              tập lái đời mới và có tỉ lệ học viên đậu cao.
            </p>

            <p>
              <strong>TRỤ SỞ CHÍNH - VP1:</strong> 106 ĐƯỜNG SỐ 34, P AN LẠC
              (QUẬN BÌNH TÂN), TP HCM.
            </p>
          </div>

          <div className="home-footer-column">
            <h4>Danh sách khóa học</h4>
            <Link to="/#courses">Khóa học khuyến mãi</Link>
            <Link to="/#courses">Khóa học nổi bật</Link>
            <Link to="/#courses">Tất cả khóa học</Link>
            <Link to="/#courses">Tìm kiếm</Link>
          </div>

          <div className="home-footer-column">
            <h4>Chính sách</h4>
            <Link to="/#process">Hướng dẫn quy trình thi</Link>
            <Link to="/#dang-ky">Hướng dẫn hồ sơ đăng ký</Link>
            <Link to="/#process">Địa điểm đưa đón thực hành</Link>
            <Link to="/#dang-ky">Liên hệ</Link>
          </div>

          <div className="home-footer-column home-footer-support">
            <h4>Tổng đài hỗ trợ</h4>
            <a href="tel:0845517979">
              Gọi tư vấn 1: <strong>084.551.7979</strong>
            </a>
            <a href="tel:0363697697">
              Gọi tư vấn 2: <strong>0363.697.697</strong>
            </a>

            <h4>Phương thức thanh toán</h4>
            <div className="home-footer-payment">
              <span>VISA</span>
              <span>Mastercard</span>
              <span>Momo</span>
              <span>ZaloPay</span>
            </div>
          </div>
        </div>

        <div className="home-footer-bottom">
          © Bản quyền thuộc về Trường Đào Tạo Lái Xe SAO VIỆT
        </div>
      </footer>
    </div>
  )
}

function AppRoutes() {
  const navigate = useNavigate()

  const openExamInNewTab = () => {
    const examUrl = `${window.location.origin}/exam`
    window.open(examUrl, '_blank', 'noopener,noreferrer')
  }

  const hasExam = () => {
    try {
      const raw = localStorage.getItem(EXAM_STORAGE_KEY)
      if (!raw) return false

      const data = JSON.parse(raw)
      return Array.isArray(data?.questions) && data.questions.length > 0
    } catch {
      return false
    }
  }

  const withLayout = (children: ReactNode) => {
    return (
      <SiteLayout
        onStartExam={openExamInNewTab}
        onStartStudy={() => navigate('/study')}
      >
        {children}
      </SiteLayout>
    )
  }

  try {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onStartExam={openExamInNewTab}
              onStartStudy={() => navigate('/study')}
            />
          }
        />

        <Route
          path="/course/:id"
          element={withLayout(<CourseDetailPage />)}
        />

        <Route
          path="/exam"
          element={withLayout(
            <ExamStartPage
              onStartExam={() => navigate('/exam/start')}
              onBack={() => navigate('/')}
            />
          )}
        />

        <Route
          path="/exam/start"
          element={
            hasExam() ? (
              withLayout(<ExamPage onBackToStart={() => navigate('/exam')} />)
            ) : (
              <Navigate to="/exam" replace />
            )
          }
        />

        <Route
          path="/study"
          element={withLayout(
            <StudyStartPage
              onStartStudy={() => navigate('/study/start')}
              onBack={() => navigate('/')}
            />
          )}
        />

        <Route
          path="/study/start"
          element={withLayout(
            <StudyPage onBack={() => navigate('/study')} />
          )}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    )
  } catch (error) {
    console.error(error)

    return (
      <div style={{ padding: 24, fontFamily: 'Arial' }}>
        <h1>App bị lỗi</h1>
        <pre>{error instanceof Error ? error.message : String(error)}</pre>
      </div>
    )
  }
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}