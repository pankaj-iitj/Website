import {defineType, defineField} from 'sanity'

export const category = defineType({
  name: 'Publication',
  title: 'Publication',
  type: 'document',
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Category Title',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
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
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
    },
    prepare(selection: {title?: string; order?: number}) {
      const {title = '', order = 0} = selection
      return {
        title: `${order}. ${title}`,
      }
    },
  },
})
