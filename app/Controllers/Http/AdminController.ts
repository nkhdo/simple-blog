import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminController {
  public async renderAdmin({ view }: HttpContextContract) {
    view.render('admin/index')
  }
}
