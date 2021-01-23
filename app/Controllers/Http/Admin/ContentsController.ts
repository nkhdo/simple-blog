import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Content from 'App/Models/Content'

export default class ContentsController {
  public async index({ view }: HttpContextContract) {
    const contents = await Content.query().orderBy('id', 'desc')

    const posts = contents.filter((c) => c.type === 'post')
    const pages = contents.filter((c) => c.type === 'page')

    return view.render('admin/contents/index', {
      posts,
      pages,
    })
  }

  public async edit({ params, view }: HttpContextContract) {
    const content = await Content.findOrFail(params.id)

    return view.render('admin/contents/edit', {
      content,
    })
  }
}
