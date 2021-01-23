import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Content from 'App/Models/Content'

export default class PostsController {
  public async renderPosts({ view }: HttpContextContract) {
    const posts = await Content.query().where('type', 'post')

    return view.render('admin/posts/index', {
      posts,
    })
  }
}
