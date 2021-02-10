import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Config from 'App/Models/Config'
import Env from '@ioc:Adonis/Core/Env'
import i18n from 'App/Services/I18n'

const defaultConfigs = {
  title: 'Simple Blog',
  description: 'My simple blog',
  keywords: 'blog, simple',
  menuItems: [],
  thumbnail: '',
  twitterUser: '',
  locale: 'en',
  useKatex: false,
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

    const mergedSiteConfigs = { ...defaultConfigs, ...parsed }

    i18n.setLocale(mergedSiteConfigs.locale)

    view.share({
      appUrl: Env.get('APP_URL'),
      locales: i18n.locales,
      i18n: i18n.i18n,
      siteConfigs: mergedSiteConfigs,
    })

    await next()
  }
}
