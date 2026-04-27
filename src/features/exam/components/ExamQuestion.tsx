import { useMemo, useState } from "react";
import { AnswerList } from "./AnswerList";
import type { AnswerKey, Question } from "../types/exam.types";

type ExamQuestionProps = {
  question: Question;
  questionIndex: number;
  selectedAnswer?: string;
  isSubmitted: boolean;
  onAnswer: (questionId: number, answerKey: AnswerKey) => void;
};

const normalizeImagePath = (imagePath?: string): string => {
  if (!imagePath) return "";

  if (
    imagePath.startsWith("/") ||
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://")
  ) {
    return imagePath;
  }

  return `/${imagePath}`;
};

const createImageFallbacks = (imagePath?: string): string[] => {
  if (!imagePath) return [];

  const normalized = normalizeImagePath(imagePath);
  const withoutExtension = normalized.replace(
    /\.(png|jpg|jpeg|webp|PNG|JPG|JPEG|WEBP)$/i,
    ""
  );

  return Array.from(
    new Set([
      normalized,
      `${withoutExtension}.png`,
      `${withoutExtension}.jpeg`,
      `${withoutExtension}.jpg`,
      `${withoutExtension}.PNG`,
      `${withoutExtension}.JPEG`,
      `${withoutExtension}.JPG`,
    ])
  );
};

export function ExamQuestion({
  question,
  questionIndex,
  selectedAnswer,
  isSubmitted,
  onAnswer,
}: ExamQuestionProps) {
  const imageCandidates = useMemo(() => {
    const imagePath = question.imageUrl || question.imageUrls?.[0] || "";
    return createImageFallbacks(imagePath);
  }, [question.imageUrl, question.imageUrls]);

  const [imageIndex, setImageIndex] = useState(0);

  const imageSrc = imageCandidates[imageIndex];

  const handleSelect = (answerKey: AnswerKey) => {
    if (isSubmitted) return;
    onAnswer(Number(question.id), answerKey);
  };

  return (
    <main className="exam-main">
      <div className="exam-question-content">
        <div className="exam-question-header">
          <h1 className="exam-question-title">
            Câu {questionIndex + 1}: {question.questionText}
          </h1>

          {question.isCritical && (
            <div className="exam-critical-badge">Câu điểm liệt</div>
          )}
        </div>

        {imageSrc && (
          <div className="exam-question-image-wrap">
            <img
              src={imageSrc}
              alt="Hình minh họa câu hỏi"
              className="exam-question-image"
              onError={() => {
                if (imageIndex < imageCandidates.length - 1) {
                  setImageIndex((current) => current + 1);
                } else {
                  console.error("Không tìm thấy ảnh:", imageCandidates);
                }
              }}
            />
          </div>
        )}

        <AnswerList
          question={question}
          selected={selectedAnswer as AnswerKey | undefined}
          isSubmitted={isSubmitted}
          onSelect={handleSelect}
        />
      </div>
    </main>
  );
}