import '../home.css'
import { CourseCard } from '../../course/components/CourseCard'
import { courses } from '../../course/data/courses'
import { LeadForm } from '../../lead/components/LeadForm'

interface Props {
  onStartExam: () => void
  onStartStudy: () => void
}

export const HomePage = ({ onStartExam, onStartStudy }: Props) => {
  return (
    <div className="home-page">
      <header className="home-navbar">
        <a href="#home" className="home-brand home-brand-link">
          <div className="home-brand-icon">🚗</div>
          <div>
            <h1>LÁI XE AN TOÀN</h1>
            <p>CẬP NHẬT LUẬT MỚI NHẤT</p>
          </div>
        </a>

        <nav className="home-menu">
          <a href="#home">Trang chủ</a>
          <a href="#courses">Khóa học</a>
          <a href="#law">Luật mới</a>
          <a href="#process">Quy trình</a>

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

      <main id="home">
        <section className="home-hero home-hero-compact">
          <div className="home-hero-content">
            <div className="home-badge">
              Đã áp dụng quy chuẩn phân hạng GPLX mới
            </div>

            <h2>
              Đăng ký học lái xe
              <br />
              <span>trọn gói tại TP.HCM</span>
            </h2>

            <p>
              Đào tạo sát hạch lái xe các hạng B.01, B, C1, C, A1, A, B1.
              Hỗ trợ học lý thuyết, thi thử online và đăng ký hồ sơ nhanh.
            </p>

            <div className="home-hero-actions">
              <a href="#dang-ky">Đăng ký giữ suất</a>
              <a href="#courses">Xem bảng giá</a>
              <button type="button" onClick={onStartStudy}>
                Học lý thuyết
              </button>
              <button type="button" onClick={onStartExam}>
                Thi thử
              </button>
            </div>
          </div>
        </section>

        <section id="courses" className="home-section home-section-tight">
          <div className="home-section-title">
            <h2>Bảng giá khóa học</h2>
            <p>
              Cam kết tư vấn rõ ràng, hỗ trợ hồ sơ, lịch học linh hoạt.
            </p>
          </div>

          <div className="home-course-grid">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                featured={course.id === 'b'}
              />
            ))}
          </div>
        </section>

        {/*
        <section id="law" className="home-law-section">
          <div className="home-law-card">
            <div className="home-section-title">
              <h2>Phân hạng GPLX theo luật mới</h2>
              <p>
                Học viên lưu ý chọn đúng hạng bằng theo nhu cầu sử dụng xe.
              </p>
            </div>

            <div className="home-law-grid">
              <div>
                <h3>🏍️ Nhóm xe máy</h3>
                <p>
                  <strong>A1:</strong> Mô tô từ 50cc đến dưới 125cc.
                </p>
                <p>
                  <strong>A:</strong> Mô tô từ 125cc trở lên.
                </p>
                <p>
                  <strong>B1:</strong> Mô tô 3 bánh.
                </p>
              </div>

              <div>
                <h3>🚗 Nhóm ô tô con</h3>
                <p>
                  <strong>B.01:</strong> Ô tô số tự động, xe điện.
                </p>
                <p>
                  <strong>B:</strong> Ô tô số sàn & số tự động, xe đến 8 chỗ,
                  tải dưới 3.5 tấn.
                </p>
              </div>

              <div>
                <h3>🚚 Nhóm xe tải</h3>
                <p>
                  <strong>C1:</strong> Xe tải từ 3.5 tấn đến 7.5 tấn.
                </p>
                <p>
                  <strong>C:</strong> Xe tải trên 7.5 tấn, nâng hạng từ C1.
                </p>
              </div>
            </div>

            <div className="home-dat-box">
              <h3>Quy định DAT & Cabin mô phỏng</h3>
              <p>
                B.01 chạy 710km DAT, B chạy 810km DAT, C1/C chạy 825km DAT.
                Các hạng ô tô học 3 giờ cabin mô phỏng.
              </p>
            </div>
          </div>
        </section>
        */}

        <section id="theory" className="home-section home-theory-section">
          <div className="home-section-title">
            <h2>Lý thuyết & thi thử</h2>
            <p>
              Học 600 câu, ôn câu sai và thi thử sát hạch ngay trên website.
            </p>
          </div>

          <div className="home-theory-grid">
            <button className="home-theory-card" onClick={onStartStudy}>
              <div className="home-theory-icon">📚</div>
              <h3>Học lý thuyết 600 câu</h3>
              <p>
                Chọn hạng GPLX, học theo chương, xem đáp án đúng, giải thích và
                mẹo nhớ.
              </p>
            </button>

            <button className="home-theory-card" onClick={onStartExam}>
              <div className="home-theory-icon">📝</div>
              <h3>Thi thử sát hạch</h3>
              <p>
                Nhập thông tin học viên rồi bắt đầu thi thử theo bộ đề mô phỏng
                sát hạch.
              </p>
            </button>
          </div>
        </section>

        <section id="process" className="home-section">
          <div className="home-section-title">
            <h2>Quy trình 4 bước</h2>
            <p>Từ đăng ký hồ sơ đến khi nhận giấy phép lái xe.</p>
          </div>

          <div className="home-process-grid">
            <div>
              <span>1</span>
              <h3>Đăng ký hồ sơ</h3>
              <p>Tư vấn hạng bằng, chuẩn bị CCCD, ảnh và giấy khám sức khỏe.</p>
            </div>

            <div>
              <span>2</span>
              <h3>Học lý thuyết & DAT</h3>
              <p>Ôn luật giao thông, cabin mô phỏng và chạy DAT theo quy định.</p>
            </div>

            <div>
              <span>3</span>
              <h3>Thực hành sa hình</h3>
              <p>Học bài thi sa hình, đường trường, xe cảm biến/chấm điểm.</p>
            </div>

            <div>
              <span>4</span>
              <h3>Thi & nhận bằng</h3>
              <p>Dự thi sát hạch, nhận GPLX sau khi hoàn tất quy trình.</p>
            </div>
          </div>
        </section>

        <section id="dang-ky" className="home-lead-section">
          <LeadForm />
        </section>
      </main>

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
              (QUẬN BÌNH TÂN), TP HCM. Trường dạy lái xe chuyên nghiệp hàng đầu
              TP HCM.
            </p>

            <div className="home-footer-address">
              <h4>Địa chỉ:</h4>
              <p>
                VP2: SAO VIỆT TAO ĐÀN - 256 Nguyễn Thị Minh Khai, Phường Xuân
                Hòa (Quận 3) TP HCM
              </p>
              <p>
                VP3: SAO VIỆT CỘNG HÒA - 59 Cộng Hòa, Phường Tân Sơn Nhất
                (Quận Tân Bình) TP HCM
              </p>
              <p>
                VP4: SAO VIỆT CITYLAND GÒ VẤP - 82 Đường số 11, Phường Gò Vấp
                (Quận Gò Vấp) TP HCM
              </p>
              <p>
                VP5: SAO VIỆT VINHOME CP BÌNH THẠNH - 107 Nguyễn Hữu Cảnh,
                Phường Thạnh Mỹ Tây, (Quận Bình Thạnh) TP HCM
              </p>
            </div>
          </div>

          <div className="home-footer-column">
            <h4>Danh sách khóa học</h4>
            <a href="#courses">Khóa học khuyến mãi</a>
            <a href="#courses">Khóa học nổi bật</a>
            <a href="#courses">Tất cả khóa học</a>
            <a href="#courses">Tìm kiếm</a>
          </div>

          <div className="home-footer-column">
            <h4>Chính sách</h4>
            <a href="#process">Hướng dẫn quy trình thi</a>
            <a href="#dang-ky">Hướng dẫn hồ sơ đăng ký</a>
            <a href="#process">Địa điểm đưa đón thực hành</a>
            <a href="#dang-ky">Liên hệ</a>
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