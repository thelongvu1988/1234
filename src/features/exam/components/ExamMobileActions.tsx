type ExamMobileActionsProps = {
  onPrevious: () => void;
  onNext: () => void;
  onOpenPanel: () => void;
  onFinish: () => void;
};

export function ExamMobileActions({
  onPrevious,
  onNext,
  onOpenPanel,
  onFinish,
}: ExamMobileActionsProps) {
  return (
    <div className="exam-mobile-actions">
      <div className="flex gap-2">
        <button type="button" onClick={onPrevious} className="exam-mobile-nav-button">
          ← Trước
        </button>

        <button
          type="button"
          onClick={onOpenPanel}
          className="exam-mobile-panel-button"
        >
          Bảng câu
        </button>

        <button type="button" onClick={onNext} className="exam-mobile-nav-button">
          Tiếp →
        </button>
      </div>

      <button type="button" onClick={onFinish} className="exam-mobile-finish-button">
        KẾT THÚC
      </button>
    </div>
  );
}