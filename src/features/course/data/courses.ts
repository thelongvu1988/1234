export interface Course {
  id: string
  title: string
  shortTitle: string
  subtitle: string
  price: string
  oldPrice?: string
  badge?: string
  imageFolder: string
  imageCount: number
  imageExts: string[]
  highlights: string[]
  details: string[]
}

export const courses: Course[] = [
  {
    id: 'a1',
    title: 'Khóa Học Hạng A1',
    shortTitle: 'Hạng A1',
    subtitle: 'Xe máy 50cc đến dưới 125cc',
    price: '700.000 đ',
    badge: 'Xe máy phổ thông',
    imageFolder: '/course-images/anh-khoahoc1',
    imageCount: 5,
    imageExts: ['jpg'],
    highlights: [
      'Cấp tài liệu ôn thi chuẩn luật mới',
      'Không yêu cầu chạy DAT',
      'Hỗ trợ hồ sơ nhanh gọn',
      'Phù hợp học viên đi xe máy phổ thông',
    ],
    details: [
      'Dành cho người điều khiển xe mô tô từ 50cc đến dưới 125cc.',
      'Hỗ trợ ôn lý thuyết, hướng dẫn thực hành sa hình vòng số 8.',
      'Thủ tục đơn giản, tư vấn hồ sơ tận nơi tại TP.HCM.',
    ],
  },
  {
    id: 'a',
    title: 'Khóa Học Hạng A',
    shortTitle: 'Hạng A',
    subtitle: 'Mô tô từ 125cc trở lên',
    price: '1.900.000 đ',
    badge: 'Mô tô phân khối lớn',
    imageFolder: '/course-images/anh-khoahoc2',
    imageCount: 1,
    imageExts: ['jpg'],
    highlights: [
      'Hỗ trợ làm hồ sơ trọn gói',
      'Đào tạo chuẩn theo luật mới',
      'Phù hợp mô tô từ 125cc trở lên',
      'Tư vấn nhanh qua Zalo/Hotline',
    ],
    details: [
      'Hạng A dành cho người điều khiển mô tô từ 125cc trở lên.',
      'Phù hợp học viên sử dụng xe phân khối lớn hoặc các dòng xe trên 125cc.',
      'Học viên được hỗ trợ tài liệu, lịch học và lịch thi rõ ràng.',
    ],
  },
  {
    id: 'b01',
    title: 'Khóa Học Hạng B.01',
    shortTitle: 'Hạng B.01',
    subtitle: 'Ô tô số tự động & xe điện',
    price: '18.600.000 đ',
    oldPrice: '23.900.000 đ',
    badge: 'Tự động / xe điện',
    imageFolder: '/course-images/anh-khoahoc3',
    imageCount: 1,
    imageExts: ['jpg'],
    highlights: [
      'Chạy đủ 710 km DAT',
      'Học 3 giờ Cabin mô phỏng',
      'Phù hợp lái xe gia đình, xe điện',
      'Học lý thuyết linh hoạt online/offline',
    ],
    details: [
      'Dành cho học viên muốn học xe tự động, xe điện, phục vụ nhu cầu cá nhân và gia đình.',
      'Chương trình có lý thuyết, mô phỏng, sa hình, đường trường và DAT theo quy định.',
      'Cam kết tư vấn rõ chi phí, hỗ trợ hồ sơ và lịch học linh hoạt.',
    ],
  },
  {
    id: 'b',
    title: 'Khóa Học Hạng B',
    shortTitle: 'Hạng B',
    subtitle: 'Ô tô số sàn & số tự động',
    price: '18.600.000 đ',
    oldPrice: '23.900.000 đ',
    badge: 'Đăng ký nhiều nhất',
    imageFolder: '/course-images/anh-khoahoc4',
    imageCount: 3,
    imageExts: ['jpg'],
    highlights: [
      'Chạy đủ 810 km DAT',
      'Học thực hành 1 kèm 1',
      'Xe đời mới, có cảm biến/chấm điểm',
      'Học cuối tuần không phụ thu',
    ],
    details: [
      'Hạng B mới phù hợp nhu cầu lái xe gia đình, dịch vụ và xe tải dưới 3.5 tấn.',
      'Được học cả số sàn và số tự động theo chương trình gộp mới.',
      'Lịch học linh động, giáo viên kèm sát, hỗ trợ đổi giáo viên nếu chưa phù hợp.',
    ],
  },
  {
    id: 'c1',
    title: 'Khóa Học Hạng C1',
    shortTitle: 'Hạng C1',
    subtitle: 'Xe tải từ 3.5T đến 7.5T',
    price: '24.000.000 đ',
    badge: 'Xe tải trung',
    imageFolder: '/course-images/anh-khoahoc5',
    imageCount: 2,
    imageExts: ['jpg'],
    highlights: [
      'Chạy đủ 825 km DAT',
      'Học 3 giờ Cabin mô phỏng',
      'Đào tạo bằng xe tải đời mới',
      'Phù hợp nhu cầu lái xe tải trung',
    ],
    details: [
      'Dành cho học viên muốn lái xe tải/chuyên dùng từ 3.500kg đến 7.500kg.',
      'Chương trình gồm lý thuyết, mô phỏng, DAT, sa hình và đường trường.',
      'Hỗ trợ hồ sơ, lịch học và tư vấn lộ trình thi rõ ràng.',
    ],
  },
  {
    id: 'c',
    title: 'Khóa Học Hạng C',
    shortTitle: 'Hạng C',
    subtitle: 'Nâng hạng từ B2 hoặc C1',
    price: '10.000.000 đ',
    badge: 'Nâng hạng từ B2 hoặc C1',
    imageFolder: '/course-images/anh-khoahoc6',
    imageCount: 3,
    imageExts: ['jpg'],
    highlights: [
      'Nhận nâng hạng từ B2 hoặc C1',
      'Học 3 giờ Cabin mô phỏng',
      'Tư vấn điều kiện nâng hạng rõ ràng',
      'Hỗ trợ hồ sơ nâng hạng nhanh gọn',
    ],
    details: [
      'Dành cho học viên đã có GPLX B2 hoặc C1 và muốn nâng lên hạng C.',
      'Chương trình tập trung kỹ năng điều khiển xe tải/chuyên dùng trên 7.500kg.',
      'Trung tâm hỗ trợ kiểm tra điều kiện, hồ sơ và lịch học phù hợp.',
    ],
  },
]

export const getCourseById = (id: string | undefined) => {
  return courses.find((course) => course.id === id)
}

export const getCourseImage = (course: Course, index = 1) => {
  const number = String(index).padStart(2, '0')
  const ext = course.imageExts[0] || 'jpg'

  return `${course.imageFolder}/${number}.${ext}`
}