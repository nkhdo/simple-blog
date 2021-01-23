import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Config from 'App/Models/Config'

export default class SiteConfig {
  public async handle({ view }: HttpContextContract, next: () => Promise<void>) {
    const siteConfigs = await Config.findBy('key', 'site_configs')

    let parsed: Record<string, any>
    try {
      if (siteConfigs) {
        parsed = JSON.parse(siteConfigs.value)
      } else parsed = {}
    } catch (err) {
      parsed = {}
    }

    view.share({
      siteConfigs: parsed,
    })

    await next()
  }
}
