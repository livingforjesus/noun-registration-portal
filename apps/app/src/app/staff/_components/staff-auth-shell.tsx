import Image from "next/image";
import { type FC } from "react";

interface StaffAuthShellProps {
  children: React.ReactNode;
  title: string;
}

const StaffAuthShell: FC<StaffAuthShellProps> = ({ children, title }) => {
  return (
    <main className="min-h-screen bg-surface px-4 py-8">
      <section className="mx-auto w-full max-w-[560px]">
        <div className="text-center">
          <Image
            src="/noun-logo.svg"
            alt="National Open University of Nigeria"
            width={190}
            height={220}
            className="mx-auto h-auto w-[150px]"
            priority
          />
          <h1 className="mt-2 text-[30px] font-bold text-primary">NOUN</h1>
          <p className="mt-2 text-2xl font-semibold text-foreground">{title}</p>
        </div>

        {children}
      </section>
    </main>
  );
};

export { StaffAuthShell };
