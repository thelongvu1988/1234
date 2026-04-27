import { formatTime } from "../utils/formatTime";

type ExamHeaderMobileProps = {
  currentIndex: number;
  total: number;
  timeLeft: number;
};

export function ExamHeaderMobile({
  currentIndex,
  total,
  timeLeft,
}: ExamHeaderMobileProps) {
  return (
    <div className="exam-mobile-header">
      <div className="font-bold">
        Câu {currentIndex + 1}/{total}
      </div>
      <div className="text-xl font-bold">{formatTime(timeLeft)}</div>
    </div>
  );
}