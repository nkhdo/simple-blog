import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminController {
  public async index({ response }: HttpContextContract) {
    return response.redirect().toRoute('Admin/ContentsController.index')
  }
}
