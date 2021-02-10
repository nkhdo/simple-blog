import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Content from 'App/Models/Content'

export default class ContentsController {
  public async welcome({ view }: HttpContextContract) {
    const page = await Content.query().where('type', 'page').where('slug', 'home').first()

    return view.render('welcome', {
      page,
    })
  }

  public async sitemap({ view, response }: HttpContextContract) {
    const contents = await Content.query()
      .where('visible', true)
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
      .where('visible', true)
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
    const content = await Content.query()
      .where('slug', params.slug)
      .where('visible', true)
      .firstOrFail()

    return view.render('content', {
      content,
    })
  }
}
