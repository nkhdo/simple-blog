import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminController {
  public async renderAdmin({ view }: HttpContextContract) {
    return view.render('admin/home')
  }
}
