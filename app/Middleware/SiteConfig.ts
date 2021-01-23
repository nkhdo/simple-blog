import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Config from 'App/Models/Config'

export default class SiteConfig {
  public async handle({ view }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const configs = await Config.all()

    const siteConfigs: Record<string, string> = {}
    configs.forEach((config) => {
      siteConfigs[config.key] = config.value
    })

    view.share({
      siteConfigs,
    })

    await next()
  }
}
