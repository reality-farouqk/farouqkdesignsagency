import {getCliClient} from 'sanity/cli'

function block(text: string) {
  return {
    _type: 'block' as const,
    children: [{_type: 'span' as const, text}],
  }
}

function blocks(...paragraphs: string[]) {
  return paragraphs.map((text) => block(text))
}

function ref(id: string) {
  return {_type: 'reference' as const, _ref: id}
}

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  title: 'Farouqk Designs',
  tagline: 'Websites that book jobs for home service businesses.',
  contactEmail: 'hello@farouqkdesigns.com',
  phone: '+2348107558507',
  heroHeadline: 'Make your phone ring 24/7. Own your market.',
  heroSubtext:
    'We build high-converting websites for electricians, plumbers, HVAC companies, and renovation contractors. Not just pretty pages — systems designed to book jobs while you sleep.',
  socialLinks: [
    {
      _type: 'socialLink',
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/farouqkdesigns',
    },
    {
      _type: 'socialLink',
      platform: 'Instagram',
      url: 'https://www.instagram.com/farouqkdesigns',
    },
  ],
}

const services = [
  {
    _id: 'service-website',
    _type: 'service',
    title: 'Professional Website',
    slug: {current: 'website'},
    shortDescription:
      'A fast, mobile-first site that converts visitors into booked jobs — built to rank and built to impress.',
    description: blocks(
      'A professional website that builds trust with homeowners and commercial clients the moment they land on your page.',
      'We design for speed, mobile users, and conversion — not design awards.',
    ),
    highlight: true,
    order: 1,
  },
  {
    _id: 'service-service-area-pages',
    _type: 'service',
    title: 'Service Area Pages',
    slug: {current: 'service-area-pages'},
    shortDescription:
      'Dedicated pages for every city and neighbourhood you serve, so you show up when local homeowners search.',
    description: blocks(
      'Dedicated pages for electrical installation, solar systems, generator installation, industrial wiring, maintenance, and every area you cover.',
      'So clients find you when they search — not your competitor.',
    ),
    order: 2,
  },
  {
    _id: 'service-google-business',
    _type: 'service',
    title: 'Google Business Setup',
    slug: {current: 'google-business'},
    shortDescription:
      'A fully optimised Google Business Profile that puts you in the map pack and drives direct calls.',
    description: blocks(
      'A fully optimised Google Business Profile that puts you in the map pack and drives direct calls from local searchers.',
    ),
    order: 3,
  },
  {
    _id: 'service-lead-capture',
    _type: 'service',
    title: 'Lead Capture Forms',
    slug: {current: 'lead-capture'},
    shortDescription:
      'Smart forms, call tracking, and booking integrations that turn website traffic into qualified enquiries.',
    description: blocks(
      'Smart forms, call tracking, WhatsApp enquiry flows, and booking integrations that turn website traffic into qualified enquiries.',
      'Turn website visitors into direct enquiries — automatically.',
    ),
    order: 4,
  },
  {
    _id: 'service-local-seo',
    _type: 'service',
    title: 'Local SEO',
    slug: {current: 'local-seo'},
    shortDescription:
      'On-page and off-page optimisation so you rank above competitors when customers search your services nearby.',
    description: blocks(
      'Appear when homeowners search "electrician near me," "plumber in [city]," or "HVAC company near me."',
      'On-page and off-page optimisation so you rank above competitors for the searches that actually produce jobs.',
    ),
    order: 5,
  },
  {
    _id: 'service-ai-seo',
    _type: 'service',
    title: 'AI SEO',
    slug: {current: 'ai-seo'},
    shortDescription:
      'Content and structure optimised so AI tools like ChatGPT, Perplexity and Google AI Overviews recommend your business.',
    description: blocks(
      'Optimise your content and site structure so AI tools and search assistants surface your business when buyers ask for recommendations.',
      'Future-proof traffic from the next generation of search.',
    ),
    order: 6,
  },
  {
    _id: 'service-ai-leads',
    _type: 'service',
    title: 'AI-Powered Lead Generation',
    slug: {current: 'ai-leads'},
    shortDescription:
      'Intelligent lead capture and follow-up workflows that help more visitors become booked enquiries with less manual effort.',
    description: blocks(
      'Use automation, intelligent follow-up, and conversion-focused journeys to turn more visitors into qualified enquiries without constant manual effort.',
    ),
    order: 7,
  },
]

const caseStudies = [
  {
    _id: 'caseStudy-industrial-electrical-contractor',
    _type: 'caseStudy',
    title: 'Industrial Electrical Contractor Website',
    slug: {current: 'industrial-electrical-contractor'},
    projectType: 'Industrial Contractor',
    clientName: 'Industrial Electrical Client',
    projectDate: '2025-09-15',
    excerpt:
      'A full company website, service pages, and project portfolio built to support tender applications.',
    services: [ref('service-website'), ref('service-service-area-pages'), ref('service-local-seo')],
    challenge: blocks(
      'No website — losing commercial bids. Procurement teams could not verify credibility during evaluation.',
    ),
    solution: blocks(
      'Full company website + service pages + project portfolio, structured around what procurement teams look for during evaluation.',
    ),
    result: blocks('Improved credibility during tender applications.'),
  },
  {
    _id: 'caseStudy-solar-installation-company',
    _type: 'caseStudy',
    title: 'Solar Installation Company',
    slug: {current: 'solar-installation-company'},
    projectType: 'Solar Installation',
    clientName: 'Solar Installation Client',
    projectDate: '2025-11-20',
    excerpt:
      'An SEO-focused service website that turned a referral-only business into one with inbound demand.',
    services: [ref('service-website'), ref('service-local-seo'), ref('service-lead-capture')],
    challenge: blocks(
      'Relied only on referrals. No inbound pipeline when referral flow slowed down.',
    ),
    solution: blocks(
      'SEO-focused service website with dedicated pages for residential and commercial solar installation services.',
    ),
    result: blocks('Started receiving inbound project enquiries.'),
  },
  {
    _id: 'caseStudy-atech-electrical',
    _type: 'caseStudy',
    title: 'Branding and Digital Growth for Atech Electrical Engineering Ltd',
    slug: {current: 'branding-and-digital-growth-atech-electrical-engineering-ltd'},
    projectType: 'Electrical Engineering',
    clientName: 'Atech Electrical Engineering Ltd',
    projectDate: '2026-01-10',
    excerpt:
      'A professional digital presence that improved trust, visibility, and inbound enquiries for a growing electrical engineering firm.',
    services: [
      ref('service-website'),
      ref('service-google-business'),
      ref('service-local-seo'),
      ref('service-lead-capture'),
    ],
    challenge: blocks(
      'The business had strong technical capability but a weak online presence. Homeowners and commercial clients could not easily find or trust them online.',
      'Competitors with better websites were winning quotes despite inferior work.',
    ),
    solution: blocks(
      'Built a mobile-first company website with clear service pages, trust signals, Google Business optimisation, and lead capture forms designed for their target market.',
    ),
    result: blocks(
      'Improved online credibility, stronger local visibility, and a steady flow of inbound enquiries from the website.',
    ),
  },
]

const blogPosts = [
  {
    _id: 'blogPost-lose-bids',
    _type: 'blogPost',
    title: 'Why Electrical Contractors Lose Bids They\'re Qualified to Win',
    slug: {current: 'why-electrical-contractors-lose-bids'},
    publishedAt: '2026-05-12T08:00:00Z',
    excerpt:
      'Technical capability rarely loses you a contract. Perception does. Here\'s what procurement teams actually screen for before they read your quote.',
    content: blocks(
      'Most electrical contractors assume they lose bids on price or technical fit. In practice, a large share of losses happen before the technical evaluation even starts — at the credibility screen.',
      'Procurement officers and main contractors are pattern-matching against risk. A missing company profile, an outdated or absent website, and a portfolio that lives only in WhatsApp photos all read as risk signals, regardless of how good the underlying work is.',
      'The fix isn\'t more marketing. It\'s structured proof: a company profile that mirrors what tender documentation expects, a portfolio organized by project type and scale, and a website that\'s reachable and current when someone checks you out mid-evaluation.',
    ),
  },
  {
    _id: 'blogPost-profile-vs-website',
    _type: 'blogPost',
    title: 'Company Profile vs. Website: Do You Need Both?',
    slug: {current: 'company-profile-vs-website'},
    publishedAt: '2026-04-28T08:00:00Z',
    excerpt:
      'A capability statement and a website serve different moments in the buying process. Here\'s how electrical firms should think about each.',
    content: blocks(
      'A company profile is a document — built for a specific moment, usually a tender submission or a direct request from a procurement officer. It\'s static, formal, and structured to match what\'s being asked for.',
      'A website is persistent. It\'s what shows up when someone searches your company name after a referral, or searches for the service you offer before they know your name at all.',
      'Firms that rely on only one tend to leak opportunities at the other stage. The profile gets you through the formal gate; the website gets you found in the first place and reinforces credibility after the fact.',
    ),
  },
  {
    _id: 'blogPost-local-seo',
    _type: 'blogPost',
    title: 'A Practical Guide to Local SEO for Electrical Companies',
    slug: {current: 'local-seo-for-electrical-companies'},
    publishedAt: '2026-04-09T08:00:00Z',
    excerpt:
      'You don\'t need to rank for everything. You need to show up for the handful of searches that actually produce commercial enquiries.',
    content: blocks(
      'Local SEO for an electrical or solar installation company comes down to a narrow set of high-intent searches: service plus location, and sometimes service plus project type — think "industrial electrical contractor Lagos" rather than broad terms like "electrician".',
      'The foundation is a set of dedicated service pages, each built around one service and the language your actual clients use, not internal jargon. Generic one-page sites tend to compete for nothing in particular and rank for nothing in particular.',
      'From there, consistent business information across your website and listings, paired with real project pages, does most of the remaining work over time.',
    ),
  },
]

const industries = [
  {
    _id: 'industry-electrical',
    _type: 'industry',
    title: 'Electrical',
    slug: {current: 'electrical'},
    eyebrow: 'For Electricians',
    heroHeadline: 'More electrical jobs. Less chasing leads.',
    heroSubheadline:
      'A professional website that makes homeowners pick up the phone and call you — not your competitor.',
    painPoints: [
      {
        heading: 'Homeowners can\'t find you on Google',
        body: 'If you\'re not ranking locally, those jobs go to someone else. Every day.',
      },
      {
        heading: 'Your current site doesn\'t build trust',
        body: 'Homeowners let electricians into their homes. They need to trust you before they call.',
      },
      {
        heading: 'No system to capture enquiries 24/7',
        body: 'Missed calls at 10pm mean lost jobs. A good site books jobs while you sleep.',
      },
      {
        heading: 'Competitors look more established',
        body: 'Better presentation wins the quote — even when your work is superior.',
      },
    ],
    services: [
      ref('service-website'),
      ref('service-service-area-pages'),
      ref('service-local-seo'),
      ref('service-lead-capture'),
    ],
    caseStudies: [ref('caseStudy-atech-electrical'), ref('caseStudy-industrial-electrical-contractor')],
    testimonial: {
      quote:
        'Umar is the best to work with! His professionalism and creativity shine in every aspect of his work. His communication was clear, proactive, and collaborative — he kept me in the loop at every stage and seamlessly translated my vision into a stunning, functional website.',
      name: 'Isreal Anga',
      company: 'ParanTechWater',
    },
    ctaHeadline: 'Ready to get more electrical bookings?',
    seoTitle: 'Electrician Websites | Farouqk Designs',
    seoDescription:
      'Custom websites and local SEO for electricians. Make homeowners call you first — not your competitor.',
  },
  {
    _id: 'industry-plumbing',
    _type: 'industry',
    title: 'Plumbing',
    slug: {current: 'plumbing'},
    eyebrow: 'For Plumbers',
    heroHeadline: 'When pipes burst, make sure they call you first.',
    heroSubheadline:
      'Emergency and scheduled plumbing jobs — a website built to convert urgent searches into booked callouts.',
    painPoints: [
      {
        heading: 'Emergency searches go to paid ads',
        body: 'We help you rank organically so you don\'t pay for every lead.',
      },
      {
        heading: 'No clear service area on your site',
        body: 'Homeowners want to know you cover their area before they call.',
      },
      {
        heading: 'No social proof visible at a glance',
        body: 'Reviews and before/afters are what convert a searcher into a caller.',
      },
      {
        heading: 'Slow mobile experience',
        body: 'Most emergency searches happen on a phone. Speed wins the job.',
      },
    ],
    services: [
      ref('service-website'),
      ref('service-service-area-pages'),
      ref('service-google-business'),
      ref('service-lead-capture'),
    ],
    caseStudies: [ref('caseStudy-solar-installation-company')],
    ctaHeadline: 'Ready to get more plumbing callouts?',
    seoTitle: 'Plumber Websites | Farouqk Designs',
    seoDescription:
      'Custom websites and local SEO for plumbers. Get found fast when pipes burst and phones ring.',
  },
  {
    _id: 'industry-hvac',
    _type: 'industry',
    title: 'HVAC',
    slug: {current: 'hvac'},
    eyebrow: 'For HVAC Companies',
    heroHeadline: 'Fill your calendar with installs and service contracts.',
    heroSubheadline:
      'HVAC customers research before they buy. Make sure your site does the selling — so you just do the installing.',
    painPoints: [
      {
        heading: 'Seasonal demand is unpredictable',
        body: 'A site optimised for all-year service keeps your diary full in the slow months.',
      },
      {
        heading: 'Customers don\'t understand the value',
        body: 'We build pages that educate and justify your pricing before they even speak to you.',
      },
      {
        heading: 'No maintenance contract funnel',
        body: 'Recurring revenue starts with a website that sells the plan, not just the call-out.',
      },
      {
        heading: 'Manufacturer and certification pages missing',
        body: 'Trust signals like brand partnerships and certifications close hesitant buyers.',
      },
    ],
    services: [
      ref('service-website'),
      ref('service-local-seo'),
      ref('service-ai-seo'),
      ref('service-lead-capture'),
    ],
    caseStudies: [ref('caseStudy-solar-installation-company')],
    ctaHeadline: 'Ready to win more HVAC contracts?',
    seoTitle: 'HVAC Websites | Farouqk Designs',
    seoDescription:
      'Custom websites and local SEO for HVAC companies. Win installs and service contracts all year round.',
  },
  {
    _id: 'industry-renovation',
    _type: 'industry',
    title: 'Renovation',
    slug: {current: 'renovation'},
    eyebrow: 'For Renovation Contractors',
    heroHeadline: 'Win the quote before the site visit.',
    heroSubheadline:
      'Homeowners planning a renovation compare three or four contractors online. Make sure your website makes the shortlist obvious.',
    painPoints: [
      {
        heading: 'Your portfolio isn\'t doing the selling',
        body: 'Beautiful work deserves beautiful presentation. Before/afters that convert.',
      },
      {
        heading: 'No clear project scope or pricing guide',
        body: 'Helping homeowners understand cost reduces tyre-kickers and speeds up decisions.',
      },
      {
        heading: 'Slow to respond to quote requests',
        body: 'A website with an instant quote form captures leads before they move on.',
      },
      {
        heading: 'No reviews or testimonials visible',
        body: 'Social proof is the single biggest factor in renovation decisions.',
      },
    ],
    services: [ref('service-website'), ref('service-lead-capture'), ref('service-local-seo')],
    caseStudies: [ref('caseStudy-industrial-electrical-contractor')],
    testimonial: {
      quote:
        'I could not be more satisfied with the job and the work that Umar has done. He\'s an incredible designer — does a really fantastic job putting detailed effort into every element of the website.',
      name: 'Ronen Passar',
      company: 'Outbound Operators',
    },
    ctaHeadline: 'Ready to win more renovation projects?',
    seoTitle: 'Renovation Websites | Farouqk Designs',
    seoDescription:
      'Custom websites and local SEO for renovation contractors. Show your best projects and win the quote.',
  },
  {
    _id: 'industry-interior-design',
    _type: 'industry',
    title: 'Interior Design',
    slug: {current: 'interior-design'},
    eyebrow: 'For Interior Designers',
    heroHeadline: 'A portfolio that gets you booked months in advance.',
    heroSubheadline:
      'Clients who hire interior designers make an emotional decision. Your website needs to inspire confidence — and bookings.',
    painPoints: [
      {
        heading: 'Your portfolio isn\'t searchable',
        body: 'Beautiful images need context, keywords, and structure to rank on Google.',
      },
      {
        heading: 'No clear discovery process on the site',
        body: 'Clients want to know what working with you is like before they commit.',
      },
      {
        heading: 'No lead qualification built in',
        body: 'Filtering out budget-mismatched enquiries before they reach you saves hours.',
      },
      {
        heading: 'Social content doesn\'t convert',
        body: 'Instagram followers don\'t pay invoices. Your site needs to close the loop.',
      },
    ],
    services: [ref('service-website'), ref('service-ai-seo'), ref('service-lead-capture')],
    caseStudies: [ref('caseStudy-atech-electrical')],
    ctaHeadline: 'Ready to attract your ideal design clients?',
    seoTitle: 'Interior Design Websites | Farouqk Designs',
    seoDescription:
      'Custom websites and local SEO for interior design businesses. A portfolio that gets you booked months ahead.',
  },
]

async function seed(client: {createOrReplace: (doc: unknown) => Promise<unknown>}) {
  console.log('Seeding Sanity documents...')

  await client.createOrReplace(siteSettings)
  console.log('  ✓ site settings')

  for (const doc of services) {
    await client.createOrReplace(doc)
  }
  console.log(`  ✓ ${services.length} services`)

  for (const doc of caseStudies) {
    await client.createOrReplace(doc)
  }
  console.log(`  ✓ ${caseStudies.length} case studies`)

  for (const doc of blogPosts) {
    await client.createOrReplace(doc)
  }
  console.log(`  ✓ ${blogPosts.length} blog posts`)

  for (const doc of industries) {
    await client.createOrReplace(doc)
  }
  console.log(`  ✓ ${industries.length} industries`)

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
