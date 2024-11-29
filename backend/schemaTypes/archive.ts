import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'archive',
  title: 'Archives',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
    }),
    defineField({
      name: 'related', // Changed from 'author' to 'authors'
      title: 'Realated', // Updated title
      type: 'array', // Changed type to array
      of: [
        {
          type: 'reference',
          to: [{type: 'member'}],
        },
      ],
      validation: (rule) => rule.required().min(1), // Require at least one author
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'carouselImages',
      title: 'Carousel Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'showInNews',
      title: 'Show in News',
      type: 'boolean',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'shortDescription',
      order: 'order',
    },
    prepare(selection: {title?: string; order?: number; description?: any[];}) {
      const {title = '', order = 0, description = ""} = selection
      return {
        title: `${order}. ${title}`,
        subtitle: `${description} `,

      }
    },
  },
})
