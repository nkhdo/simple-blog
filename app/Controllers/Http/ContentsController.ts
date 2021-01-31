import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Content from 'App/Models/Content'
import renderMarkdown from 'App/Utils/renderMarkdown'

export default class ContentsController {
  public async welcome({ view }: HttpContextContract) {
    const page = await Content.query().where('type', 'page').where('slug', 'home').first()

    return view.render('welcome', {
      page,
      pageBody: renderMarkdown(page?.content),
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
    const contentBody = renderMarkdown(content.content)

    return view.render('content', {
      content,
      contentBody,
    })
  }
}
