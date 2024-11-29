import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  description: 'Profile information',
  fields: [
    defineField({
      name: 'academicRecords',
      title: 'Academic Records',
      type: 'object',
      fields: [
        defineField({
          name: 'record',
          title: 'Record',
          type: 'array',
          of: [{type: 'string'}],
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
      description: 'List of academic qualifications and positions held',
    }),
    defineField({
      name: 'professionalCareer',
      title: 'Professional Career',
      type: 'object',
      fields: [
        defineField({
          name: 'record',
          title: 'Record',
          type: 'array',
          of: [{type: 'string'}],
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
      description: 'List of professional positions and roles',
    }),
    defineField({
      name: 'awardsHonours',
      title: 'Awards and Honours',
      type: 'object',
      fields: [
        defineField({
          name: 'record',
          title: 'Record',
          type: 'array',
          of: [{type: 'string'}],
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
      description: 'List of awards and honours received',
    }),
    defineField({
      name: 'cv',
      title: 'CV',
      type: 'url',
      description: 'Put url of CV file',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Profile image of the user',
    }),
  ],
})
