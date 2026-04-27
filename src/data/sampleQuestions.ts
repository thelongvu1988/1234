import type { Question } from "../features/exam/types/exam.types";
export const sampleQuestions: Question[] = [
  {
    id: "q1",
    licenseType: "B",
    category: "Khái niệm",
    questionText: "Người lái xe phải làm gì khi điều khiển xe trên đường?",
    answers: {
      A: "Đi đúng làn đường, phần đường quy định",
      B: "Đi theo ý muốn nếu đường vắng",
      C: "Chỉ cần chú ý xe phía trước",
      D: "Bấm còi liên tục để xin đường",
    },
    correctAnswer: "A",
    explanation:
      "Người lái xe phải đi đúng làn đường, phần đường và chấp hành báo hiệu đường bộ.",
    isCritical: false,
  },
  {
    id: "q2",
    licenseType: "B",
    category: "Điểm liệt",
    questionText:
      "Người điều khiển phương tiện có được sử dụng rượu bia khi lái xe không?",
    answers: {
      A: "Được nếu uống ít",
      B: "Không được",
      C: "Được nếu đi chậm",
      D: "Được nếu đi ban đêm",
    },
    correctAnswer: "B",
    explanation:
      "Người lái xe không được sử dụng rượu bia khi điều khiển phương tiện.",
    isCritical: true,
  },
  {
    id: "q3",
    licenseType: "B",
    category: "Biển báo",
    questionText: "Khi gặp biển báo nguy hiểm, người lái xe cần làm gì?",
    answers: {
      A: "Tăng tốc để qua nhanh",
      B: "Giảm tốc độ và chú ý quan sát",
      C: "Bấm còi liên tục",
      D: "Dừng xe giữa đường",
    },
    correctAnswer: "B",
    explanation:
      "Biển báo nguy hiểm cảnh báo tình huống có thể gây mất an toàn, cần giảm tốc độ và quan sát.",
    isCritical: false,
  },
  {
    id: "q4",
    licenseType: "B",
    category: "Sa hình",
    questionText: "Khi chuyển hướng, người lái xe phải làm gì?",
    answers: {
      A: "Bật tín hiệu báo hướng rẽ",
      B: "Rẽ ngay nếu đường trống",
      C: "Không cần quan sát phía sau",
      D: "Chỉ cần giảm tốc độ",
    },
    correctAnswer: "A",
    explanation:
      "Khi chuyển hướng phải giảm tốc độ, bật tín hiệu báo hướng rẽ và quan sát an toàn.",
    isCritical: false,
  },
  {
    id: "q5",
    licenseType: "B",
    category: "Văn hóa giao thông",
    questionText:
      "Hành vi nào thể hiện văn hóa giao thông khi điều khiển phương tiện?",
    answers: {
      A: "Chen lấn khi đường đông",
      B: "Nhường đường đúng quy định",
      C: "Bấm còi liên tục",
      D: "Vượt đèn vàng mọi lúc",
    },
    correctAnswer: "B",
    explanation:
      "Nhường đường đúng quy định là hành vi thể hiện văn hóa giao thông.",
    isCritical: false,
  },
];