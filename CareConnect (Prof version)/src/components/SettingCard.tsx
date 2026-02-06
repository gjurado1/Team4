interface SettingCardProps {
  title: string;
  children: React.ReactNode;
}

export function SettingCard({ title, children }: SettingCardProps) {
  return (
    <section 
      className="bg-[#1B1B1B] rounded-2xl p-6 border-2 border-[#3A3A3A]"
      role="region"
      aria-label={title}
    >
      <h2 className="text-white font-bold text-2xl mb-4">{title}</h2>
      {children}
    </section>
  );
}
