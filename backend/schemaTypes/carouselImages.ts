import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'carouselImage',
  title: 'Carousel Image',
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
      title: 'Title',
      type: 'string',
      description: 'Title of the carousel image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'Optional link for the image',
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
