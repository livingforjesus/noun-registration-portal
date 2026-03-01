import type { FC } from "react";

interface EmptyPageProps {
  title: string;
}

const EmptyPage: FC<EmptyPageProps> = ({ title }) => (
  <main className="min-h-screen bg-surface p-6">
    <div className="mx-auto flex min-h-[70vh] w-full max-w-[760px] items-center justify-center rounded-xl border border-border bg-card shadow-card">
      <h1 className="text-[28px] font-semibold text-primary">{title}</h1>
    </div>
  </main>
);

export { EmptyPage };
