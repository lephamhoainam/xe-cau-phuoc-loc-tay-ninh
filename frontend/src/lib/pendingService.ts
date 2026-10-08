const KEY = "pending-service";

export function setPendingService(slug: string) {
  try {
    sessionStorage.setItem(KEY, slug);
  } catch {}
}

// Đọc xong là xóa, nên chỉ có tác dụng đúng một lần
export function takePendingService() {
  try {
    const v = sessionStorage.getItem(KEY);
    sessionStorage.removeItem(KEY);
    return v;
  } catch {
    return null;
  }
}