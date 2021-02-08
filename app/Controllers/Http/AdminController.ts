import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Config from 'App/Models/Config'

export default class AdminController {
  public async index({ response }: HttpContextContract) {
    return response.redirect().toRoute('Admin/ContentsController.index')
  }

  public async updateSiteConfigs({ request, response }: HttpContextContract) {
    const siteConfig = await Config.findByOrFail('key', 'site_configs')

    const content = request.post()
    const currentConfigs = JSON.parse(siteConfig.value)
    const newConfigs = {
      ...currentConfigs,
      ...content,
    }
    siteConfig.value = JSON.stringify(newConfigs)

    await siteConfig.save()

    return response.status(204)
  }
}
