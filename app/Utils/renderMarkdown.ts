import MarkdownIt from 'markdown-it'
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItLinkAttributes from 'markdown-it-link-attributes'
import MarkdownItEmoji from 'markdown-it-emoji'
import MarkdownItKatex from '@iktakahiro/markdown-it-katex'
import twemoji from 'twemoji'
import hljs from 'highlight.js'
import slugify from './slugify'

export const createMarkdownRenderer = (useKatex = false) => {
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
      permalinkClass: 'anchor',
    })
    .use(MarkdownItLinkAttributes, {
      pattern: /^https?:\/\//,
      attrs: {
        target: '_blank',
        rel: 'noopener',
      },
    })
    .use(MarkdownItEmoji)

  md.renderer.rules.emoji = function (token, idx) {
    return twemoji.parse(token[idx].content)
  }

  if (useKatex) {
    md.use(MarkdownItKatex)
  }

  return (markdown?: string): string => (markdown ? md.render(markdown) : '')
}
