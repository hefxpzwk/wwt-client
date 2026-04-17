import type { ReactNode } from "react";

type MobileShellProps = {
  children: ReactNode;
};

export function MobileShell({ children }: MobileShellProps) {
  return (
    <main className="outer-shell">
      <section className="phone-shell">{children}</section>
    </main>
  );
}
