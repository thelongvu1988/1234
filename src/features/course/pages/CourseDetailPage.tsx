import { Link, Navigate, useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { getCourseById } from '../data/courses'
import { LeadForm } from '../../lead/components/LeadForm'

const defaultImageExts = ['png', 'jpg', 'jpeg', 'webp', 'PNG', 'JPG', 'JPEG', 'WEBP']

const getImageCandidates = (
  imageFolder: string,
  imageNumber: number,
  imageExts?: string[]
) => {
  const number = String(imageNumber).padStart(2, '0')
  const exts = imageExts?.length ? imageExts : defaultImageExts

  const allExts = Array.from(new Set([...exts, ...defaultImageExts]))

  return allExts.map((ext) => `${imageFolder}/${number}.${ext}`)
}

const CourseImage = ({
  srcList,
  alt,
}: {
  srcList: string[]
  alt: string
}) => {
  const [srcIndex, setSrcIndex] = useState(0)

  const src = srcList[srcIndex]

  if (!src) return null

  return (
    <img
      src={src}
      alt={alt}
      onError={() => {
        setSrcIndex((current) => {
          if (current >= srcList.length - 1) return current
          return current + 1
        })
      }}
    />
  )
}

export const CourseDetailPage = () => {
  const { id } = useParams()
  const course = getCourseById(id)
  const [selectedImage, setSelectedImage] = useState(1)

  const images = useMemo(() => {
    if (!course) return []

    return Array.from({ length: course.imageCount }).map((_, index) =>
      getImageCandidates(course.imageFolder, index + 1, course.imageExts)
    )
  }, [course])

  if (!course) {
    return <Navigate to="/" replace />
  }

  const currentImage = images[selectedImage - 1] || images[0]

  return (
    <div className="course-detail-page">
      <main>
        <section className="course-detail-hero">
          <div className="course-detail-shell">
            <div>
              <Link to="/" className="course-back-link">
                ← Về trang chủ
              </Link>

              <div className="course-detail-image-box">
                <CourseImage srcList={currentImage} alt={course.title} />
              </div>

              <div className="course-thumbnails">
                {images.map((imageList, index) => (
                  <button
                    key={`${course.id}-${index + 1}`}
                    type="button"
                    onClick={() => setSelectedImage(index + 1)}
                    className={
                      selectedImage === index + 1
                        ? 'course-thumb active'
                        : 'course-thumb'
                    }
                  >
                    <CourseImage
                      srcList={imageList}
                      alt={`${course.title} ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="course-detail-content">
              {course.badge && (
                <div className="course-detail-badge">{course.badge}</div>
              )}

              <h1>{course.title}</h1>
              <p className="course-detail-subtitle">{course.subtitle}</p>

              <div className="course-detail-price">
                <strong>{course.price}</strong>
                {course.oldPrice && <span>{course.oldPrice}</span>}
              </div>

              <div className="course-detail-panel">
                <h2>Quyền lợi nổi bật</h2>
                <ul>
                  {course.highlights.map((item) => (
                    <li key={item}>✅ {item}</li>
                  ))}
                </ul>
              </div>

              <div className="course-detail-actions">
                <a href="tel:0845517979">Gọi tư vấn ngay</a>
                <a href="#dang-ky">Điền form đăng ký</a>
              </div>
            </div>
          </div>
        </section>

        <section className="course-detail-info">
          <div className="home-section-title">
            <h2>Thông tin chi tiết</h2>
            <p>Thông tin tóm tắt khóa học, điều kiện và lộ trình đào tạo.</p>
          </div>

          <div className="course-detail-text">
            {course.details.map((item) => (
              <p key={item}>{item}</p>
            ))}

            <div className="course-detail-dark-box">
              <h3>Đăng ký học lái xe an toàn ngay hôm nay</h3>
              <p>
                Tư vấn rõ ràng, hỗ trợ hồ sơ nhanh, lịch học linh hoạt tại
                TP.HCM.
              </p>
              <a href="tel:0845517979">Gọi Mr Long: 084.551.7979</a>
            </div>
          </div>
        </section>

        <section id="dang-ky" className="home-lead-section">
          <LeadForm defaultCourse={course.title} />
        </section>
      </main>
    </div>
  )
}