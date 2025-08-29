export type WebsitePackage = {
  name: string;
  price: string;
  description: string;
  features: string[];
  gradient: string;
  popular?: boolean;
};

export const websitePackages: WebsitePackage[] = [
  {
    name: 'Build-Only',
    price: '$1,200',
    description: 'One-time build. You manage content and hosting.',
    features: [
      'Up to 5-page custom website',
      'Mobile-responsive design',
      'Essential SEO best practices',
      'Strapi CMS with a WordPress-simple admin panel',
      'Launch assistance and handoff documentation',
      'You own and manage hosting & updates'
    ],
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Managed Starter',
    price: '$1,500',
    description: 'Most popular. We build and manage for your first year.',
    features: [
      'Up to 8–10 custom pages',
      'Performance + on-page SEO optimization',
      'Strapi CMS with a WordPress-simple admin panel',
      'Managed hosting, backups, and monitoring (12 months)',
      'Basic CRM and marketing integrations',
      'Content updates and support included (12 months)'
    ],
    gradient: 'from-teal-500 to-cyan-600',
    popular: true
  },
  {
    name: 'Professional',
    price: '$2,500',
    description: 'Advanced functionality and integrations for growth.',
    features: [
      '15+ pages with premium animations',
      'E‑commerce or booking flows (Stripe/Checkout)',
      'Custom API and third‑party integrations',
      'Strapi CMS with roles/permissions and localization ready',
      'Analytics, dashboards, and conversion tracking',
      '12 months managed hosting, backups, and priority support'
    ],
    gradient: 'from-violet-500 to-fuchsia-600'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Fully bespoke solution with security, scale, and SLAs.',
    features: [
      'Unlimited pages and custom workflows',
      'Dashboards, portals, and internal tools',
      'SSO, advanced security, and audit logging',
      'Strapi CMS enterprise setup with custom content modeling',
      'High‑availability hosting, CI/CD, and performance SLAs',
      'Dedicated success manager and roadmap planning'
    ],
    gradient: 'from-gold-accent to-orange-500'
  }
];
