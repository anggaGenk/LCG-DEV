import { TeamMember } from '@/lib/types';

interface TeamProps {
  team: TeamMember[];
}

export function Team({ team }: TeamProps) {
  return (
    <section className="lcg-section is-padded lcg-bg-surface lcg-team-scroll-container">
      {/* Background parallax shapes */}
      <div className="lcg-team-bg-shape" />

      <div className="lcg-container">
        <div className="lcg-section-head lcg-scroll-fade-in">
          <h2 className="lcg-section-title">Leadership</h2>
          <p className="lcg-page-lede" style={{ marginTop: 16 }}>
            Our team brings decades of experience building and operating critical infrastructure across Southeast Asia.
          </p>
        </div>

        <div className="lcg-team-grid">
          {team.map((member, i) => (
            <div key={member.id} className="lcg-team-card lcg-team-card-animated" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="lcg-team-portrait">
                <span>{member.initials}</span>
              </div>
              <h3 className="lcg-team-name">
                {member.name}
              </h3>
              <p className="lcg-team-role">
                {member.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
