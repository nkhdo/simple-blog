import MarkdownIt from 'markdown-it'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Content from 'App/Models/Content'

const md = MarkdownIt()

export default class ContentsController {
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
