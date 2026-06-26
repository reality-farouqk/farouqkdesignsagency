import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'industry',
  title: 'Industry',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Industry title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
      description: 'e.g. "electrical", "plumbing", "hvac"',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow label',
      type: 'string',
      description: 'Short label above the hero heading. e.g. "For Electricians"',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero subheadline',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero background image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'painPoints',
      title: 'Pain points (3–4 short bullets)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'heading', title: 'Heading', type: 'string'}),
            defineField({name: 'body', title: 'Body', type: 'text', rows: 2}),
          ],
          preview: {select: {title: 'heading'}},
        },
      ],
    }),
    defineField({
      name: 'services',
      title: 'Services offered to this industry',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'service'}]}],
    }),
    defineField({
      name: 'caseStudies',
      title: 'Related case studies',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'caseStudy'}]}],
    }),
    defineField({
      name: 'testimonial',
      title: 'Featured testimonial',
      type: 'object',
      fields: [
        defineField({name: 'quote', title: 'Quote', type: 'text', rows: 3}),
        defineField({name: 'name', title: 'Client name', type: 'string'}),
        defineField({name: 'company', title: 'Company', type: 'string'}),
      ],
    }),
    defineField({
      name: 'ctaHeadline',
      title: 'CTA headline',
      type: 'string',
      description: 'e.g. "Ready to get more electrical jobs?"',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'slug.current'},
  },
})
