import MarkdownIt from 'markdown-it'
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItLinkAttributes from 'markdown-it-link-attributes'
import MarkdownItEmoji from 'markdown-it-emoji'
import hljs from 'highlight.js'
import slugify from './slugify'

const md = MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (__) {}
    }
    return '' // use external default escaping
  },
})
  .use(MarkdownItAnchor, {
    level: [2, 3],
    slugify,
    permalink: true,
    permalinkBefore: true,
    permalinkClass: '',
  })
  .use(MarkdownItLinkAttributes, {
    pattern: /^https?:\/\//,
    attrs: {
      target: '_blank',
      rel: 'noopener',
    },
  })
  .use(MarkdownItEmoji)

export default (markdown?: string): string => (markdown ? md.render(markdown) : '')
