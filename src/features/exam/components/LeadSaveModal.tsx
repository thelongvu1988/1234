import { useState } from "react";
import type { Question, UserAnswer } from "../types/exam.types";
import { saveExamHistory } from "../services/examHistoryService";
import { syncExamHistoryToWordPress } from "../services/wordpressSyncService";

type LeadSaveModalProps = {
  open: boolean;
  questions: Question[];
  answers: UserAnswer[];
  onClose: () => void;
  onSaved: () => void;
};

export function LeadSaveModal({
  open,
  questions,
  answers,
  onClose,
  onSaved,
}: LeadSaveModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSave = async () => {
    setError("");

    if (!name.trim()) {
      setError("Vui lòng nhập họ tên.");
      return;
    }

    if (!isValidPhone(phone)) {
      setError("Số điện thoại chưa đúng.");
      return;
    }

    setSaving(true);

    try {
      const historyItem = saveExamHistory({
        name: name.trim(),
        phone: phone.trim(),
        licenseType: "B",
        questions,
        answers,
      });

      await syncExamHistoryToWordPress(historyItem);

      onSaved();
      onClose();
    } catch {
      setError("Không lưu được bài thi. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="lead-save-overlay">
      <div className="lead-save-window">
        <div className="lead-save-title">Lưu bài thi của bạn</div>

        <div className="lead-save-description">
          Nhập họ tên và số điện thoại để lưu kết quả, câu sai và lộ trình ôn thi
          lần sau.
        </div>

        <label className="lead-save-label">
          Họ tên
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="lead-save-input"
            placeholder="Ví dụ: Nguyễn Văn A"
          />
        </label>

        <label className="lead-save-label">
          Số điện thoại
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="lead-save-input"
            placeholder="Ví dụ: 0901234567"
            inputMode="tel"
          />
        </label>

        {error && <div className="lead-save-error">{error}</div>}

        <div className="lead-save-actions">
          <button type="button" onClick={onClose} className="lead-save-skip">
            Để sau
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="lead-save-submit"
          >
            {saving ? "Đang lưu..." : "Lưu bài thi"}
          </button>
        </div>
      </div>
    </div>
  );
}

function isValidPhone(phone: string) {
  return /^(0|\+84)[0-9]{9,10}$/.test(phone.trim());
}