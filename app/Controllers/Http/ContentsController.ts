import MarkdownIt from 'markdown-it'
import MarkdownItAnchor from 'markdown-it-anchor'
import hljs from 'highlight.js'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Content from 'App/Models/Content'
import slugify from 'App/Utils/slugify'

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
}).use(MarkdownItAnchor, {
  level: [2, 3],
  slugify,
  permalink: true,
  permalinkBefore: true,
  permalinkClass: '',
})

export default class ContentsController {
  public async welcome({ view }: HttpContextContract) {
    const page = await Content.query().where('type', 'page').where('slug', 'home').first()

    return view.render('welcome', {
      page,
      pageBody: page ? md.render(page.content) : null,
    })
  }

  public async sitemap({ view, response }: HttpContextContract) {
    const contents = await Content.query()
      .select(['title', 'slug', 'tags', 'updated_at'])
      .orderBy('id', 'desc')

    const sitemap = view.render('sitemap', {
      contents,
    })

    return response.header('Content-Type', 'text/xml').send(sitemap)
  }

  public async robots({ view, response }: HttpContextContract) {
    const robots = view.render('robots')

    return response.header('Content-Type', 'text/plain').send(robots)
  }

  public async posts({ request, view }: HttpContextContract) {
    const posts = await Content.query()
      .where('type', 'post')
      .select(['title', 'slug', 'tags', 'created_at'])
      .orderBy('id', 'desc')

    const tags = [...new Set(posts.flatMap((post) => post.tagsArray))]

    const filter = request.input('tag')
    const filteredPosts = filter ? posts.filter((p) => p.tags.includes(filter)) : posts

    return view.render('blog', {
      posts: filteredPosts,
      filter,
      tags,
    })
  }

  public async show({ params, view }: HttpContextContract) {
    const content = await Content.findByOrFail('slug', params.slug)
    const contentBody = md.render(content.content)

    return view.render('content', {
      content,
      contentBody,
    })
  }
}
