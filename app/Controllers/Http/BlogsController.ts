import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Content from 'App/Models/Content'

export default class BlogsController {
  public async renderBlog({ view }: HttpContextContract) {
    const posts = await Content.query()
      .where('type', 'post')
      .select(['title', 'slug', 'created_at'])
      .orderBy('id', 'desc')

    return view.render('blog', {
      posts,
    })
  }
}
