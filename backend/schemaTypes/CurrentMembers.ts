import {defineField, defineType} from 'sanity'
import {CurrentMembersInput} from '../components/MemberCategory'

export const currentMembersField = defineType({
  name: 'currentMembersField',
  title: 'Current Members Field',
  type: 'object',
  fields: [
    defineField({
      name: 'members',
      title: 'Members',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'member'}]}],
    }),
  ],
  inputComponent: CurrentMembersInput, // Specify the custom component for this object
})
