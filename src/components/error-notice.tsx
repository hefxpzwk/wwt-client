import { messageForCode } from "@/lib/errors";

type ErrorNoticeProps = {
  code?: string;
  message?: string;
};

export function ErrorNotice({ code, message }: ErrorNoticeProps) {
  if (!code && !message) {
    return null;
  }

  const visibleMessage = code ? messageForCode(code, message ?? "오류가 발생했습니다.") : message;
  return <p className="error-notice">{visibleMessage}</p>;
}
