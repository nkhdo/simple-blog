import slug from 'elegant-slug'

const slugify = (string: string, separator: 'hyphen' | 'underscore' = 'hyphen') =>
  slug(string, {
    separator,
    maxLength: 50,
    letterCase: 'lowercase',
  })
    .normalize('NFD') // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents

export default slugify
