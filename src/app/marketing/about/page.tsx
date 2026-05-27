'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

/* =====================================================================
   About page with 5 sub-sections:
   - History (timeline)
   - Vision & Mission
   - Organization (org chart)
   - Board of Directors
   - Board of Commissioners
   ===================================================================== */

function AboutHistory() {
  const events = [
    {
      year: '2024',
      title: 'First year of operations',
      desc: 'Began operations as a patient-capital holding company, deploying initial capital into water utilities infrastructure across Indonesia. Established foundations in clean water systems serving rural and urban communities, launching our commitment to essential infrastructure development.'
    },
    {
      year: '2025',
      title: 'Expansion into new sectors',
      desc: 'Expanded beyond water utilities into energy infrastructure and logistics networks. Added 3 new portfolio companies, building expertise across renewable energy transition projects and supply chain infrastructure connecting suppliers, producers, and markets throughout Southeast Asia.'
    },
    {
      year: '2026',
      title: 'Scale milestone achieved',
      desc: 'Achieved significant operational scale with 1,820 MW operating capacity and $2.4B in assets under management. Managing 11 portfolio companies across water, energy, logistics, and industrial services sectors. Recognized as the leading patient-capital investor in Southeast Asian infrastructure.'
    },
  ];

  return (
    <div className="lcg-container">
      <h2 className="lcg-section-title">Our History</h2>
      <div className="lcg-timeline">
        {events.map((event, index) => (
          <div key={event.year} className={`lcg-timeline-item lcg-timeline-item-animated`} style={{ animationDelay: `${index * 200}ms` }}>
            <div className="lcg-timeline-dot" />
            <div className="lcg-timeline-year">{event.year}</div>
            <div className="lcg-timeline-title">{event.title}</div>
            <p className="lcg-timeline-desc">{event.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutVision() {
  const missions = [
    {
      id: 'access',
      title: 'Access',
      desc: 'Expanding access to essential infrastructure services — water, energy, logistics — to underserved communities.',
      image: '/assets/mission-access.jpg',
    },
    {
      id: 'engineering',
      title: 'Engineering Excellence',
      desc: 'Building and operating assets to world-class standards, maximizing reliability and efficiency.',
      image: '/assets/mission-engineering.jpg',
    },
    {
      id: 'partnership',
      title: 'Strategic Partnership',
      desc: 'Collaborating with local management, governments, and communities to ensure sustainable growth.',
      image: '/assets/mission-partnership.jpg',
    },
    {
      id: 'stewardship',
      title: 'Environmental Stewardship',
      desc: 'Investing in infrastructure that reduces environmental impact and supports the energy transition.',
      image: '/assets/mission-stewardship.jpg',
    },
  ];

  return (
    <div className="lcg-container">
      <h2 className="lcg-section-title">Vision & Mission</h2>
      <p className="lcg-page-lede" style={{ maxWidth: '100%', marginBottom: '48px' }}>
        We believe infrastructure is the backbone of economic development. Our mission is to be the partner of choice for building and operating world-class infrastructure across Southeast Asia.
      </p>
      <div className="lcg-mission-grid">
        {missions.map((m) => (
          <div key={m.id} className="lcg-mission-card">
            <div className="lcg-mission-image">
              <Image
                src={m.image}
                alt={m.title}
                width={300}
                height={200}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
            <div className="lcg-mission-content">
              <h3 className="lcg-mission-title">{m.title}</h3>
              <p className="lcg-mission-desc">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutOrganization() {
  const ceo = { name: 'Randika Galih Gemilang', role: 'Founder & Chief Executive Officer' };
  const reports = [
    { name: 'Yuwanda Fauzi', role: 'Chief Operating Officer' },
    { name: 'Armando Rozano', role: 'Chief Financial Officer' },
    { name: 'Anggita Diah Praswara', role: 'Managing Director, Projects' },
    { name: 'Nicky Ilham Lembayu', role: 'Director, Engineering & Operations' },
  ];

  return (
    <div className="lcg-container">
      <h2 className="lcg-section-title">Organization</h2>
      <div className="lcg-org-chart">
        <div className="lcg-org-ceo">
          <div className="lcg-org-ceo-card">
            <div className="lcg-org-ceo-portrait">👨‍💼</div>
            <p className="lcg-org-ceo-name">{ceo.name}</p>
            <p className="lcg-org-ceo-role">{ceo.role}</p>
          </div>
        </div>
        <div className="lcg-org-reports">
          {reports.map((person) => (
            <div key={person.name} className="lcg-org-card">
              <div className="lcg-org-portrait">👤</div>
              <p className="lcg-org-name">{person.name}</p>
              <p className="lcg-org-role">{person.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutDirectors() {
  const directors = [
    {
      name: 'Bambang Sutrisno',
      role: 'Board Chair',
      bio: 'Founder & former CEO of major Indonesian infrastructure conglomerate with 35+ years experience.',
    },
    {
      name: 'Dr. Indra Wijaya',
      role: 'Independent Director',
      bio: 'Former Minister of Energy & Mineral Resources. Expert in energy policy and infrastructure finance.',
    },
    {
      name: 'Victoria Leung',
      role: 'Independent Director',
      bio: 'Managing partner at Asia Infrastructure Partners. Investor in 12+ regional infrastructure assets.',
    },
    {
      name: 'Prof. Adi Susanto',
      role: 'Independent Director',
      bio: 'Chair of Engineering at University of Indonesia. Leading expert on infrastructure sustainability.',
    },
  ];

  return (
    <div className="lcg-container">
      <h2 className="lcg-section-title">Board of Directors</h2>
      <div className="lcg-board-grid">
        {directors.map((d) => (
          <div key={d.name} className="lcg-board-card">
            <div className="lcg-board-portrait">👤</div>
            <p className="lcg-board-name">{d.name}</p>
            <p className="lcg-board-role">{d.role}</p>
            <p className="lcg-board-bio">{d.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutCommissioners() {
  const commissioners = [
    {
      name: 'Kuntoro Mangkusubroto',
      role: 'Audit Commissioner',
      bio: 'Former Coordinating Minister of Economic Affairs. Expert in infrastructure project governance.',
    },
    {
      name: 'Dyah Kusuma Wijaya',
      role: 'Compliance Commissioner',
      bio: 'Legal expert and former regulator. Specialist in energy and water sector compliance.',
    },
    {
      name: 'Arif Hermawan',
      role: 'Risk Commissioner',
      bio: 'Former CRO at major Indonesian bank. Deep expertise in infrastructure risk management.',
    },
  ];

  return (
    <div className="lcg-container">
      <h2 className="lcg-section-title">Board of Commissioners</h2>
      <div className="lcg-board-grid">
        {commissioners.map((c) => (
          <div key={c.name} className="lcg-board-card">
            <div className="lcg-board-portrait">👤</div>
            <p className="lcg-board-name">{c.name}</p>
            <p className="lcg-board-role">{c.role}</p>
            <p className="lcg-board-bio">{c.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const SUB_SECTIONS = [
  { id: 'history', label: 'History', component: AboutHistory },
  { id: 'vision', label: 'Vision & Mission', component: AboutVision },
  { id: 'organization', label: 'Organization', component: AboutOrganization },
  { id: 'directors', label: 'Board of Directors', component: AboutDirectors },
  { id: 'commissioners', label: 'Board of Commissioners', component: AboutCommissioners },
];

function AboutSubnav({ activeId }: { activeId: string | null }) {
  return (
    <nav className="lcg-about-subnav">
      <div className="lcg-about-subnav-inner">
        {SUB_SECTIONS.map((section) => (
          <Link
            key={section.id}
            href={`/marketing/about?sub=${section.id}`}
            className={`lcg-about-subnav-link ${activeId === section.id ? 'is-active' : ''}`}
          >
            {section.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function AboutContent({ subId }: { subId: string | null }) {
  const section = SUB_SECTIONS.find((s) => s.id === subId) || SUB_SECTIONS[0];
  const Component = section.component;

  return (
    <section className="lcg-section is-padded">
      <Component />
    </section>
  );
}

function AboutPageContent() {
  const params = useSearchParams();
  const subId = params.get('sub');

  return (
    <>
      <section className="lcg-page-hero">
        <div className="lcg-container">
          <h1 className="lcg-page-title">About Lasana Cahaya Gemilang</h1>
          <p className="lcg-page-lede">
            LCG is a patient-capital holding company investing in long-lived infrastructure assets across energy, water, logistics, and industrial services.
          </p>
        </div>
      </section>

      <AboutSubnav activeId={subId} />
      <AboutContent subId={subId} />
    </>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AboutPageContent />
    </Suspense>
  );
}
