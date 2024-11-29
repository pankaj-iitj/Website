import {defineField, defineType} from 'sanity'
import {SanityDocument} from '@sanity/types'

export const roleList = defineType({
  name: 'roleList',
  title: 'Role List',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Role Title',
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
})

export const member = defineType({
  name: 'member',
  title: 'Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'reference',
      to: [{type: 'roleList'}],
    }),
    defineField({
      name: 'isAlumni',
      title: 'Is Alumni',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn Profile',
      type: 'url',
    }),
  ],
})

export default defineType({
  name: 'memberCategory',
  title: 'Member Category',
  type: 'document',
  fields: [
    defineField({
      name: 'categoryName',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Category Order',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'currentMembers',
      title: 'Current Members',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'member'}],
          options: {
            filter: '!isAlumni', // Only show non-alumni members in the reference picker
          },
        },
      ],
    }),
    defineField({
      name: 'alumniMembers',
      title: 'Alumni Members',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'member'}],
          options: {
            filter: 'isAlumni', // Only show alumni members in the reference picker
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'categoryName',
      currentMembers: 'currentMembers',
      alumniMembers: 'alumniMembers',
    },
    prepare(selection: {
      title: string
      currentMembers: SanityDocument[]
      alumniMembers: SanityDocument[]
    }) {
      const {title, currentMembers, alumniMembers} = selection
      return {
        title: title,
        subtitle: `${currentMembers?.length || 0} Current, ${alumniMembers?.length || 0} Alumni`,
      }
    },
  },
})
