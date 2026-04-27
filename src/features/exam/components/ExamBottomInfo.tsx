type ExamBottomInfoProps = {
  progress: number;
};

export function ExamBottomInfo({ progress }: ExamBottomInfoProps) {
  return (
    <div className="exam-bottom-info">
      <div className="exam-candidate-box">
        <div className="exam-avatar">Ảnh</div>

        <div className="text-lg">
          <div className="font-bold">Thông tin thí sinh</div>
          <div>SBD: 2 &nbsp;&nbsp;&nbsp; Hạng: B</div>
          <div>Họ và tên: THÍ SINH SỐ 2</div>
          <div>Số CMT: 0902367543278</div>
        </div>

        <div className="ml-auto text-center font-bold text-red-700">
          {progress}%
        </div>
      </div>

      <div className="exam-logo-box">
        <div className="text-2xl font-bold text-[#1d2b7f]">BỘ 600 CÂU HỎI</div>
        <div className="exam-logo-title">TỔNG CỤC ĐƯỜNG BỘ VIỆT NAM</div>
      </div>
    </div>
  );
}