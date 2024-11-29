
import galleryImages from './galleryImages'
import members, {member, roleList} from './members'
import project from './project'
import {category} from './publication'
import resources from './resources'
import teaching, {courseObject} from './teaching'
import news from './news.js'

import home from './home'
import carouselImages from './carouselImages'
import archive from './archive'
import { collaborator, collaboratorCategory, institution } from './collaborators'

export const schemaTypes = [
  galleryImages,
  archive,
  project,
  category,
  members,
  resources,
  collaborator,
  courseObject,
  teaching,
  home,
  news,
  carouselImages,
  member,
  roleList,
  collaboratorCategory,
  institution
]
