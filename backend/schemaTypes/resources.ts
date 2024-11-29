import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export default defineType({
  name: 'labResources',
  title: 'Lab Resources',
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
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Item Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Item Description',
              type: 'text',
            }),
            defineField({
              name: 'link',
              title: 'Item Link',
              type: 'url',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'description',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {
        accept: 'image/svg+xml',
      },
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'color',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      order: 'order',
      items: 'items',
      color: 'color',
    },
    prepare(selection: {title?: string; order?: number; items?: any[]; color?: {hex?: string}},) {
      const {title = '', order = 0, items = [], color} = selection
      return {
        title: `${order}. ${title}`,
        subtitle: `${items.length} items`,
        media: color?.hex ? ImageIcon : undefined,
      }
    },
  },
})
