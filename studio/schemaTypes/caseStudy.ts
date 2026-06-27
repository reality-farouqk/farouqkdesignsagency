import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'projectType',
      title: 'Project type',
      type: 'string',
    }),
    defineField({
      name: 'clientName',
      title: 'Client name',
      type: 'string',
    }),
    defineField({
      name: 'website',
      title: 'Client website URL',
      type: 'url',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'projectDate',
      title: 'Project date',
      type: 'date',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'services',
      title: 'Related services',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'service'}]}],
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'result',
      title: 'Result',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'clientName',
      media: 'heroImage',
    },
  },
})
