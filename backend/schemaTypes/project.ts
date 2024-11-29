import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'desc'}],
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
    defineField({
      name: 'authors', // Changed from 'author' to 'authors'
      title: 'Authors', // Updated title
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
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Ongoing', value: 'Ongoing'},
          {title: 'Completed', value: 'Completed'},
          {title: 'Archives', value: 'Archives'},
        ],
      },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              options: {
                isHighlighted: true,
              },
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              options: {
                isHighlighted: true,
              },
            },
          ],
        },
      ],
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
      order: 'order',
    },
    prepare(selection: {title?: string; order?: number;},) {
      const {title = '', order = 0} = selection
      return {
        title: `${order}. ${title}`,

      }
    },
  },
})
