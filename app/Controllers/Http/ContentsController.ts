import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Content from 'App/Models/Content'

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

export default class ContentsController {
  public async welcome({ view }: HttpContextContract) {
    const page = await Content.query().where('type', 'page').where('slug', 'home').first()

    return view.render('welcome', {
      page,
      pageBody: page ? md.render(page.content) : null,
    })
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
