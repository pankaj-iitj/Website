import {defineField, defineType} from 'sanity'

// Define the Course object type
export const courseObject = defineType({
  name: 'courseObject',
  title: 'Course',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Course Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'code',
      title: 'Course Code',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ltp',
      title: 'LTP',
      type: 'object',
      fields: [
        defineField({
          name: 'lecture',
          title: 'Lecture Hours',
          type: 'number',
          validation: (Rule) => Rule.min(0).required(),
        }),
        defineField({
          name: 'tutorial',
          title: 'Tutorial Hours',
          type: 'number',
          validation: (Rule) => Rule.min(0).required(),
        }),
        defineField({
          name: 'practical',
          title: 'Practical Hours',
          type: 'number',
          validation: (Rule) => Rule.min(0).required(),
        }),
      ],
      options: {
        columns: 3,
      },
    }),
    defineField({
      name: 'sessions',
      title: 'Sessions',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})

// Define the main Course Category document type
export default defineType({
  name: 'courseCategory',
  title: 'Course Category',
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
      name: 'categoryName',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      // Removed the predefined list to allow custom category names
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'courses',
      title: 'Courses',
      type: 'array',
      of: [{type: 'courseObject'}],
      options: {
        sortable: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'categoryName',
      subtitle: 'description',
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
