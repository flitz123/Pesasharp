import { ReactNode } from "react";

export default function Card({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-2">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div>{children}</div>
    </div>
  );
}
