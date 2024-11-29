// schemas/collaboratorCategory.ts
import {defineType, defineField} from 'sanity'

export const collaboratorCategory = defineType({
  name: 'collaboratorCategory',
  title: 'Collaborator Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
    },
    prepare({title, order}) {
      return {
        title: `${order}. ${title}`,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})

// schemas/institution.ts
export const institution = defineType({
  name: 'institution',
  title: 'Institution',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Institution Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Institution URL',
      type: 'url',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'country',
    },
  },
})

// schemas/collaborator.ts
export const collaborator = defineType({
  name: 'collaborator',
  title: 'Collaborator',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'institution',
      title: 'Institution',
      type: 'reference',
      to: [{type: 'institution'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn Profile',
      type: 'url',
    }),
    defineField({
      name: 'img',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'collaboratorCategory'}],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      institutionName: 'institution.name',
      category: 'category.title',
      media: 'img',
    },
    prepare({title, institutionName, category, media}) {
      return {
        title,
        subtitle: `${category} - ${institutionName}`,
        media,
      }
    },
  },
})

