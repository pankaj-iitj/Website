import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {color, colorInput} from '@sanity/color-input'

export default defineConfig({
  name: 'default',
  title: 'BioLabWebsite',

  projectId: '951qrjzc',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), colorInput()],

  schema: {
    types: schemaTypes,
  },
})
