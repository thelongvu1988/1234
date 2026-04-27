import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Course } from '../data/courses'

interface Props {
  course: Course
  featured?: boolean
}

const defaultImageExts = [
  'jpg',
  'jpeg',
  'png',
  'webp',
  'JPG',
  'JPEG',
  'PNG',
  'WEBP',
]

const getCourseImageCandidates = (course: Course, index = 1) => {
  const number = String(index).padStart(2, '0')
  const exts = course.imageExts?.length
    ? [...course.imageExts, ...defaultImageExts]
    : defaultImageExts

  return Array.from(new Set(exts)).map(
    (ext) => `${course.imageFolder}/${number}.${ext}`
  )
}

const CourseCardImage = ({ course }: { course: Course }) => {
  const images = useMemo(() => getCourseImageCandidates(course), [course])
  const [imageIndex, setImageIndex] = useState(0)

  const currentImage = images[imageIndex]

  if (!currentImage) return null

  return (
    <img
      src={currentImage}
      alt={course.title}
      className="course-card-image"
      loading="lazy"
      onError={() => {
        setImageIndex((current) => {
          if (current >= images.length - 1) return current
          return current + 1
        })
      }}
    />
  )
}

export const CourseCard = ({ course, featured = false }: Props) => {
  return (
    <article className={`course-card ${featured ? 'course-card-featured' : ''}`}>
      {course.badge && <div className="course-card-badge">{course.badge}</div>}

      <CourseCardImage course={course} />

      <div className="course-card-body">
        <h3>{course.shortTitle}</h3>
        <p>{course.subtitle}</p>

        <div className="course-card-price">
          <strong>{course.price}</strong>
          {course.oldPrice && <span>{course.oldPrice}</span>}
        </div>

        <ul>
          {course.highlights.slice(0, 3).map((item) => (
            <li key={item}>✅ {item}</li>
          ))}
        </ul>

        <Link to={`/course/${course.id}`} className="course-card-button">
          Xem chi tiết
        </Link>
      </div>
    </article>
  )
}