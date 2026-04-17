import type { ReactNode } from "react";

type TopBarProps = {
  title: string;
  rightSlot?: ReactNode;
};

export function TopBar({ title, rightSlot }: TopBarProps) {
  return (
    <header className="top-bar">
      <h1>{title}</h1>
      <div className="top-bar-action">{rightSlot}</div>
    </header>
  );
}
