// schemas/galleryImage.ts

import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // Optional: enables image cropping
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Description of the image',
    }),
  ],
})
