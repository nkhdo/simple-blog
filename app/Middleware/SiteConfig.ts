import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Config from 'App/Models/Config'
import Env from '@ioc:Adonis/Core/Env'

const defaultConfigs = {
  title: 'Simple Blog',
  description: 'My simple blog',
  keywords: 'blog, simple',
  menuItems: [],
}

export default class SiteConfig {
  public async handle({ view }: HttpContextContract, next: () => Promise<void>) {
    const siteConfigs = await Config.findBy('key', 'site_configs')

    let parsed: Partial<typeof defaultConfigs>

    try {
      if (siteConfigs) {
        parsed = JSON.parse(siteConfigs.value)
      } else parsed = {}
    } catch (err) {
      parsed = {}
    }

    view.share({
      appUrl: Env.get('APP_URL'),
      siteConfigs: { ...defaultConfigs, ...parsed },
    })

    await next()
  }
}
