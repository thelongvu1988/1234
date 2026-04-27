import { useState } from 'react'

type GuideSection = {
  title: string
  items: string[]
}

const guideSections: GuideSection[] = [
  {
    title: 'Câu hỏi khái niệm',
    items: [
      'Phần đường xe chạy: được sử dụng cho các phương tiện giao thông qua lại.',
      'Làn đường xe chạy: được chia theo chiều dọc và có bề rộng đủ cho xe chạy an toàn.',
      'Dải phân cách: dùng để phân chia mặt đường thành hai chiều xe chạy riêng biệt.',
      'Dải phân cách có 2 loại: cố định và di động.',
      'Đường ưu tiên: các phương tiện đến từ hướng khác nhường đường.',
      'Phương tiện giao thông gồm 3 loại: cơ giới, thô sơ, xe máy chuyên dùng.',
      'Dừng xe: đứng yên tạm thời.',
      'Đỗ xe: đứng yên không giới hạn thời gian.',
      'Người lái xe: người điều khiển xe cơ giới.',
      'Người điều khiển giao thông: Cảnh sát giao thông hoặc người được giao nhiệm vụ hướng dẫn giao thông.',
    ],
  },
  {
    title: 'Câu hỏi về hành vi bị cấm, bị nghiêm cấm',
    items: [
      'Gặp câu hỏi có chữ “bị cấm” hoặc “bị nghiêm cấm” thì ưu tiên chọn đáp án thể hiện hành vi không được làm.',
      'Gặp đáp án có chữ “Không được...” thường là đáp án cần chú ý.',
      'Rượu, bia, ma túy, chất kích thích khi lái xe: thường là hành vi bị nghiêm cấm.',
      'Lạng lách, đánh võng, rú ga liên tục, chống đối người thi hành công vụ: thường là hành vi bị cấm.',
    ],
  },
  {
    title: 'Câu hỏi về tốc độ + độ tuổi',
    items: [
      'Xe gắn máy thường ghi nhớ mốc 40 km/h.',
      'Trong khu vực đông dân cư: ghi nhớ 50 km/h hoặc 60 km/h tùy loại đường.',
      'Người đủ 16 tuổi được lái xe gắn máy.',
      'Người đủ 18 tuổi được lái mô tô hạng A1 và ô tô hạng B.',
      'Xe chạy tốc độ càng cao thì khoảng cách an toàn càng lớn.',
    ],
  },
  {
    title: 'Những con số cần phải nhớ',
    items: [
      'Chỉ được báo hiệu bằng còi khi lái xe trong đô thị từ 5 giờ đến 22 giờ.',
      'Cấm vào đường cao tốc: người đi bộ và xe có tốc độ thiết kế nhỏ hơn 70 km/h.',
      'Gặp phương tiện đường sắt tới thì dừng cách ray gần nhất tối thiểu 5 m.',
      'Xe ô tô hỏng tại vị trí giao nhau với đường sắt: đặt báo hiệu cách 500 m về hai phía đường sắt.',
      'GPLX bị khai báo mất để cấp lại, nếu phát hiện gian dối có thể bị thu hồi và không cấp lại trong 5 năm.',
    ],
  },
  {
    title: 'Quy tắc giao thông đường bộ',
    items: [
      'Luôn chọn đáp án có các cụm: giảm tốc độ, đi về phía bên phải, từ từ, nhường đường, không được quay đầu.',
      'Hiệu lệnh người điều khiển giao thông: giơ tay thẳng đứng thì các xe dừng lại.',
      'Chỉ được đi trên một làn đường, chuyển làn ở nơi cho phép.',
      'Xe thô sơ đi về phía bên phải.',
      'Nơi đường giao nhau không có vòng xuyến: nhường đường bên phải.',
      'Có vòng xuyến: nhường đường bên trái.',
      'Hầm đường bộ: không được quay đầu xe.',
      'Khi quay đầu: tốc độ chậm.',
      'Tránh xe ngược chiều: xe gần chỗ tránh vào chỗ tránh trước, xe xuống dốc nhường xe lên dốc.',
    ],
  },
  {
    title: 'Câu hỏi Văn hóa - Đạo đức',
    items: [
      'Câu văn hóa, đạo đức thường chọn đáp án thể hiện sự nhường nhịn, lịch sự, an toàn.',
      'Gặp đáp án có “cả ý 1 và ý 2” trong nhóm văn hóa - đạo đức thì cần chú ý.',
      'Ưu tiên đáp án: chấp hành tốc độ, biển báo, người điều khiển giao thông, giảm tốc độ, cho xe đi chậm, đi về bên phải.',
    ],
  },
]

export const StudyGuidePanel = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="study-guide-panel">
      <div className="study-guide-hero">
        <div>
          <div className="study-guide-kicker">Hướng dẫn trả lời bộ đề thi</div>
          <h2>Mẹo học nhanh 200 câu</h2>
          <p>Ghi nhớ các nhóm mẹo thường gặp trước khi làm câu hỏi.</p>
        </div>

        <div className="study-guide-count">200 Câu</div>
      </div>

      <div className="study-guide-subtitle">Hướng dẫn phần Luật:</div>

      <div className="study-guide-list">
        {guideSections.map((section, index) => {
          const isOpen = openIndex === index

          return (
            <div key={section.title} className="study-guide-section">
              <button
                type="button"
                className="study-guide-section-title"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{isOpen ? '−' : '+'}</span>
                {section.title}
              </button>

              {isOpen && (
                <div className="study-guide-section-content">
                  {section.items.map((item) => (
                    <div key={item} className="study-guide-item">
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}