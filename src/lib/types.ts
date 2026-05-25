export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  initials: string;
}

export interface PortfolioCompany {
  id: string;
  name: string;
  sector: string;
  founded: string;
  status: string;
}

export interface EngagementStep {
  number: string;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}
