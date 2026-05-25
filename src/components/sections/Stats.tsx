interface Stat {
  value: string;
  label: string;
}

interface StatsProps {
  stats: Stat[];
}

export function Stats({ stats }: StatsProps) {
  return (
    <section className="bg-[var(--bg-surface)] py-16 md:py-20">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[var(--lcg-amber)] mb-2">
                {stat.value}
              </div>
              <p className="text-sm md:text-base text-[var(--fg-2)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
