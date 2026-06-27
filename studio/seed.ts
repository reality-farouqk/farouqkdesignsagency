import { getCliClient } from 'sanity/cli'

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  title: 'Farouqk Electrical',
  tagline: 'Powering modern homes and businesses with reliable electrical solutions.',
  contactEmail: 'hello@farouqkelectrical.com',
  phone: '+2348107558507',
  address: '123 Main Street\nAnytown, USA 12345',
  heroHeadline: 'Electrical services designed for comfort, safety, and efficiency.',
  heroSubtext:
    'We deliver residential and commercial electrical systems with precision, care, and a focus on long-term reliability.',
  socialLinks: [
    { _type: 'socialLink', platform: 'LinkedIn', url: 'https://linkedin.com/company/farouqkdesigns' },
    { _type: 'socialLink', platform: 'Instagram', url: 'https://instagram.com/farouqkdesigns' },
  ],
}

const services = [
  {
    _id: 'service-electrical-installation',
    _type: 'service',
    title: 'Electrical Installations',
    slug: { current: 'electrical-installations' },
    shortDescription: 'Full-service installations for homes, offices, and new construction projects.',
    description: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'We handle wiring, panel upgrades, outlet installations, and electrical system design with trusted workmanship.' }],
      },
    ],
    highlight: true,
    order: 1,
  },
  {
    _id: 'service-lighting-design',
    _type: 'service',
    title: 'Commercial Lighting',
    slug: { current: 'commercial-lighting' },
    shortDescription: 'Energy-efficient lighting solutions for businesses and public spaces.',
    description: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'From LED upgrades to smart lighting controls, we create brighter, safer environments that reduce energy costs.' }],
      },
    ],
    order: 2,
  },
  {
    _id: 'service-maintenance-repair',
    _type: 'service',
    title: 'Maintenance & Repairs',
    slug: { current: 'maintenance-repairs' },
    shortDescription: 'Responsive electrical repairs and preventative maintenance services.',
    description: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Our team responds quickly to outages, faulty circuits, and system concerns, keeping your property powered safely.' }],
      },
    ],
    order: 3,
  },
]

const caseStudies = [
  {
    _id: 'caseStudy-smart-office-upgrade',
    _type: 'caseStudy',
    title: 'Smart Office Lighting Upgrade',
    slug: { current: 'smart-office-lighting-upgrade' },
    projectType: 'Commercial retrofit',
    clientName: 'Anchor Workspace',
    projectDate: '2025-11-10',
    excerpt: 'A modern lighting retrofit that improved comfort and reduced energy use by 35%.',
    services: [
      { _type: 'reference', _ref: 'service-electrical-installation' },
      { _type: 'reference', _ref: 'service-lighting-design' },
    ],
    challenge: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'The client needed a reliable lighting upgrade to support video conferencing, task lighting, and lower monthly utility costs.' }],
      },
    ],
    solution: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'We replaced outdated fixtures with energy-efficient LEDs, installed smart controls, and rewired key circuits for improved distribution.' }],
      },
    ],
    result: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'The office gained better visual comfort, lower energy bills, and a more flexible lighting system for meetings and collaborative work.' }],
      },
    ],
  },
]

const blogPosts = [
  {
    _id: 'blogPost-service-safety-tips',
    _type: 'blogPost',
    title: '3 Electrical Safety Tips Every Homeowner Should Know',
    slug: { current: 'electrical-safety-tips' },
    publishedAt: '2026-01-15T08:00:00Z',
    excerpt: 'Simple ways to keep your home safe, prevent electrical hazards, and protect your family.',
    content: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Always schedule a qualified electrician for repairs, don’t overload outlets, and address damaged wiring immediately.' }],
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Regular inspections and smart upgrades can prevent fire risks and keep your electrical system functioning safely.' }],
      },
    ],
  },
]

async function seed(client: any) {
  console.log('Seeding Sanity documents...')
  await client.createOrReplace(siteSettings)
  await Promise.all(services.map((doc) => client.createOrReplace(doc)))
  await Promise.all(caseStudies.map((doc) => client.createOrReplace(doc)))
  await Promise.all(blogPosts.map((doc) => client.createOrReplace(doc)))
  console.log('Sanity seed complete.')
}

async function run() {
  const client = getCliClient()
  await seed(client)
  console.log('Seed script finished.')
}

run().catch((error) => {
  console.error('Seed script failed:', error)
  process.exit(1)
})
