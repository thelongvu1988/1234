import type { ExamHistoryItem } from "./examHistoryService";

const WORDPRESS_API_URL = "";

export async function syncExamHistoryToWordPress(
  historyItem: ExamHistoryItem,
): Promise<void> {
  if (!WORDPRESS_API_URL) {
    console.log("WordPress API chưa cấu hình. Dữ liệu lưu local:", historyItem);
    return;
  }

  await fetch(WORDPRESS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(historyItem),
  });
}